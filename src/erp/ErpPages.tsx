import { useMemo, useState } from 'react';
import type { ErpPage, UserRole } from './types';

interface ErpPagesProps {
  role: UserRole;
  page: ErpPage;
  onNavigate: (page: ErpPage) => void;
}

type Student = {
  id: string;
  name: string;
  className: string;
  section: string;
  guardian: string;
  phone: string;
  fee: 'Paid' | 'Pending' | 'Partial';
  attendance: string;
  address: string;
  status: 'Active' | 'Inactive';
};

type Teacher = {
  id: string;
  name: string;
  subject: string;
  classes: string;
  phone: string;
  email: string;
  status: 'Active' | 'On Leave';
};

type FeeRecord = {
  receipt: string;
  student: string;
  className: string;
  amount: number;
  month: string;
  status: 'Paid' | 'Pending' | 'Partial';
  date: string;
};

type Notice = {
  id: string;
  title: string;
  audience: string;
  date: string;
  priority: 'High' | 'Medium' | 'Normal';
  message: string;
};

type AttendanceRecord = {
  studentId: string;
  status: 'Present' | 'Absent' | 'Leave';
};

const initialStudents: Student[] = [
  { id: 'GPS001', name: 'Aarav Sharma', className: 'Class 8', section: 'A', guardian: 'Rajesh Sharma', phone: '+91 98765 43210', fee: 'Paid', attendance: '96%', address: 'Varanasi, UP', status: 'Active' },
  { id: 'GPS002', name: 'Ananya Singh', className: 'Class 7', section: 'B', guardian: 'Pooja Singh', phone: '+91 91234 56780', fee: 'Pending', attendance: '91%', address: 'BLW, Varanasi', status: 'Active' },
  { id: 'GPS003', name: 'Kabir Verma', className: 'Class 6', section: 'A', guardian: 'Manoj Verma', phone: '+91 99887 76655', fee: 'Paid', attendance: '94%', address: 'Manduadih, Varanasi', status: 'Active' },
  { id: 'GPS004', name: 'Meera Patel', className: 'Class 5', section: 'C', guardian: 'Suman Patel', phone: '+91 90011 22334', fee: 'Partial', attendance: '89%', address: 'Sigra, Varanasi', status: 'Active' },
  { id: 'GPS005', name: 'Rohan Gupta', className: 'Class 8', section: 'B', guardian: 'Deepak Gupta', phone: '+91 97777 11122', fee: 'Paid', attendance: '98%', address: 'Lanka, Varanasi', status: 'Active' },
  { id: 'GPS006', name: 'Sara Khan', className: 'Class 4', section: 'A', guardian: 'Nadeem Khan', phone: '+91 93000 22211', fee: 'Pending', attendance: '87%', address: 'Chitaipur, Varanasi', status: 'Active' },
];

const initialTeachers: Teacher[] = [
  { id: 'T001', name: 'Neha Mishra', subject: 'Mathematics', classes: '6-A, 7-B, 8-A', phone: '+91 98700 11122', email: 'neha@gurukul.com', status: 'Active' },
  { id: 'T002', name: 'Amit Kumar', subject: 'Science', classes: '5-C, 6-A, 8-B', phone: '+91 98700 11123', email: 'amit@gurukul.com', status: 'Active' },
  { id: 'T003', name: 'Priya Singh', subject: 'English', classes: '4-A, 5-B, 7-A', phone: '+91 98700 11124', email: 'priya@gurukul.com', status: 'On Leave' },
  { id: 'T004', name: 'Rahul Yadav', subject: 'Computer', classes: '6-A, 7-B, 8-A', phone: '+91 98700 11125', email: 'rahul@gurukul.com', status: 'Active' },
];

