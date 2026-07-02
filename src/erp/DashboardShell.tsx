import { useState } from 'react';
import { schoolConfig } from '../config/schoolData';
import type { UserRole } from './types';
import { roleLabels } from './erpData';

interface DashboardShellProps {
  role: UserRole;
  children: React.ReactNode;
  onLogout: () => void;
  onBackHome: () => void;
}

const menuByRole: Record<UserRole, string[]> = {
  admin: ['Dashboard', 'Students', 'Teachers', 'Attendance', 'Fees', 'Results', 'Notices', 'Settings'],
  teacher: ['Dashboard', 'My Classes', 'Attendance', 'Homework', 'Marks', 'Messages', 'Calendar'],
  student: ['Dashboard', 'Homework', 'Attendance', 'Result', 'Fees', 'Notices', 'Profile'],
};

const DashboardShell = ({ role, children, onLogout, onBackHome }: DashboardShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const menu = menuByRole[role];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white">
        {isSidebarOpen && <button aria-label="Close sidebar" onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden" />}

        <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-200 dark:border-slate-800">
            <img src="/logo.svg.png" alt={schoolConfig.logo.alt} className="w-12 h-12 object-contain rounded-xl bg-white" />
            <div>
              <h2 className="font-black leading-tight">Gurukul ERP</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{roleLabels[role]} Portal</p>
            </div>
          </div>
          <nav className="p-4 space-y-2">
            {menu.map((item, index) => (
              <button key={item} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold transition-colors ${index === 0 ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'}`}>
                <span>{['🏠','🎓','👩‍🏫','✅','💳','🏆','📢','⚙️'][index] || '📌'}</span>
                {item}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800">
            <button onClick={onBackHome} className="w-full rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-semibold mb-2">Public Website</button>
            <button onClick={onLogout} className="w-full rounded-2xl bg-red-50 dark:bg-red-950 text-red-600 px-4 py-3 font-bold">Logout</button>
          </div>
        </aside>

        <div className="lg:pl-72">
          <header className="sticky top-0 z-20 h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden rounded-xl bg-slate-100 dark:bg-slate-800 p-3">☰</button>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                <h1 className="text-xl sm:text-2xl font-black">{roleLabels[role]} Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => setDarkMode(!darkMode)} className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 sm:px-4 py-3 font-semibold">{darkMode ? '☀️' : '🌙'}</button>
              <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-2">
                <span className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">{roleLabels[role][0]}</span>
                <span className="font-bold">{roleLabels[role]}</span>
              </div>
            </div>
          </header>
          <main className="p-4 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardShell;
