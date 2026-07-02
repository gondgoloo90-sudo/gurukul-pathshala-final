import { useState } from 'react';
import { schoolConfig } from '../config/schoolData';
import type { UserRole } from './types';
import { roleLabels } from './erpData';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
  onBackHome: () => void;
}

const roles: { role: UserRole; icon: string; description: string }[] = [
  { role: 'admin', icon: '🛡️', description: 'Manage school, fees, students and reports' },
  { role: 'teacher', icon: '👩‍🏫', description: 'Attendance, homework, marks and classes' },
  { role: 'student', icon: '🎓', description: 'Homework, results, attendance and fees' },
];

const LoginPage = ({ onLogin, onBackHome }: LoginPageProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dc2626_0,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b_0,transparent_30%)] opacity-40" />
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        <section className="hidden lg:flex flex-col justify-between p-12">
          <button onClick={onBackHome} className="w-fit text-white/80 hover:text-white transition-colors">← Back to Website</button>
          <div>
            <img src="/logo.svg.png" alt={schoolConfig.logo.alt} className="h-24 w-auto mb-8 bg-white rounded-3xl p-3" />
            <p className="text-red-200 font-semibold mb-4">Gurukul ERP Portal</p>
            <h1 className="text-5xl font-black leading-tight mb-6">Smart School Management for Admin, Teachers and Students.</h1>
            <p className="text-lg text-slate-300 max-w-xl">A modern dashboard experience for attendance, fees, results, homework, notices and school operations.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur"><b className="text-2xl">842+</b><p className="text-sm text-slate-300">Students</p></div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur"><b className="text-2xl">42</b><p className="text-sm text-slate-300">Teachers</p></div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur"><b className="text-2xl">94%</b><p className="text-sm text-slate-300">Attendance</p></div>
          </div>
        </section>

        <main className="flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-xl rounded-[2rem] bg-white text-slate-900 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-bold text-red-600">Welcome Back</p>
                <h2 className="text-3xl font-black">Login Portal</h2>
              </div>
              <button onClick={onBackHome} className="lg:hidden px-4 py-2 rounded-xl bg-slate-100 text-sm font-semibold">Home</button>
            </div>

            <div className="grid gap-3 mb-6">
              {roles.map((item) => (
                <button
                  key={item.role}
                  onClick={() => setSelectedRole(item.role)}
                  className={`text-left rounded-2xl border p-4 transition-all ${selectedRole === item.role ? 'border-red-500 bg-red-50 shadow-md' : 'border-slate-200 hover:border-red-200'}`}
                >
                  <div className="flex gap-4 items-center">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold">{roleLabels[item.role]}</h3>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Email / User ID</label>
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={`${selectedRole}@gurukul.com`} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} className="w-full rounded-2xl border border-slate-200 px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Demo: 123456" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3 text-sm font-semibold text-red-600">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </div>
              <button type="submit" className="w-full rounded-2xl bg-red-600 py-4 text-white font-bold shadow-lg hover:bg-red-700 transition-all">Login as {roleLabels[selectedRole]}</button>
            </form>
            <p className="text-center text-xs text-slate-500 mt-5">Demo login: select any role and click login.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
