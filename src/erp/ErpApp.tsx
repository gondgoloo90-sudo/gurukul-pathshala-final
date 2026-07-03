import { useState } from 'react';
import DashboardHome from './DashboardHome';
import DashboardShell from './DashboardShell';
import LoginPage from './LoginPage';
import ErpPages from './ErpPages';
import type { ErpPage } from './types';
import { clearSession, getSession, type AuthUser } from './auth';

interface ErpAppProps {
  initialMode?: 'login' | 'dashboard';
  onBackHome: () => void;
}

const ErpApp = ({ onBackHome }: ErpAppProps) => {
  const [user, setUser] = useState<AuthUser | null>(() => getSession());
  const [activePage, setActivePage] = useState<ErpPage>('dashboard');

  if (!user) {
    return (
      <LoginPage
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setActivePage('dashboard');
        }}
        onBackHome={onBackHome}
      />
    );
  }

  return (
    <DashboardShell
      role={user.role}
      activePage={activePage}
      onNavigate={setActivePage}
      onLogout={() => {
        clearSession();
        setUser(null);
        setActivePage('dashboard');
      }}
      onBackHome={onBackHome}
    >
      {activePage === 'dashboard' ? <DashboardHome role={user.role} /> : <ErpPages role={user.role} page={activePage} onNavigate={setActivePage} />}
    </DashboardShell>
  );
};

export default ErpApp;
