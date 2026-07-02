import { useEffect, useState } from 'react';
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
  const [role, setRole] = useState<UserRole | null>(() => {
    const savedRole = window.localStorage.getItem('gurukul-active-role') as UserRole | null;
    return savedRole === 'admin' || savedRole === 'teacher' || savedRole === 'student' ? savedRole : null;
  });
  const [activePage, setActivePage] = useState<ErpPage>('dashboard');

  useEffect(() => {
    if (role) window.localStorage.setItem('gurukul-active-role', role);
    else window.localStorage.removeItem('gurukul-active-role');
  }, [role]);

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
