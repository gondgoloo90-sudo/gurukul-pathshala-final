import { useState } from 'react';
import DashboardHome from './DashboardHome';
import DashboardShell from './DashboardShell';
import LoginPage from './LoginPage';
import ErpPages from './ErpPages';
import type { ErpPage, UserRole } from './types';

interface ErpAppProps {
  initialMode?: 'login' | 'dashboard';
  onBackHome: () => void;
}

const ErpApp = ({ onBackHome }: ErpAppProps) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [activePage, setActivePage] = useState<ErpPage>('dashboard');

  if (!role) {
    return <LoginPage onLogin={(nextRole) => { setRole(nextRole); setActivePage('dashboard'); }} onBackHome={onBackHome} />;
  }

  return (
    <DashboardShell
      role={role}
      activePage={activePage}
      onNavigate={setActivePage}
      onLogout={() => { setRole(null); setActivePage('dashboard'); }}
      onBackHome={onBackHome}
    >
      {activePage === 'dashboard' ? <DashboardHome role={role} /> : <ErpPages role={role} page={activePage} onNavigate={setActivePage} />}
    </DashboardShell>
  );
};

export default ErpApp;
