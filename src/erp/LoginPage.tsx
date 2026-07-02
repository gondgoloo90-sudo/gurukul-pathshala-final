import { useMemo, useState } from 'react';
import { schoolConfig } from '../config/schoolData';
import type { UserRole } from './types';
import { roleLabels } from './erpData';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
  onBackHome: () => void;
}

const roles: { role: UserRole; icon: string; description: string; demo: string }[] = [
  { role: 'admin', icon: '🛡️', description: 'Manage school, fees, students and reports', demo: 'admin@gurukul.com' },
  { role: 'teacher', icon: '👩‍🏫', description: 'Attendance, homework, marks and classes', demo: 'teacher@gurukul.com' },
  { role: 'student', icon: '🎓', description: 'Homework, results, attendance and fees', demo: 'student@gurukul.com' },
];

const LoginPage = ({ onLogin, onBackHome }: LoginPageProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const selected = useMemo(() => roles.find((item) => item.role === selectedRole)!, [selectedRole]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dc2626_0,transparent_32%),radial-gradient(circle_at_bottom_right,#f59e0b_0,transparent_28%),linear-gradient(135deg,#020617_0%,#111827_100%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-[1.05fr_.95fr]">
        <section className="hidden lg:flex flex-col justify-between p-10 xl:p-12">
          <button onClick={onBackHome} className="w-fit text-white/80 hover:text-white transition-colors font-semibold">← Back to Website</button>
          <div>
            <div className="w-36 h-28 bg-white rounded-[2rem] p-4 shadow-2xl mb-8 flex items-center justify-center">
              <img src="/logo.svg.png" alt={schoolConfig.logo.alt} className="max-w-full max-h-full object-contain" />
            </div>
            <p className="text-red-200 font-black mb-4 tracking-wide">Gurukul ERP Portal</p>
            <h1 className="text-5xl xl:text-6xl font-black leading-tight mb-6">Smart School Management for every role.</h1>
            <p className="text-lg text-slate-300 max-w-xl">Premium dashboard for attendance, fees, results, homework, notices, analytics and school operations.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Role Based Login', 'Dark Mode', 'Mobile Ready', 'Analytics'].map((item) => <span key={item} className="rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm font-bold">✓ {item}</span>)}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur border border-white/10"><b className="text-3xl">842+</b><p className="text-sm text-slate-300">Students</p></div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur border border-white/10"><b className="text-3xl">42</b><p className="text-sm text-slate-300">Teachers</p></div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur border border-white/10"><b className="text-3xl">94%</b><p className="text-sm text-slate-300">Attendance</p></div>
          </div>
        </section>

        <main className="flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-xl rounded-[2rem] bg-white text-slate-900 shadow-2xl p-6 sm:p-8 border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-black text-red-600">Welcome Back</p>
                <h2 className="text-3xl sm:text-4xl font-black">Login Portal</h2>
                <p className="text-sm text-slate-500 mt-1">Choose role and enter demo login.</p>
              </div>
              <button onClick={onBackHome} className="lg:hidden px-4 py-2 rounded-xl bg-slate-100 text-sm font-bold">Home</button>
            </div>

            <div className="grid gap-3 mb-6">
              {roles.map((item) => (
                <button
                  key={item.role}
                  onClick={() => setSelectedRole(item.role)}
                  className={`text-left rounded-3xl border p-4 transition-all ${selectedRole === item.role ? 'border-red-500 bg-red-50 shadow-lg shadow-red-100' : 'border-slate-200 hover:border-red-200 hover:bg-slate-50'}`}
                >
                  <div className="flex gap-4 items-center">
                    <span className="text-3xl rounded-2xl bg-white p-2 shadow-sm">{item.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-black">{roleLabels[item.role]}</h3>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                    {selectedRole === item.role && <span className="text-red-600 font-black">✓</span>}
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-black mb-2">Email / User ID</label>
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500" defaultValue={selected.demo} key={selected.demo} />
              </div>
              <div>
                <label className="block text-sm font-black mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} className="w-full rounded-2xl border border-slate-200 px-4 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-red-500" defaultValue="123456" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-sm font-black text-red-600">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </div>
              <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-700 py-4 text-white font-black shadow-lg shadow-red-600/25 hover:scale-[1.01] transition-all">Login as {roleLabels[selectedRole]}</button>
            </form>
            <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-center text-xs text-slate-500 font-semibold">Demo password: 123456 • No real data saved yet</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