const initialFees: FeeRecord[] = [
  { receipt: 'FEE-1021', student: 'Aarav Sharma', className: '8-A', amount: 4500, month: 'July', status: 'Paid', date: '02 Jul 2026' },
  { receipt: 'FEE-1022', student: 'Ananya Singh', className: '7-B', amount: 4000, month: 'July', status: 'Pending', date: 'Due' },
  { receipt: 'FEE-1023', student: 'Meera Patel', className: '5-C', amount: 2500, month: 'July', status: 'Partial', date: '01 Jul 2026' },
  { receipt: 'FEE-1024', student: 'Rohan Gupta', className: '8-B', amount: 4500, month: 'July', status: 'Paid', date: '29 Jun 2026' },
];

const initialNotices: Notice[] = [
  { id: 'N001', title: 'Parent Teacher Meeting', audience: 'All Parents', date: '05 July 2026', priority: 'High', message: 'PTM will be held from 10 AM to 2 PM.' },
  { id: 'N002', title: 'Fee Reminder', audience: 'Pending Fee Students', date: '06 July 2026', priority: 'Medium', message: 'Please clear pending fees before due date.' },
  { id: 'N003', title: 'Science Exhibition', audience: 'Class 6 to 8', date: '10 July 2026', priority: 'Normal', message: 'Students should submit project names by Friday.' },
];

const pageTitles: Partial<Record<ErpPage, string>> = {
  students: 'All Students', admission: 'Admission Desk', promote: 'Promote Student', teachers: 'Teacher Management',
  attendance: 'Attendance', fees: 'Fee Management', examination: 'Examination', library: 'Library', transport: 'Transport',
  notices: 'Notice Board', documents: 'Documents', settings: 'Settings', classes: 'My Classes', homework: 'Homework',
  marks: 'Marks Entry', messages: 'Messages', calendar: 'Calendar', result: 'Result', profile: 'Profile',
};

const classOptions = ['All Classes', 'Class 8', 'Class 7', 'Class 6', 'Class 5', 'Class 4'];

const money = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

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
  const cls = value === 'Paid' || value === 'Active' || value === 'Present'
    ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
    : value === 'Pending' || value === 'High' || value === 'Absent'
      ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
      : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
  return <span className={`px-3 py-1 rounded-full text-xs font-black ${cls}`}>{value}</span>;
};

const PrimaryButton = ({ children, onClick, type = 'button' }: { children: React.ReactNode; onClick?: () => void; type?: 'button' | 'submit' }) => (
  <button type={type} onClick={onClick} className="rounded-2xl bg-red-600 text-white px-5 py-3 font-black shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors">{children}</button>
);

const SoftButton = ({ children, onClick, type = 'button' }: { children: React.ReactNode; onClick?: () => void; type?: 'button' | 'submit' }) => (
  <button type={type} onClick={onClick} className="rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">{children}</button>
);

const DangerButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button onClick={onClick} className="rounded-2xl bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 px-4 py-3 font-black hover:bg-red-100 dark:hover:bg-red-900 transition-colors">{children}</button>
);

const TextInput = ({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) => (
  <label>
    <span className="text-sm font-black text-slate-600 dark:text-slate-300">{label}</span>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || label} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
  </label>
);

const SelectInput = ({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) => (
  <label>
    <span className="text-sm font-black text-slate-600 dark:text-slate-300">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500">
      {options.map((option) => <option key={option}>{option}</option>)}
    </select>
  </label>
);

const Modal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl">
      <div className="sticky top-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <h3 className="text-2xl font-black">{title}</h3>
        <button onClick={onClose} className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 font-black">×</button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const EmptyState = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center py-12">
    <div className="text-5xl mb-4">🔍</div>
    <h3 className="text-xl font-black">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 mt-2">{subtitle}</p>
  </div>
);

const SummaryCards = ({ items }: { items: { label: string; value: string; icon: string }[] }) => (
  <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
    {items.map((item) => <Card key={item.label} className="p-5"><div className="flex items-center justify-between"><div><p className="text-slate-500 dark:text-slate-400 font-bold text-sm">{item.label}</p><h3 className="text-3xl font-black mt-1">{item.value}</h3></div><span className="text-4xl rounded-2xl bg-slate-50 dark:bg-slate-800 p-3">{item.icon}</span></div></Card>)}
  </div>
);

