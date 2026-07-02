import { useMemo, useState } from 'react';
import type { ErpPage, UserRole } from './types';

interface ErpPagesProps {
  role: UserRole;
  page: ErpPage;
  onNavigate: (page: ErpPage) => void;
}

const students = [
  { id: 'GPS001', name: 'Aarav Sharma', className: 'Class 8-A', guardian: 'Rajesh Sharma', phone: '+91 98765 43210', fee: 'Paid', attendance: '96%' },
  { id: 'GPS002', name: 'Ananya Singh', className: 'Class 7-B', guardian: 'Pooja Singh', phone: '+91 91234 56780', fee: 'Pending', attendance: '91%' },
  { id: 'GPS003', name: 'Kabir Verma', className: 'Class 6-A', guardian: 'Manoj Verma', phone: '+91 99887 76655', fee: 'Paid', attendance: '94%' },
  { id: 'GPS004', name: 'Meera Patel', className: 'Class 5-C', guardian: 'Suman Patel', phone: '+91 90011 22334', fee: 'Partial', attendance: '89%' },
  { id: 'GPS005', name: 'Rohan Gupta', className: 'Class 8-B', guardian: 'Deepak Gupta', phone: '+91 97777 11122', fee: 'Paid', attendance: '98%' },
];

const teachers = [
  { id: 'T001', name: 'Neha Mishra', subject: 'Mathematics', classes: '6-A, 7-B, 8-A', phone: '+91 98700 11122', status: 'Active' },
  { id: 'T002', name: 'Amit Kumar', subject: 'Science', classes: '5-C, 6-A, 8-B', phone: '+91 98700 11123', status: 'Active' },
  { id: 'T003', name: 'Priya Singh', subject: 'English', classes: '4-A, 5-B, 7-A', phone: '+91 98700 11124', status: 'On Leave' },
  { id: 'T004', name: 'Rahul Yadav', subject: 'Computer', classes: '6-A, 7-B, 8-A', phone: '+91 98700 11125', status: 'Active' },
];

const fees = [
  { receipt: 'FEE-1021', student: 'Aarav Sharma', className: '8-A', amount: '₹4,500', month: 'July', status: 'Paid' },
  { receipt: 'FEE-1022', student: 'Ananya Singh', className: '7-B', amount: '₹4,000', month: 'July', status: 'Pending' },
  { receipt: 'FEE-1023', student: 'Meera Patel', className: '5-C', amount: '₹2,500', month: 'July', status: 'Partial' },
  { receipt: 'FEE-1024', student: 'Rohan Gupta', className: '8-B', amount: '₹4,500', month: 'July', status: 'Paid' },
];

const notices = [
  { title: 'Parent Teacher Meeting', audience: 'All Parents', date: '05 July 2026', priority: 'High' },
  { title: 'Fee Reminder', audience: 'Pending Fee Students', date: '06 July 2026', priority: 'Medium' },
  { title: 'Science Exhibition', audience: 'Class 6 to 8', date: '10 July 2026', priority: 'Normal' },
];

const pageTitles: Partial<Record<ErpPage, string>> = {
  students: 'All Students', admission: 'Admission Desk', promote: 'Promote Student', teachers: 'Teacher Management',
  attendance: 'Attendance', fees: 'Fee Management', examination: 'Examination', library: 'Library', transport: 'Transport',
  notices: 'Notice Board', documents: 'Documents', settings: 'Settings', classes: 'My Classes', homework: 'Homework',
  marks: 'Marks Entry', messages: 'Messages', calendar: 'Calendar', result: 'Result', profile: 'Profile',
};

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}>{children}</div>
);

