import { useMemo } from 'react';
import { schoolConfig } from '../config/schoolData';
import type { UserRole } from './types';
import { activities, chartBars, dashboardStats, noticesByRole, quickActions, roleLabels } from './erpData';

interface DashboardHomeProps {
  role: UserRole;
}

const toneClass = {
  red: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning ☀️';
  if (hour < 17) return 'Good Afternoon 🌤️';
  return 'Good Evening 🌙';
};

const ProgressRing = ({ value }: { value: number }) => {
  const background = `conic-gradient(#dc2626 ${value * 3.6}deg, #e2e8f0 0deg)`;
  return (
    <div className="w-28 h-28 rounded-full p-3" style={{ background }}>
      <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
        <span className="text-2xl font-black">{value}%</span>
      </div>
    </div>
  );
};

const DashboardHome = ({ role }: DashboardHomeProps) => {
  const stats = dashboardStats[role];
  const bars = chartBars[role];
  const greeting = useMemo(() => getGreeting(), []);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-gradient-to-r from-red-600 via-red-700 to-slate-950 text-white p-6 sm:p-8 overflow-hidden relative shadow-2xl shadow-red-900/20">
        <div className="absolute right-5 top-5 hidden md:block opacity-10">
          <img src="/logo.svg.png" alt={schoolConfig.logo.alt} className="w-56 h-56 object-contain" />
        </div>
        <div className="absolute -right-16 -bottom-20 text-[14rem] opacity-10">🎓</div>
        <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="max-w-3xl">
            <p className="font-bold text-red-100 mb-2">{greeting} • Welcome to Gurukul ERP</p>
            <h2 className="text-3xl sm:text-5xl font-black mb-3">Hello, {roleLabels[role]} 👋</h2>
            <p className="text-red-100 text-base sm:text-lg">Manage school work faster with analytics, quick actions, responsive layout, live header, dark mode and premium dashboard UI.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <div className="rounded-3xl bg-white/10 backdrop-blur px-5 py-4 border border-white/10"><b className="text-2xl">98%</b><p className="text-xs text-red-100">System Health</p></div>
            <div className="rounded-3xl bg-white/10 backdrop-blur px-5 py-4 border border-white/10"><b className="text-2xl">24</b><p className="text-xs text-red-100">Tasks</p></div>
            <div className="rounded-3xl bg-white/10 backdrop-blur px-5 py-4 border border-white/10 col-span-2 sm:col-span-1"><b className="text-2xl">Live</b><p className="text-xs text-red-100">Dashboard</p></div>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="group bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-5">
              <span className="text-4xl rounded-2xl bg-slate-50 dark:bg-slate-800 p-3">{stat.icon}</span>
              <span className={`${index === 6 ? 'text-amber-700 bg-amber-50 dark:bg-amber-950 dark:text-amber-300' : 'text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-300'} text-xs font-black px-3 py-1 rounded-full`}>{stat.change}</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">{stat.label}</p>
            <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </section>

      <section className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-black">Performance Analytics</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Weekly activity and collection trend</p>
            </div>
            <button className="rounded-2xl bg-red-50 dark:bg-red-950 text-red-600 px-4 py-2 font-black text-sm">Export Report</button>
          </div>
          <div className="h-72 flex items-end gap-3 sm:gap-5 border-b border-slate-200 dark:border-slate-800 pb-4">
            {bars.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                <div className="w-full max-w-16 rounded-t-3xl bg-gradient-to-t from-red-700 to-red-400 hover:from-red-800 hover:to-orange-400 transition-all shadow-lg shadow-red-900/10" style={{ height: `${bar.value}%` }} />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-black mb-2">Attendance Health</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Current day performance score</p>
          <ProgressRing value={role === 'student' ? 92 : role === 'teacher' ? 96 : 94} />
          <p className="mt-6 font-bold text-green-600">Strong performance this week</p>
        </div>
      </section>

      <section className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black">Recent Activity</h3>
            <button className="text-red-600 font-black text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {activities[role].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-slate-700 transition-colors">
                <span className={`w-11 h-11 rounded-2xl flex items-center justify-center ${toneClass[item.tone]}`}>●</span>
                <div className="flex-1">
                  <h4 className="font-black">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.time}</p>
                </div>
                <button className="text-slate-400 hover:text-red-600">⋯</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-black mb-6">Quick Actions</h3>
          <div className="grid gap-3">
            {quickActions[role].map((action) => (
              <button key={action} className="rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all px-4 py-4 text-left font-black shadow-sm">⚡ {action}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 p-6 border border-slate-200 dark:border-slate-800">
          <span className="text-4xl">🗓️</span>
          <h3 className="font-black text-lg mt-4">Today Timetable</h3>
          <div className="mt-4 space-y-3 text-sm">
            {['09:00 - Assembly', '10:00 - Mathematics', '12:00 - Science'].map((item) => <p key={item} className="rounded-2xl bg-slate-50 dark:bg-slate-800 px-4 py-3 font-semibold">{item}</p>)}
          </div>
        </div>
        <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 p-6 border border-slate-200 dark:border-slate-800">
          <span className="text-4xl">📢</span>
          <h3 className="font-black text-lg mt-4">Important Notices</h3>
          <div className="mt-4 space-y-3 text-sm">
            {noticesByRole[role].map((item) => <p key={item} className="rounded-2xl bg-red-50 dark:bg-red-950 px-4 py-3 font-semibold text-red-700 dark:text-red-200">{item}</p>)}
          </div>
        </div>
        <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 p-6 border border-slate-200 dark:border-slate-800">
          <span className="text-4xl">🚀</span>
          <h3 className="font-black text-lg mt-4">Day 2 Ready</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Student, teacher, fees, attendance and result modules can be connected next without changing this layout.</p>
          <div className="mt-5 h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"><div className="h-full w-4/5 bg-gradient-to-r from-red-600 to-orange-400" /></div>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
