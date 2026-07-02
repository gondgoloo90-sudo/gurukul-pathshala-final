import { useState } from 'react';
import DashboardHome from './DashboardHome';
import DashboardShell from './DashboardShell';
import LoginPage from './LoginPage';
import type { UserRole } from './types';

interface ErpAppProps {
  initialMode?: 'login' | 'dashboard';
  onBackHome: () => void;
}

const ErpApp = ({ onBackHome }: ErpAppProps) => {
  const [role, setRole] = useState<UserRole | null>(null);

  if (!role) {
    return <LoginPage onLogin={setRole} onBackHome={onBackHome} />;
  }

  return (
    <DashboardShell role={role} onLogout={() => setRole(null)} onBackHome={onBackHome}>
      <DashboardHome role={role} />
    </DashboardShell>
  );
};

export default ErpApp;