const StudentsPage = ({ onNavigate }: { onNavigate: (page: ErpPage) => void }) => {
  const [studentList, setStudentList] = useState<Student[]>(initialStudents);
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [editing, setEditing] = useState<Student | null>(null);
  const [viewing, setViewing] = useState<Student | null>(null);

  const filtered = useMemo(() => studentList.filter((s) => {
    const matchesSearch = `${s.name} ${s.id} ${s.className} ${s.guardian}`.toLowerCase().includes(query.toLowerCase());
    const matchesClass = classFilter === 'All Classes' || s.className === classFilter;
    return matchesSearch && matchesClass;
  }), [studentList, query, classFilter]);

  const totalPending = studentList.filter((student) => student.fee !== 'Paid').length;

  const saveStudent = (student: Student) => {
    setStudentList((current) => current.some((item) => item.id === student.id) ? current.map((item) => item.id === student.id ? student : item) : [student, ...current]);
    setEditing(null);
  };

  return (
    <div>
      <PageHeader title="Student Management" subtitle="Real working student records with add, edit, delete, search, filter and profile view." action={<div className="flex gap-2"><SoftButton onClick={() => onNavigate('admission')}>Admission Desk</SoftButton><PrimaryButton onClick={() => setEditing({ id: `GPS${String(studentList.length + 1).padStart(3, '0')}`, name: '', className: 'Class 8', section: 'A', guardian: '', phone: '', fee: 'Pending', attendance: '0%', address: '', status: 'Active' })}>＋ Add Student</PrimaryButton></div>} />
      <SummaryCards items={[{ label: 'Total Students', value: String(studentList.length), icon: '🎓' }, { label: 'Active Students', value: String(studentList.filter((s) => s.status === 'Active').length), icon: '✅' }, { label: 'Pending Fees', value: String(totalPending), icon: '💳' }, { label: 'Average Attendance', value: '93%', icon: '📊' }]} />
      <Card className="p-5 overflow-hidden">
        <div className="grid md:grid-cols-[1fr_220px_auto] gap-3 mb-5">
          <label className="relative"><span className="absolute left-4 top-3 text-slate-400">🔍</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by student name, ID, class or guardian..." className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-red-500" /></label>
          <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 font-bold">{classOptions.map((option) => <option key={option}>{option}</option>)}</select>
          <SoftButton>Export CSV</SoftButton>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800"><tr><th className="py-3">Student</th><th>ID</th><th>Class</th><th>Guardian</th><th>Fee</th><th>Attendance</th><th>Status</th><th>Action</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((student) => <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60"><td className="py-4 font-black">🎓 {student.name || 'New Student'}<p className="text-xs font-medium text-slate-500">{student.phone}</p></td><td className="font-bold">{student.id}</td><td>{student.className}-{student.section}</td><td>{student.guardian}</td><td><Status value={student.fee} /></td><td className="font-black">{student.attendance}</td><td><Status value={student.status} /></td><td><div className="flex gap-2"><button onClick={() => setViewing(student)} className="text-blue-600 font-black">View</button><button onClick={() => setEditing(student)} className="text-red-600 font-black">Edit</button><button onClick={() => setStudentList((current) => current.filter((item) => item.id !== student.id))} className="text-slate-500 font-black">Delete</button></div></td></tr>)}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState title="No students found" subtitle="Try changing search or class filter." />}
        </div>
      </Card>
      {editing && <StudentForm student={editing} onClose={() => setEditing(null)} onSave={saveStudent} />}
      {viewing && <StudentProfile student={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
};

const StudentForm = ({ student, onClose, onSave }: { student: Student; onClose: () => void; onSave: (student: Student) => void }) => {
  const [form, setForm] = useState<Student>(student);
  return (
    <Modal title={student.name ? 'Edit Student' : 'Add Student'} onClose={onClose}>
      <form onSubmit={(event) => { event.preventDefault(); onSave(form); }} className="grid md:grid-cols-2 gap-4">
        <TextInput label="Student ID" value={form.id} onChange={(value) => setForm({ ...form, id: value })} />
        <TextInput label="Student Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
        <SelectInput label="Class" value={form.className} onChange={(value) => setForm({ ...form, className: value })} options={classOptions.filter((item) => item !== 'All Classes')} />
        <SelectInput label="Section" value={form.section} onChange={(value) => setForm({ ...form, section: value })} options={['A', 'B', 'C', 'D']} />
        <TextInput label="Guardian Name" value={form.guardian} onChange={(value) => setForm({ ...form, guardian: value })} />
        <TextInput label="Phone Number" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
        <SelectInput label="Fee Status" value={form.fee} onChange={(value) => setForm({ ...form, fee: value as Student['fee'] })} options={['Paid', 'Pending', 'Partial']} />
        <TextInput label="Attendance" value={form.attendance} onChange={(value) => setForm({ ...form, attendance: value })} placeholder="95%" />
        <label className="md:col-span-2"><span className="text-sm font-black text-slate-600 dark:text-slate-300">Address</span><textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" rows={3} /></label>
        <div className="md:col-span-2 flex justify-end gap-3"><SoftButton onClick={onClose}>Cancel</SoftButton><PrimaryButton type="submit">Save Student</PrimaryButton></div>
      </form>
    </Modal>
  );
};

const StudentProfile = ({ student, onClose }: { student: Student; onClose: () => void }) => (
  <Modal title="Student Profile" onClose={onClose}>
    <div className="grid lg:grid-cols-[240px_1fr] gap-6">
      <Card className="p-6 text-center"><div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-white mx-auto flex items-center justify-center text-5xl font-black">{student.name.charAt(0)}</div><h3 className="text-2xl font-black mt-4">{student.name}</h3><p className="text-slate-500">{student.id}</p><div className="mt-4"><Status value={student.status} /></div></Card>
      <div className="grid md:grid-cols-2 gap-4">
        {[['Class', `${student.className}-${student.section}`], ['Guardian', student.guardian], ['Phone', student.phone], ['Fee', student.fee], ['Attendance', student.attendance], ['Address', student.address]].map(([label, value]) => <Card key={label} className="p-5"><p className="text-sm text-slate-500 font-bold">{label}</p><h4 className="text-xl font-black mt-1">{value}</h4></Card>)}
      </div>
    </div>
  </Modal>
);

const AdmissionPage = () => {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <PageHeader title="Admission Form" subtitle="Capture new admission inquiry and student details." />
      {saved && <div className="mb-5 rounded-3xl bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 p-4 font-black">✅ Admission inquiry saved successfully.</div>}
      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-6">
          <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="grid md:grid-cols-2 gap-4">
            {['Student Name', 'Parent Name', 'Phone Number', 'Email Address', 'Class Applied For', 'Previous School'].map((label) => <TextInput key={label} label={label} value="" onChange={() => undefined} placeholder={label} />)}
            <label className="md:col-span-2"><span className="text-sm font-black text-slate-600 dark:text-slate-300">Address / Notes</span><textarea className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" rows={4} placeholder="Enter address and notes" /></label>
            <div className="md:col-span-2"><PrimaryButton type="submit">Save Admission Inquiry</PrimaryButton></div>
          </form>
        </Card>
        <Card className="p-6"><h3 className="text-xl font-black mb-4">Admission Checklist</h3>{['Birth Certificate', 'Aadhaar Card', 'Transfer Certificate', 'Passport Photo', 'Previous Marksheet'].map((item) => <p key={item} className="rounded-2xl bg-slate-50 dark:bg-slate-800 px-4 py-3 mb-3 font-bold">✅ {item}</p>)}</Card>
      </div>
    </div>
  );
};

