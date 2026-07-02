import type { UserRole } from './types';
import { activities, dashboardStats, quickActions, roleLabels } from './erpData';

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

const DashboardHome = ({ role }: DashboardHomeProps) => {
  const stats = dashboardStats[role];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white p-6 sm:p-8 overflow-hidden relative">
        <div className="absolute right-0 top-0 text-[10rem] opacity-10">🎓</div>
        <div className="relative z-10 max-w-3xl">
          <p className="font-semibold text-red-100 mb-2">Welcome to Gurukul ERP</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">Hello, {roleLabels[role]} 👋</h2>
          <p className="text-red-100">Manage your school work faster with a clean dashboard, quick actions, responsive layout and dark mode.</p>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-5">
              <span className="text-4xl">{stat.icon}</span>
              <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-950 px-3 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{stat.label}</p>
            <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </section>

      <section className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black">Recent Activity</h3>
            <button className="text-red-600 font-bold text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {activities[role].map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className={`w-10 h-10 rounded-2xl flex items-center justify-center ${toneClass[item.tone]}`}>●</span>
                <div className="flex-1">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-black mb-6">Quick Actions</h3>
          <div className="grid gap-3">
            {quickActions[role].map((action) => (
              <button key={action} className="rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-red-600 hover:text-white transition-colors px-4 py-4 text-left font-bold">⚡ {action}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {['Today Timetable', 'Important Notice', 'Performance'].map((title, index) => (
          <div key={title} className="rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800">
            <span className="text-3xl">{['🗓️','📢','📈'][index]}</span>
            <h3 className="font-black text-lg mt-4">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">This section is ready for Day 2 real data integration.</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DashboardHome;
