import { useState } from 'react';
import DashboardHome from './DashboardHome';
import DashboardShell from './DashboardShell';
import LoginPage from './LoginPage';
import ErpPages from './ErpPages';
import WebsiteControlPanel from './WebsiteControlPanel';
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

  // Defense in depth: "Website Control Panel" is Admin-only. The sidebar only
  // shows this item to Admin, but this guard blocks direct access too, in
  // case activePage is ever set another way.
  const isWebsiteSettings = activePage === 'website-settings';
  const canViewWebsiteSettings = isWebsiteSettings && user.role === 'admin';
  const page = isWebsiteSettings && !canViewWebsiteSettings ? 'dashboard' : activePage;

  return (
    <DashboardShell
      role={user.role}
      activePage={page}
      onNavigate={setActivePage}
      onLogout={() => {
        clearSession();
        setUser(null);
        setActivePage('dashboard');
      }}
      onBackHome={onBackHome}
    >
      {page === 'dashboard' ? <DashboardHome role={user.role} /> : canViewWebsiteSettings ? <WebsiteControlPanel /> : <ErpPages role={user.role} page={page} onNavigate={setActivePage} />}
    </DashboardShell>
  );
};

export default ErpApp;
