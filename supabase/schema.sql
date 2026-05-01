create table if not exists public.profiles (
  id uuid primary key,
  full_name text,
  role text not null check (role in ('coach', 'student'))
);

create table if not exists public.pain_logs (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  pain_location text not null,
  intensity integer not null check (intensity >= 0 and intensity <= 10),
  pain_type text not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.routines (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default now()
);

create table if not exists public.routine_items (
  id bigserial primary key,
  routine_id bigint not null references public.routines(id) on delete cascade,
  exercise_id integer not null references public.exercises(id) on delete cascade,
  order_index integer not null default 0
);

create table if not exists public.progress_logs (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  routine_id bigint references public.routines(id) on delete set null,
  pain_before integer check (pain_before >= 0 and pain_before <= 10),
  pain_after integer check (pain_after >= 0 and pain_after <= 10),
  completed boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists public.coach_student_links (
  id bigserial primary key,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade
);