const TeachersPage = () => {
  const [teacherList, setTeacherList] = useState<Teacher[]>(initialTeachers);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Teacher | null>(null);
  const filtered = teacherList.filter((teacher) => `${teacher.name} ${teacher.subject} ${teacher.classes}`.toLowerCase().includes(query.toLowerCase()));
  const saveTeacher = (teacher: Teacher) => { setTeacherList((current) => current.some((item) => item.id === teacher.id) ? current.map((item) => item.id === teacher.id ? teacher : item) : [teacher, ...current]); setEditing(null); };
  return (
    <div>
      <PageHeader title="Teacher Management" subtitle="Manage teacher profiles, subjects and class assignments." action={<PrimaryButton onClick={() => setEditing({ id: `T${String(teacherList.length + 1).padStart(3, '0')}`, name: '', subject: '', classes: '', phone: '', email: '', status: 'Active' })}>＋ Add Teacher</PrimaryButton>} />
      <SummaryCards items={[{ label: 'Total Teachers', value: String(teacherList.length), icon: '👩‍🏫' }, { label: 'Active', value: String(teacherList.filter((t) => t.status === 'Active').length), icon: '✅' }, { label: 'On Leave', value: String(teacherList.filter((t) => t.status === 'On Leave').length), icon: '🏖️' }, { label: 'Departments', value: '8', icon: '🏫' }]} />
      <Card className="p-5 overflow-x-auto"><div className="mb-5"><label className="relative"><span className="absolute left-4 top-3 text-slate-400">🔍</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search teachers, subjects or classes..." className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-red-500" /></label></div><table className="w-full text-left min-w-[820px]"><thead className="text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800"><tr><th className="py-3">Teacher</th><th>ID</th><th>Subject</th><th>Classes</th><th>Phone</th><th>Status</th><th>Action</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{filtered.map((t) => <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60"><td className="py-4 font-black">👩‍🏫 {t.name}<p className="text-xs text-slate-500">{t.email}</p></td><td>{t.id}</td><td>{t.subject}</td><td>{t.classes}</td><td>{t.phone}</td><td><Status value={t.status} /></td><td><div className="flex gap-2"><button onClick={() => setEditing(t)} className="text-red-600 font-black">Edit</button><button onClick={() => setTeacherList((current) => current.filter((item) => item.id !== t.id))} className="text-slate-500 font-black">Delete</button></div></td></tr>)}</tbody></table></Card>
      {editing && <TeacherForm teacher={editing} onClose={() => setEditing(null)} onSave={saveTeacher} />}
    </div>
  );
};

const TeacherForm = ({ teacher, onClose, onSave }: { teacher: Teacher; onClose: () => void; onSave: (teacher: Teacher) => void }) => {
  const [form, setForm] = useState<Teacher>(teacher);
  return <Modal title={teacher.name ? 'Edit Teacher' : 'Add Teacher'} onClose={onClose}><form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="grid md:grid-cols-2 gap-4"><TextInput label="Teacher ID" value={form.id} onChange={(value) => setForm({ ...form, id: value })} /><TextInput label="Teacher Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} /><TextInput label="Subject" value={form.subject} onChange={(value) => setForm({ ...form, subject: value })} /><TextInput label="Assigned Classes" value={form.classes} onChange={(value) => setForm({ ...form, classes: value })} /><TextInput label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} /><TextInput label="Email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} /><SelectInput label="Status" value={form.status} onChange={(value) => setForm({ ...form, status: value as Teacher['status'] })} options={['Active', 'On Leave']} /><div className="md:col-span-2 flex justify-end gap-3"><SoftButton onClick={onClose}>Cancel</SoftButton><PrimaryButton type="submit">Save Teacher</PrimaryButton></div></form></Modal>;
};

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [records, setRecords] = useState<AttendanceRecord[]>(initialStudents.map((s, i) => ({ studentId: s.id, status: i === 1 ? 'Absent' : 'Present' })));
  const visibleStudents = initialStudents.filter((student) => student.className === selectedClass);
  const setStatus = (studentId: string, status: AttendanceRecord['status']) => setRecords((current) => current.map((item) => item.studentId === studentId ? { ...item, status } : item));
  const counts = records.reduce((acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }), {} as Record<string, number>);
  return <div><PageHeader title="Attendance" subtitle="Mark daily attendance class-wise and track attendance percentage." action={<div className="flex gap-2"><select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 font-bold">{classOptions.filter((item) => item !== 'All Classes').map((item) => <option key={item}>{item}</option>)}</select><PrimaryButton>Save Attendance</PrimaryButton></div>} /><SummaryCards items={[{ label: 'Selected Class', value: selectedClass.replace('Class ', ''), icon: '🏫' }, { label: 'Present', value: String(counts.Present || 0), icon: '✅' }, { label: 'Absent', value: String(counts.Absent || 0), icon: '❌' }, { label: 'Leave', value: String(counts.Leave || 0), icon: '📝' }]} /><Card className="p-5"><div className="space-y-3">{visibleStudents.map((s) => { const record = records.find((item) => item.studentId === s.id)!; return <div key={s.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 rounded-2xl bg-slate-50 dark:bg-slate-800 p-4"><div><h4 className="font-black">{s.name}</h4><p className="text-sm text-slate-500">{s.className}-{s.section} • {s.id}</p></div><div className="flex flex-wrap gap-2">{(['Present', 'Absent', 'Leave'] as AttendanceRecord['status'][]).map((status) => <button key={status} onClick={() => setStatus(s.id, status)} className={`rounded-xl px-4 py-2 font-black ${record.status === status ? status === 'Present' ? 'bg-green-100 text-green-700' : status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700' : 'bg-white dark:bg-slate-900'}`}>{status}</button>)}</div></div>; })}</div></Card></div>;
};

