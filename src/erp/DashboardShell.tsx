import { useEffect, useMemo, useState } from 'react';
import { schoolConfig } from '../config/schoolData';
import type { ErpPage, UserRole } from './types';
import { roleLabels, roleSubtitles } from './erpData';

interface DashboardShellProps {
  role: UserRole;
  children: React.ReactNode;
  activePage: ErpPage;
  onNavigate: (page: ErpPage) => void;
  onLogout: () => void;
  onBackHome: () => void;
}

const menuByRole: Record<UserRole, { label: string; icon: string; page: ErpPage; children?: { label: string; page: ErpPage }[] }[]> = {
  admin: [
    { label: 'Dashboard', icon: '🏠', page: 'dashboard' },
    { label: 'Student Management', icon: '🎓', page: 'students', children: [{ label: 'All Students', page: 'students' }, { label: 'Admission', page: 'admission' }, { label: 'Promote Student', page: 'promote' }] },
    { label: 'Teacher Management', icon: '👩‍🏫', page: 'teachers' },
    { label: 'Attendance', icon: '✅', page: 'attendance' },
    { label: 'Fee Management', icon: '💰', page: 'fees' },
    { label: 'Examination', icon: '📊', page: 'examination' },
    { label: 'Library', icon: '📚', page: 'library' },
    { label: 'Transport', icon: '🚌', page: 'transport' },
    { label: 'Notice Board', icon: '📢', page: 'notices' },
    { label: 'Documents', icon: '📁', page: 'documents' },
    { label: 'Website Control Panel', icon: '🌐', page: 'website-settings' },
    { label: 'Settings', icon: '⚙️', page: 'settings' },
  ],
  teacher: [
    { label: 'Dashboard', icon: '🏠', page: 'dashboard' },
    { label: 'My Classes', icon: '📚', page: 'classes' },
    { label: 'Attendance', icon: '✅', page: 'attendance' },
    { label: 'Homework', icon: '📝', page: 'homework' },
    { label: 'Marks', icon: '🏆', page: 'marks' },
    { label: 'Messages', icon: '💬', page: 'messages' },
    { label: 'Calendar', icon: '🗓️', page: 'calendar' },
    { label: 'Settings', icon: '⚙️', page: 'settings' },
  ],
  student: [
    { label: 'Dashboard', icon: '🏠', page: 'dashboard' },
    { label: 'Homework', icon: '📘', page: 'homework' },
    { label: 'Attendance', icon: '✅', page: 'attendance' },
    { label: 'Result', icon: '🏆', page: 'result' },
    { label: 'Fees', icon: '💳', page: 'fees' },
    { label: 'Notices', icon: '📢', page: 'notices' },
    { label: 'Profile', icon: '👤', page: 'profile' },
  ],
};

const DashboardShell = ({ role, children, activePage, onNavigate, onLogout, onBackHome }: DashboardShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const menu = menuByRole[role];

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedDate = useMemo(() => now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), [now]);
  const formattedTime = useMemo(() => now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), [now]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
        {isSidebarOpen && <button aria-label="Close sidebar" onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden" />}

        <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transform transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-24 flex items-center gap-4 px-5 border-b border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
              <img src="/logo.svg.png" alt={schoolConfig.logo.alt} className="w-14 h-14 object-contain" />
            </div>
            <div>
              <h2 className="font-black leading-tight text-lg">Gurukul ERP</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{roleSubtitles[role]}</p>
            </div>
          </div>

          <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-14rem)]">
            {menu.map((item) => {
              const isActive = activePage === item.page || item.children?.some((child) => child.page === activePage);
              return (
                <div key={item.label}>
                  <button
                    onClick={() => { onNavigate(item.page); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-bold transition-all ${isActive ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/25' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {item.children && <span className="text-xs opacity-70">▾</span>}
                  </button>
                  {item.children && role === 'admin' && (
                    <div className="ml-9 mt-1 mb-2 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.page}
                          onClick={() => { onNavigate(child.page); setIsSidebarOpen(false); }}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-xl font-semibold ${activePage === child.page ? 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-300' : 'text-slate-500 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800'}`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95">
            <button onClick={onBackHome} className="w-full rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-bold mb-2 hover:bg-slate-200 dark:hover:bg-slate-700">🌐 Public Website</button>
            <button onClick={onLogout} className="w-full rounded-2xl bg-red-50 dark:bg-red-950 text-red-600 px-4 py-3 font-black hover:bg-red-100 dark:hover:bg-red-900">🚪 Logout</button>
          </div>
        </aside>

        <div className="lg:pl-80">
          <header className="sticky top-0 z-20 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden rounded-2xl bg-slate-100 dark:bg-slate-800 p-3">☰</button>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">{formattedDate} • {formattedTime}</p>
                  <h1 className="text-xl sm:text-3xl font-black truncate">{roleLabels[role]} {activePage === 'dashboard' ? 'Dashboard' : 'Portal'}</h1>
                </div>
              </div>

              <div className="hidden xl:flex flex-1 max-w-md mx-6">
                <label className="w-full relative">
                  <span className="absolute left-4 top-3 text-slate-400">🔍</span>
                  <input className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-red-500" placeholder="Search students, fees, reports, notices..." />
                </label>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button className="hidden sm:flex rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-bold">🔔</button>
                <button className="hidden sm:flex rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-bold">✉️</button>
                <button onClick={() => setDarkMode(!darkMode)} className="rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-bold">{darkMode ? '☀️' : '🌙'}</button>
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 pl-2 pr-4 py-2">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center font-black">{roleLabels[role][0]}</span>
                    <span className="hidden sm:block font-black">{roleLabels[role]}</span>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2">
                      {['My Profile', 'Settings', 'Change Password'].map((item) => <button key={item} className="w-full text-left px-4 py-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold">{item}</button>)}
                      <button onClick={onLogout} className="w-full text-left px-4 py-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950 text-red-600 font-black">Logout</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          <main className="p-4 sm:p-8">{children}</main>
          <footer className="px-4 sm:px-8 pb-8 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <span>Gurukul ERP Version 2.1 • Enterprise Dashboard Polish</span>
            <span>Client Demo Ready • Gurukul Pathshala © 2026</span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardShell;
