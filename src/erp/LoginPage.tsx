import { useState } from 'react';
import { schoolConfig } from '../config/schoolData';
import { isValidEmail } from '../lib/validators';
import type { UserRole } from './types';
import { roleLabels } from './erpData';
import { loginRequest, requestOtp, saveSession, verifyOtp, type AuthUser } from './auth';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
  onBackHome: () => void;
}

type Screen = 'role' | 'form' | 'forgot';

const roles: { role: UserRole; icon: string; description: string; demo: string }[] = [
  { role: 'admin', icon: '🛡️', description: 'Manage school, fees, students and reports', demo: 'admin@gurukul.com' },
  { role: 'teacher', icon: '👩‍🏫', description: 'Attendance, homework, marks and classes', demo: 'teacher@gurukul.com' },
  { role: 'student', icon: '🎓', description: 'Homework, results, attendance and fees', demo: 'student@gurukul.com' },
];

const BrandPanel = ({ onBackHome }: { onBackHome: () => void }) => (
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
        {['Role Based Login', 'Secure Access', 'Mobile Ready', 'Analytics'].map((item) => <span key={item} className="rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm font-bold">✓ {item}</span>)}
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="rounded-3xl bg-white/10 p-5 backdrop-blur border border-white/10"><b className="text-3xl">842+</b><p className="text-sm text-slate-300">Students</p></div>
      <div className="rounded-3xl bg-white/10 p-5 backdrop-blur border border-white/10"><b className="text-3xl">42</b><p className="text-sm text-slate-300">Teachers</p></div>
      <div className="rounded-3xl bg-white/10 p-5 backdrop-blur border border-white/10"><b className="text-3xl">94%</b><p className="text-sm text-slate-300">Attendance</p></div>
    </div>
  </section>
);

const CardShell = ({ onBackHome, children }: { onBackHome: () => void; children: React.ReactNode }) => (
  <main className="flex items-center justify-center p-4 sm:p-8">
    <div className="w-full max-w-xl rounded-[2rem] bg-white text-slate-900 shadow-2xl p-6 sm:p-8 border border-white/50">
      {children}
      <div className="lg:hidden mt-4 text-center">
        <button onClick={onBackHome} className="text-sm font-bold text-slate-500 hover:text-red-600">← Back to Website</button>
      </div>
    </div>
  </main>
);

