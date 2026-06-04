'use client';

import { useTranslation } from '@/lib/useTranslation';

interface Role {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

const roles: Role[] = [
  {
    id: 'patient',
    emoji: '🏥',
    title: 'auth.roles.patient.title',
    description: 'auth.roles.patient.description'
  },
  {
    id: 'coach',
    emoji: '💪',
    title: 'auth.roles.coach.title',
    description: 'auth.roles.coach.description'
  },
  {
    id: 'clinic',
    emoji: '🏥',
    title: 'auth.roles.clinic.title',
    description: 'auth.roles.clinic.description'
  }
];

interface RoleSelectorProps {
  selectedRole: string | null;
  onRoleSelect: (roleId: string) => void;
}

export function RoleSelector({ selectedRole, onRoleSelect }: RoleSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          {t('auth.selectRole')}
        </h3>
        <p className="text-sm text-slate-400">
          {t('auth.selectRoleDescription')}
        </p>
      </div>

      <div className="grid gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-200 ${
              selectedRole === role.id
                ? 'border-amber-500 bg-amber-500/20 shadow-md'
                : 'border-slate-600 bg-[#0b1220] hover:border-amber-500/70 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{role.emoji}</span>
              <div className="flex-1">
                <h4 className="font-medium text-white">
                  {t(role.title)}
                </h4>
                <p className="text-sm text-slate-400 mt-1">
                  {t(role.description)}
                </p>
              </div>
              {selectedRole === role.id && (
                <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-slate-950" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z"/>
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