const PageHeader = ({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
    <div>
      <p className="text-sm font-black text-red-600 uppercase tracking-wide">Gurukul ERP</p>
      <h2 className="text-3xl sm:text-4xl font-black mt-1">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">{subtitle}</p>
    </div>
    {action}
  </div>
);

const Status = ({ value }: { value: string }) => {
  const cls = value === 'Paid' || value === 'Active' || value === 'Present' ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300' : value === 'Pending' || value === 'High' ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
  return <span className={`px-3 py-1 rounded-full text-xs font-black ${cls}`}>{value}</span>;
};

const SearchFilterBar = ({ query, setQuery, placeholder }: { query: string; setQuery: (value: string) => void; placeholder: string }) => (
  <div className="grid md:grid-cols-[1fr_auto_auto] gap-3 mb-5">
    <label className="relative">
      <span className="absolute left-4 top-3 text-slate-400">🔍</span>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-red-500" />
    </label>
    <select className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 font-bold">
      <option>All Classes</option><option>Class 8-A</option><option>Class 7-B</option><option>Class 6-A</option>
    </select>
    <button className="rounded-2xl bg-slate-100 dark:bg-slate-800 px-5 py-3 font-black hover:bg-slate-200 dark:hover:bg-slate-700">Export</button>
  </div>
);

const StudentsPage = ({ onNavigate }: { onNavigate: (page: ErpPage) => void }) => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => students.filter((s) => `${s.name} ${s.id} ${s.className}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <div>
      <PageHeader title="Student Management" subtitle="Search, view, add and manage all student records." action={<button onClick={() => onNavigate('admission')} className="rounded-2xl bg-red-600 text-white px-5 py-3 font-black shadow-lg shadow-red-600/20">＋ New Admission</button>} />
      <Card className="p-5 overflow-hidden">
        <SearchFilterBar query={query} setQuery={setQuery} placeholder="Search by student name, ID or class..." />
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[820px]">
            <thead className="text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800"><tr><th className="py-3">Student</th><th>ID</th><th>Class</th><th>Guardian</th><th>Fee</th><th>Attendance</th><th>Action</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((student) => <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60"><td className="py-4 font-black">🎓 {student.name}<p className="text-xs font-medium text-slate-500">{student.phone}</p></td><td className="font-bold">{student.id}</td><td>{student.className}</td><td>{student.guardian}</td><td><Status value={student.fee} /></td><td className="font-black">{student.attendance}</td><td><button className="text-red-600 font-black">View</button></td></tr>)}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const AdmissionPage = () => (
  <div>
    <PageHeader title="Admission Form" subtitle="Capture new admission inquiry and student details." />
    <div className="grid xl:grid-cols-3 gap-6">
      <Card className="xl:col-span-2 p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {['Student Name', 'Parent Name', 'Phone Number', 'Email Address', 'Class Applied For', 'Previous School', 'Address', 'Notes'].map((label, i) => (
            <label key={label} className={i > 5 ? 'md:col-span-2' : ''}><span className="text-sm font-black text-slate-600 dark:text-slate-300">{label}</span><input className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" placeholder={label} /></label>
          ))}
        </div>
        <button className="mt-6 rounded-2xl bg-red-600 text-white px-6 py-3 font-black">Save Admission</button>
      </Card>
      <Card className="p-6"><h3 className="text-xl font-black mb-4">Admission Checklist</h3>{['Birth Certificate', 'Aadhaar Card', 'Transfer Certificate', 'Passport Photo'].map((item) => <p key={item} className="rounded-2xl bg-slate-50 dark:bg-slate-800 px-4 py-3 mb-3 font-bold">✅ {item}</p>)}</Card>
    </div>
  </div>
);

const TeachersPage = () => (
  <div><PageHeader title="Teacher Management" subtitle="Manage teacher profiles, subjects and class assignments." action={<button className="rounded-2xl bg-red-600 text-white px-5 py-3 font-black">＋ Add Teacher</button>} /><Card className="p-5 overflow-x-auto"><table className="w-full text-left min-w-[760px]"><thead className="text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800"><tr><th className="py-3">Teacher</th><th>ID</th><th>Subject</th><th>Classes</th><th>Phone</th><th>Status</th><th>Action</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{teachers.map((t) => <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60"><td className="py-4 font-black">👩‍🏫 {t.name}</td><td>{t.id}</td><td>{t.subject}</td><td>{t.classes}</td><td>{t.phone}</td><td><Status value={t.status} /></td><td><button className="text-red-600 font-black">Edit</button></td></tr>)}</tbody></table></Card></div>
);

const AttendancePage = () => (
  <div><PageHeader title="Attendance" subtitle="Mark daily attendance class-wise and track attendance percentage." action={<button className="rounded-2xl bg-red-600 text-white px-5 py-3 font-black">Save Attendance</button>} /><div className="grid lg:grid-cols-4 gap-4 mb-6">{['Class 8-A', '05 July 2026', 'Present 38', 'Absent 4'].map((x) => <Card key={x} className="p-5"><p className="text-slate-500 text-sm font-bold">Today</p><h3 className="text-2xl font-black mt-1">{x}</h3></Card>)}</div><Card className="p-5"><div className="space-y-3">{students.map((s, i) => <div key={s.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl bg-slate-50 dark:bg-slate-800 p-4"><div><h4 className="font-black">{s.name}</h4><p className="text-sm text-slate-500">{s.className} • {s.id}</p></div><div className="flex gap-2"><button className={`rounded-xl px-4 py-2 font-black ${i === 1 ? 'bg-slate-200 dark:bg-slate-700' : 'bg-green-100 text-green-700'}`}>Present</button><button className={`rounded-xl px-4 py-2 font-black ${i === 1 ? 'bg-red-100 text-red-700' : 'bg-slate-200 dark:bg-slate-700'}`}>Absent</button></div></div>)}</div></Card></div>
);

const FeesPage = () => (
  <div><PageHeader title="Fee Management" subtitle="Track paid, pending and partial fee records." action={<button className="rounded-2xl bg-red-600 text-white px-5 py-3 font-black">＋ Collect Fee</button>} /><div className="grid md:grid-cols-3 gap-4 mb-6"><Card className="p-5"><p className="text-slate-500 font-bold">Collected</p><h3 className="text-3xl font-black">₹8.4L</h3></Card><Card className="p-5"><p className="text-slate-500 font-bold">Pending</p><h3 className="text-3xl font-black">₹1.8L</h3></Card><Card className="p-5"><p className="text-slate-500 font-bold">This Month</p><h3 className="text-3xl font-black">82%</h3></Card></div><Card className="p-5 overflow-x-auto"><table className="w-full text-left min-w-[720px]"><thead className="text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800"><tr><th className="py-3">Receipt</th><th>Student</th><th>Class</th><th>Month</th><th>Amount</th><th>Status</th><th>Receipt</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{fees.map((f) => <tr key={f.receipt} className="hover:bg-slate-50 dark:hover:bg-slate-800/60"><td className="py-4 font-black">{f.receipt}</td><td>{f.student}</td><td>{f.className}</td><td>{f.month}</td><td className="font-black">{f.amount}</td><td><Status value={f.status} /></td><td><button className="text-red-600 font-black">Print</button></td></tr>)}</tbody></table></Card></div>
);

const NoticesPage = () => (
  <div><PageHeader title="Notice Board" subtitle="Create and manage notices for students, teachers and parents." action={<button className="rounded-2xl bg-red-600 text-white px-5 py-3 font-black">＋ Create Notice</button>} /><div className="grid lg:grid-cols-3 gap-5">{notices.map((n) => <Card key={n.title} className="p-6 hover:-translate-y-1 transition-transform"><div className="flex items-start justify-between gap-4"><span className="text-4xl">📢</span><Status value={n.priority} /></div><h3 className="text-xl font-black mt-5">{n.title}</h3><p className="text-slate-500 mt-2">Audience: {n.audience}</p><p className="font-bold mt-4">📅 {n.date}</p></Card>)}</div></div>
);

const SimpleModule = ({ page, role }: { page: ErpPage; role: UserRole }) => {
  const title = pageTitles[page] || 'Module';
  const cards = [
    ['Overview', 'Live summary and important KPIs', '📊'],
    ['Records', 'Search and manage module records', '📁'],
    ['Reports', 'PDF/Excel export ready area', '📄'],
    ['Settings', 'Module configuration panel', '⚙️'],
  ];
  return <div><PageHeader title={title} subtitle={`${title} module is connected. Detailed forms and database can be added in the next version for ${role} portal.`} /><div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">{cards.map(([a,b,c]) => <Card key={a} className="p-6"><span className="text-4xl">{c}</span><h3 className="text-xl font-black mt-4">{a}</h3><p className="text-slate-500 dark:text-slate-400 mt-2">{b}</p><button className="mt-5 rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-black hover:bg-red-600 hover:text-white transition-colors">Open</button></Card>)}</div></div>;
};

const ErpPages = ({ role, page, onNavigate }: ErpPagesProps) => {
  if (page === 'students') return <StudentsPage onNavigate={onNavigate} />;
  if (page === 'admission') return <AdmissionPage />;
  if (page === 'teachers') return <TeachersPage />;
  if (page === 'attendance') return <AttendancePage />;
  if (page === 'fees') return <FeesPage />;
  if (page === 'notices') return <NoticesPage />;
  return <SimpleModule page={page} role={role} />;
};

export default ErpPages;