const FeesPage = () => {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>(initialFees);
  const [query, setQuery] = useState('');
  const [receipt, setReceipt] = useState<FeeRecord | null>(null);
  const filtered = feeRecords.filter((f) => `${f.student} ${f.receipt} ${f.className} ${f.month}`.toLowerCase().includes(query.toLowerCase()));
  const collected = feeRecords.filter((f) => f.status === 'Paid').reduce((sum, item) => sum + item.amount, 0);
  const pending = feeRecords.filter((f) => f.status !== 'Paid').reduce((sum, item) => sum + item.amount, 0);
  return <div><PageHeader title="Fee Management" subtitle="Track paid, pending and partial fee records with receipt preview." action={<PrimaryButton onClick={() => setFeeRecords((current) => [{ receipt: `FEE-${1021 + current.length}`, student: 'New Student', className: '8-A', amount: 4500, month: 'July', status: 'Paid', date: 'Today' }, ...current])}>＋ Quick Collect</PrimaryButton>} /><SummaryCards items={[{ label: 'Collected', value: money(collected), icon: '💰' }, { label: 'Pending', value: money(pending), icon: '⏳' }, { label: 'Receipts', value: String(feeRecords.length), icon: '🧾' }, { label: 'Collection Rate', value: '82%', icon: '📈' }]} /><Card className="p-5 overflow-x-auto"><div className="mb-5"><label className="relative"><span className="absolute left-4 top-3 text-slate-400">🔍</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search fee receipt, student or month..." className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-red-500" /></label></div><table className="w-full text-left min-w-[800px]"><thead className="text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800"><tr><th className="py-3">Receipt</th><th>Student</th><th>Class</th><th>Month</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{filtered.map((f) => <tr key={f.receipt} className="hover:bg-slate-50 dark:hover:bg-slate-800/60"><td className="py-4 font-black">{f.receipt}</td><td>{f.student}</td><td>{f.className}</td><td>{f.month}</td><td className="font-black">{money(f.amount)}</td><td><Status value={f.status} /></td><td>{f.date}</td><td><button onClick={() => setReceipt(f)} className="text-red-600 font-black">Receipt</button></td></tr>)}</tbody></table></Card>{receipt && <Modal title="Fee Receipt Preview" onClose={() => setReceipt(null)}><div className="rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6"><div className="text-center mb-6"><h3 className="text-3xl font-black">Gurukul Pathshala</h3><p className="text-slate-500">Official Fee Receipt</p></div><div className="grid md:grid-cols-2 gap-4">{[['Receipt No', receipt.receipt], ['Student', receipt.student], ['Class', receipt.className], ['Month', receipt.month], ['Amount', money(receipt.amount)], ['Status', receipt.status], ['Date', receipt.date]].map(([a,b]) => <div key={a} className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4"><p className="text-sm text-slate-500 font-bold">{a}</p><h4 className="font-black text-xl">{b}</h4></div>)}</div><div className="mt-6 flex justify-end"><PrimaryButton>Print Receipt</PrimaryButton></div></div></Modal>}</div>;
};

const NoticesPage = () => {
  const [noticeList, setNoticeList] = useState<Notice[]>(initialNotices);
  const [editing, setEditing] = useState<Notice | null>(null);
  const saveNotice = (notice: Notice) => { setNoticeList((current) => current.some((item) => item.id === notice.id) ? current.map((item) => item.id === notice.id ? notice : item) : [notice, ...current]); setEditing(null); };
  return <div><PageHeader title="Notice Board" subtitle="Create and manage notices for students, teachers and parents." action={<PrimaryButton onClick={() => setEditing({ id: `N${String(noticeList.length + 1).padStart(3, '0')}`, title: '', audience: 'All Students', date: 'Today', priority: 'Normal', message: '' })}>＋ Create Notice</PrimaryButton>} /><div className="grid lg:grid-cols-3 gap-5">{noticeList.map((n) => <Card key={n.id} className="p-6 hover:-translate-y-1 transition-transform"><div className="flex items-start justify-between gap-4"><span className="text-4xl">📢</span><Status value={n.priority} /></div><h3 className="text-xl font-black mt-5">{n.title}</h3><p className="text-slate-500 mt-2">Audience: {n.audience}</p><p className="text-slate-600 dark:text-slate-300 mt-3">{n.message}</p><p className="font-bold mt-4">📅 {n.date}</p><div className="mt-5 flex gap-2"><SoftButton onClick={() => setEditing(n)}>Edit</SoftButton><DangerButton onClick={() => setNoticeList((current) => current.filter((item) => item.id !== n.id))}>Delete</DangerButton></div></Card>)}</div>{editing && <NoticeForm notice={editing} onClose={() => setEditing(null)} onSave={saveNotice} />}</div>;
};

const NoticeForm = ({ notice, onClose, onSave }: { notice: Notice; onClose: () => void; onSave: (notice: Notice) => void }) => {
  const [form, setForm] = useState<Notice>(notice);
  return <Modal title={notice.title ? 'Edit Notice' : 'Create Notice'} onClose={onClose}><form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="grid md:grid-cols-2 gap-4"><TextInput label="Notice ID" value={form.id} onChange={(value) => setForm({ ...form, id: value })} /><TextInput label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} /><TextInput label="Audience" value={form.audience} onChange={(value) => setForm({ ...form, audience: value })} /><SelectInput label="Priority" value={form.priority} onChange={(value) => setForm({ ...form, priority: value as Notice['priority'] })} options={['High', 'Medium', 'Normal']} /><TextInput label="Date" value={form.date} onChange={(value) => setForm({ ...form, date: value })} /><label className="md:col-span-2"><span className="text-sm font-black text-slate-600 dark:text-slate-300">Message</span><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" rows={4} /></label><div className="md:col-span-2 flex justify-end gap-3"><SoftButton onClick={onClose}>Cancel</SoftButton><PrimaryButton type="submit">Save Notice</PrimaryButton></div></form></Modal>;
};

const ExaminationPage = () => <ModuleWithTable title="Examination" subtitle="Exam schedule, marks entry and result preparation." icon="📊" rows={['Unit Test - Class 8', 'Half Yearly Exam', 'Result Approval', 'Report Card Print']} />;
const LibraryPage = () => <ModuleWithTable title="Library" subtitle="Book issue, return and library inventory." icon="📚" rows={['Issue Book', 'Return Book', 'Overdue List', 'Book Inventory']} />;
const TransportPage = () => <ModuleWithTable title="Transport" subtitle="Route, bus, driver and student transport management." icon="🚌" rows={['Route A - BLW', 'Route B - Lanka', 'Driver List', 'Bus Attendance']} />;
const HomeworkPage = () => <ModuleWithTable title="Homework" subtitle="Create homework, track submissions and teacher remarks." icon="📝" rows={['Math Worksheet', 'Science Project', 'English Essay', 'Computer Practical']} />;
const ResultPage = () => <ModuleWithTable title="Result" subtitle="Student marks, grade and report card area." icon="🏆" rows={['Math 88%', 'Science 91%', 'English 84%', 'Computer 96%']} />;

const ModuleWithTable = ({ title, subtitle, icon, rows }: { title: string; subtitle: string; icon: string; rows: string[] }) => (
  <div><PageHeader title={title} subtitle={subtitle} action={<PrimaryButton>＋ Add New</PrimaryButton>} /><SummaryCards items={[{ label: 'Total Records', value: String(rows.length), icon }, { label: 'Pending', value: '2', icon: '⏳' }, { label: 'Completed', value: '8', icon: '✅' }, { label: 'Reports', value: '4', icon: '📄' }]} /><Card className="p-5"><div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">{rows.map((row, index) => <div key={row} className="rounded-3xl bg-slate-50 dark:bg-slate-800 p-5"><span className="text-4xl">{icon}</span><h3 className="font-black text-lg mt-4">{row}</h3><p className="text-slate-500 text-sm mt-2">Record #{index + 1}</p><button className="mt-4 text-red-600 font-black">Open →</button></div>)}</div></Card></div>
);

const SimpleModule = ({ page, role }: { page: ErpPage; role: UserRole }) => {
  const title = pageTitles[page] || 'Module';
  const cards = [
    ['Overview', 'Live summary and important KPIs', '📊'],
    ['Records', 'Search and manage module records', '📁'],
    ['Reports', 'PDF/Excel export ready area', '📄'],
    ['Settings', 'Module configuration panel', '⚙️'],
  ];
  return <div><PageHeader title={title} subtitle={`${title} module is connected for ${role} portal. Detailed database integration can be added in the next backend version.`} /><div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">{cards.map(([a,b,c]) => <Card key={a} className="p-6"><span className="text-4xl">{c}</span><h3 className="text-xl font-black mt-4">{a}</h3><p className="text-slate-500 dark:text-slate-400 mt-2">{b}</p><button className="mt-5 rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-black hover:bg-red-600 hover:text-white transition-colors">Open</button></Card>)}</div></div>;
};

const ErpPages = ({ role, page, onNavigate }: ErpPagesProps) => {
  if (page === 'students') return <StudentsPage onNavigate={onNavigate} />;
  if (page === 'admission') return <AdmissionPage />;
  if (page === 'teachers') return <TeachersPage />;
  if (page === 'attendance') return <AttendancePage />;
  if (page === 'fees') return <FeesPage />;
  if (page === 'notices') return <NoticesPage />;
  if (page === 'examination' || page === 'marks') return <ExaminationPage />;
  if (page === 'library') return <LibraryPage />;
  if (page === 'transport') return <TransportPage />;
  if (page === 'homework') return <HomeworkPage />;
  if (page === 'result') return <ResultPage />;
  return <SimpleModule page={page} role={role} />;
};

export default ErpPages;