const LoginPage = ({ onLoginSuccess, onBackHome }: LoginPageProps) => {
  const [screen, setScreen] = useState<Screen>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password / OTP state
  const [otpStep, setOtpStep] = useState<'request' | 'sent'>('request');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const openRoleForm = (role: UserRole) => {
    const selected = roles.find((item) => item.role === role)!;
    setSelectedRole(role);
    setEmail(selected.demo);
    setPassword('123456');
    setError('');
    setShowPassword(false);
    setScreen('form');
  };

  const backToRoles = () => {
    setScreen('role');
    setSelectedRole(null);
    setError('');
  };

  const openForgotPassword = () => {
    setContact(email || '');
    setOtp('');
    setOtpStep('request');
    setOtpMessage('');
    setOtpError('');
    setOtpSuccess('');
    setScreen('forgot');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedRole) return;
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    const result = await loginRequest(email, password, selectedRole);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    saveSession(result.user, remember);
    onLoginSuccess(result.user);
  };

  const handleSendOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setOtpError('');
    setOtpSuccess('');
    setOtpLoading(true);
    const result = await requestOtp(contact);
    setOtpLoading(false);
    if (!result.success) {
      setOtpError(result.message);
      return;
    }
    setOtpMessage(result.message);
    setOtpStep('sent');
  };

  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setOtpError('');
    setOtpSuccess('');
    setOtpLoading(true);
    const result = await verifyOtp(otp);
    setOtpLoading(false);
    if (!result.success) {
      setOtpError(result.message);
      return;
    }
    setOtpSuccess(result.message);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dc2626_0,transparent_32%),radial-gradient(circle_at_bottom_right,#f59e0b_0,transparent_28%),linear-gradient(135deg,#020617_0%,#111827_100%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-[1.05fr_.95fr]">
        <BrandPanel onBackHome={onBackHome} />

        {/* Screen 1: Role selection */}
        {screen === 'role' && (
          <CardShell onBackHome={onBackHome}>
            <div className="mb-8">
              <p className="text-sm font-black text-red-600">Welcome Back</p>
              <h2 className="text-3xl sm:text-4xl font-black">Select Your Login</h2>
              <p className="text-sm text-slate-500 mt-1">Choose your role to continue to the sign-in form.</p>
            </div>

            <div className="grid gap-4">
              {roles.map((item) => (
                <button
                  key={item.role}
                  onClick={() => openRoleForm(item.role)}
                  className="text-left rounded-3xl border border-slate-200 p-5 transition-all hover:border-red-300 hover:bg-red-50 hover:shadow-lg hover:shadow-red-100 flex gap-4 items-center group"
                >
                  <span className="text-3xl rounded-2xl bg-white p-3 shadow-sm border border-slate-100 group-hover:border-red-200">{item.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-black text-lg">{roleLabels[item.role]}</h3>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                  <span className="text-red-600 font-black text-xl">→</span>
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-center text-xs text-slate-500 font-semibold">Pick a role to open its dedicated login form</div>
          </CardShell>
        )}

        {/* Screen 2: Role-specific login form */}
        {screen === 'form' && selectedRole && (
          <CardShell onBackHome={onBackHome}>
            <button onClick={backToRoles} className="mb-5 text-sm font-bold text-slate-500 hover:text-red-600 flex items-center gap-1">← Back to role selection</button>

            <div className="mb-6 flex items-center gap-4">
              <span className="text-3xl rounded-2xl bg-red-50 p-3">{roles.find((r) => r.role === selectedRole)!.icon}</span>
              <div>
                <p className="text-sm font-black text-red-600">{roleLabels[selectedRole]} Login</p>
                <h2 className="text-2xl sm:text-3xl font-black">Sign in to continue</h2>
              </div>
            </div>

            {error && (
              <div role="alert" className="mb-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-bold">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-black mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="you@example.com"
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-black mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-red-500"
                    autoComplete="current-password"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-sm font-black text-red-600">
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 font-semibold text-slate-600">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-slate-300" />
                  Remember me
                </label>
                <button type="button" onClick={openForgotPassword} className="font-black text-red-600 hover:text-red-700">
                  Forgot Password?
                </button>
              </div>

              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-700 py-4 text-white font-black shadow-lg shadow-red-600/25 hover:scale-[1.01] transition-all disabled:opacity-60 disabled:hover:scale-100">
                {loading ? 'Signing in…' : `Login as ${roleLabels[selectedRole]}`}
              </button>
            </form>

            <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-center text-xs text-slate-500 font-semibold">Demo password: 123456 • No real data saved yet</div>
          </CardShell>
        )}

        {/* Screen 3: Forgot Password / OTP demo */}
        {screen === 'forgot' && (
          <CardShell onBackHome={onBackHome}>
            <button onClick={() => setScreen('form')} className="mb-5 text-sm font-bold text-slate-500 hover:text-red-600 flex items-center gap-1">← Back to login</button>

            <div className="mb-6">
              <p className="text-sm font-black text-red-600">Account Recovery</p>
              <h2 className="text-2xl sm:text-3xl font-black">Forgot Password / OTP</h2>
              <p className="text-sm text-slate-500 mt-1">Verify your identity with a one-time password.</p>
            </div>

            {otpError && (
              <div role="alert" className="mb-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-bold">⚠️ {otpError}</div>
            )}
            {otpMessage && otpStep === 'sent' && !otpSuccess && (
              <div className="mb-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 text-sm font-bold">📩 {otpMessage}</div>
            )}
            {otpSuccess && (
              <div className="mb-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm font-bold">✅ {otpSuccess}</div>
            )}

            {otpStep === 'request' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-black mb-2">Registered Email / Mobile Number</label>
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="you@example.com or 9876543210"
                    required
                  />
                </div>
                <button type="submit" disabled={otpLoading} className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-700 py-4 text-white font-black shadow-lg shadow-red-600/25 hover:scale-[1.01] transition-all disabled:opacity-60 disabled:hover:scale-100">
                  {otpLoading ? 'Sending OTP…' : 'Send OTP'}
                </button>
              </form>
            )}

            {otpStep === 'sent' && !otpSuccess && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-black mb-2">Enter 6-digit OTP</label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    inputMode="numeric"
                    maxLength={6}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-4 tracking-[0.5em] text-center text-lg font-black focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="000000"
                    required
                  />
                </div>
                <button type="submit" disabled={otpLoading} className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-700 py-4 text-white font-black shadow-lg shadow-red-600/25 hover:scale-[1.01] transition-all disabled:opacity-60 disabled:hover:scale-100">
                  {otpLoading ? 'Verifying…' : 'Verify OTP'}
                </button>
                <button type="button" onClick={() => setOtpStep('request')} className="w-full text-center text-sm font-bold text-slate-500 hover:text-red-600">
                  Didn't get it? Resend to a different contact
                </button>
              </form>
            )}

            {otpSuccess && (
              <button onClick={() => setScreen('form')} className="w-full rounded-2xl bg-slate-950 py-4 text-white font-black hover:bg-slate-800 transition-all">
                Back to Login
              </button>
            )}

            <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-center text-xs text-amber-700 font-bold">
              ℹ️ OTP verification is demo-ready. Backend integration can be added later.
            </div>
          </CardShell>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
