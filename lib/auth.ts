import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'local-demo-key'
const hasSupabaseEnv = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
const AUTH_TIMEOUT_MS = 3500
const demoUsersKey = 'regenmove.demoUsers'

type DemoStoredUser = {
  email: string
  password: string
  metadata?: any
}

const seededDemoUsers: DemoStoredUser[] = [
  { email: 'antrileon@gmail.com', password: '12345678', metadata: { full_name: 'Andres Trimino', role: 'patient' } },
  { email: 'andres@example.com', password: '12345678', metadata: { full_name: 'Andres Trimino', role: 'patient' } },
]

function isFetchFailure(error: unknown) {
  return error instanceof Error && error.message.toLowerCase().includes('failed to fetch')
}

function isAuthTimeout(error: unknown) {
  return error instanceof Error && error.message === 'AUTH_TIMEOUT'
}

function isLocalDemoAllowed() {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

function shouldUseDemoAuth(error: unknown) {
  return isLocalDemoAllowed() && (isFetchFailure(error) || isAuthTimeout(error) || error instanceof Error)
}

async function withAuthTimeout<T>(promise: Promise<T>) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('AUTH_TIMEOUT')), AUTH_TIMEOUT_MS)
  })

  try {
    return await Promise.race([promise, timeout])
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }
}

function readDemoUser() {
  if (typeof window === 'undefined') return null
  const demoUser = window.localStorage.getItem('regenmove.demoUser')
  if (!demoUser) return null

  try {
    return JSON.parse(demoUser)
  } catch {
    window.localStorage.removeItem('regenmove.demoUser')
    return null
  }
}

function readDemoUsers(): DemoStoredUser[] {
  if (typeof window === 'undefined') return seededDemoUsers
  const stored = window.localStorage.getItem(demoUsersKey)

  if (!stored) return seededDemoUsers

  try {
    const parsed = JSON.parse(stored) as DemoStoredUser[]
    return [...seededDemoUsers, ...parsed]
  } catch {
    window.localStorage.removeItem(demoUsersKey)
    return seededDemoUsers
  }
}

function saveDemoAccount(email: string, password: string, metadata?: any) {
  const normalizedEmail = email.trim().toLowerCase()
  const current = readDemoUsers().filter((user) => !seededDemoUsers.some((seed) => seed.email === user.email))
  const next = [
    ...current.filter((user) => user.email !== normalizedEmail),
    { email: normalizedEmail, password, metadata },
  ]
  window.localStorage.setItem(demoUsersKey, JSON.stringify(next))
}

function findDemoAccount(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase()
  return readDemoUsers().find((user) => user.email.toLowerCase() === normalizedEmail && user.password === password)
}

function writeDemoUser(email: string, metadata?: any) {
  const user = {
    id: 'demo-user',
    email: email.trim().toLowerCase(),
    user_metadata: {
      full_name: metadata?.full_name || 'Usuario demo',
      role: metadata?.role || 'patient',
      ...metadata,
    },
  }
  window.localStorage.setItem('regenmove.demoUser', JSON.stringify(user))
  return user
}

// Client-side Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes)
export const createServerSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Auth utilities
export async function getCurrentUser() {
  if ((!hasSupabaseEnv || isLocalDemoAllowed()) && typeof window !== 'undefined') {
    return readDemoUser()
  }

  try {
    const { data: { user }, error } = await withAuthTimeout(supabase.auth.getUser())
    if (error) throw error
    return user || readDemoUser()
  } catch (error) {
    if (shouldUseDemoAuth(error)) return readDemoUser()
    throw error
  }
}

export async function getCurrentSession() {
  if ((!hasSupabaseEnv || isLocalDemoAllowed()) && typeof window !== 'undefined') {
    const user = readDemoUser()
    return user ? { user } : null
  }

  try {
    const { data: { session }, error } = await withAuthTimeout(supabase.auth.getSession())
    if (error) throw error
    const user = readDemoUser()
    return session || (user ? { user } : null)
  } catch (error) {
    if (shouldUseDemoAuth(error)) {
      const user = readDemoUser()
      return user ? { user } : null
    }
    throw error
  }
}

export async function signOutUser() {
  if ((!hasSupabaseEnv || isLocalDemoAllowed()) && typeof window !== 'undefined') {
    window.localStorage.removeItem('regenmove.demoUser')
    return
  }

  try {
    const { error } = await withAuthTimeout(supabase.auth.signOut())
    if (error) throw error
  } catch (error) {
    if (!shouldUseDemoAuth(error)) throw error
  } finally {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('regenmove.demoUser')
    }
  }
}

export async function signInWithEmail(email: string, password: string) {
  if ((!hasSupabaseEnv || isLocalDemoAllowed()) && typeof window !== 'undefined') {
    const account = findDemoAccount(email, password)
    if (!account) {
      throw new Error('Correo o contraseña incorrectos. Demo: antrileon@gmail.com / 12345678')
    }
    const user = writeDemoUser(account.email, account.metadata)
    return { user, session: { user } }
  }

  try {
    const { data, error } = await withAuthTimeout(
      supabase.auth.signInWithPassword({
        email,
        password,
      })
    )
    if (error) throw error
    return data
  } catch (error) {
    if (shouldUseDemoAuth(error) && typeof window !== 'undefined') {
      const account = findDemoAccount(email, password)
      if (!account) {
        throw new Error('Correo o contraseña incorrectos. Demo: antrileon@gmail.com / 12345678')
      }
      const user = writeDemoUser(account.email, account.metadata)
      return { user, session: { user } }
    }
    throw error
  }
}

export async function signUpWithEmail(email: string, password: string, metadata?: any) {
  if ((!hasSupabaseEnv || isLocalDemoAllowed()) && typeof window !== 'undefined') {
    saveDemoAccount(email, password, metadata)
    const user = writeDemoUser(email, metadata)
    return { user, session: { user } }
  }

  try {
    const { data, error } = await withAuthTimeout(
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })
    )
    if (error) throw error
    return data
  } catch (error) {
    if (shouldUseDemoAuth(error) && typeof window !== 'undefined') {
      saveDemoAccount(email, password, metadata)
      const user = writeDemoUser(email, metadata)
      return { user, session: { user } }
    }
    throw error
  }
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password
  })
  if (error) throw error
  return data
}

// Profile management
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createUserProfile(profile: any) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()

  if (error) throw error
  return data
}
