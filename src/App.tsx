import { useEffect, useState } from 'react';
import { schoolConfig } from './config/schoolData';
import ErpApp from './erp/ErpApp';

type ButtonVariant = 'primary' | 'dark' | 'light' | 'outline';

const Button = ({ children, href, onClick, variant = 'primary', className = '' }: { children: React.ReactNode; href?: string; onClick?: () => void; variant?: ButtonVariant; className?: string }) => {
  const styles: Record<ButtonVariant, string> = {
    primary: 'bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-600/20',
    dark: 'bg-gray-950 text-white hover:bg-gray-800 shadow-xl shadow-gray-950/20',
    light: 'bg-white text-red-700 hover:bg-red-50 shadow-xl shadow-white/20',
    outline: 'border border-white/40 text-white hover:bg-white hover:text-red-700',
  };
  const cls = `inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${styles[variant]} ${className}`;
  if (href) return <a href={href} onClick={onClick} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
};

const SectionTitle = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-red-600">{eyebrow}</p>}
    <h2 className="text-3xl font-black tracking-tight text-gray-950 md:text-5xl">{title}</h2>
    {subtitle && <p className="mt-5 text-lg leading-8 text-gray-600">{subtitle}</p>}
  </div>
);

const Header = ({ onOpenLogin }: { onOpenLogin: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    ['Home', '#home'], ['ERP Modules', '#erp-modules'], ['Admission', '#admission'], ['Pricing', '#pricing'], ['Facilities', '#facilities'], ['Contact', '#contact']
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-white/95 shadow-lg backdrop-blur' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1 shadow-lg ring-1 ring-red-100">
              <img src="/logo.svg.png" alt={schoolConfig.logo.alt} className="h-full w-full object-contain" onError={(e) => ((e.currentTarget.src = '/logo.svg'))} />
            </span>
            <span>
              <span className={`block text-xl font-black ${scrolled ? 'text-gray-950' : 'text-white'}`}>{schoolConfig.schoolName}</span>
              <span className={`block text-xs font-semibold ${scrolled ? 'text-gray-500' : 'text-red-100'}`}>Premium School Website + ERP</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map(([name, href]) => <a key={name} href={href} className={`text-sm font-bold transition-colors ${scrolled ? 'text-gray-700 hover:text-red-600' : 'text-white/90 hover:text-white'}`}>{name}</a>)}
            <button onClick={onOpenLogin} className={`rounded-2xl px-5 py-3 text-sm font-black transition-all ${scrolled ? 'bg-gray-950 text-white hover:bg-gray-800' : 'bg-white text-red-700 hover:bg-red-50'}`}>ERP Login</button>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden rounded-xl p-3 ${scrolled ? 'text-gray-950' : 'text-white'}`} aria-label="Toggle menu">
            <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="mb-4 rounded-3xl border bg-white p-4 shadow-2xl lg:hidden">
            {nav.map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-3 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600">{name}</a>)}
            <button onClick={() => { setMenuOpen(false); onOpenLogin(); }} className="mt-3 w-full rounded-2xl bg-gray-950 px-4 py-3 font-black text-white">ERP Login</button>
          </div>
        )}
      </div>
    </header>
  );
};

const HeroSection = ({ onOpenLogin }: { onOpenLogin: () => void }) => {
  const stats = [
    ['500+', 'Students'], ['30+', 'Staff'], ['12+', 'ERP Modules'], ['100%', 'Demo Ready']
  ];
  return (
    <section id="home" className="relative overflow-hidden bg-gray-950 pt-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.55),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.35),transparent_30%)]" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">🚀 Client Demo Ready • Admission Open 2026-27</div>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl">
              School Website + <span className="text-yellow-300">Smart ERP</span> Demo
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-red-50 md:text-xl">
              Gurukul Pathshala ke liye premium school website, admission inquiry, WhatsApp lead, notice board, gallery aur Admin/Teacher/Student ERP demo — sab ek hi professional platform par.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="#admission" variant="light">Admission Inquiry</Button>
              <Button onClick={onOpenLogin} variant="outline">View ERP Demo →</Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map(([value, label]) => <div key={label} className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur"><div className="text-3xl font-black text-yellow-300">{value}</div><div className="mt-1 text-xs font-semibold text-red-100">{label}</div></div>)}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-red-500/30 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-4 text-gray-950">
                <div className="flex items-center justify-between border-b pb-4">
                  <div><p className="text-sm font-bold text-red-600">Live Dashboard Preview</p><h3 className="text-2xl font-black">School Control Panel</h3></div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">Online</span>
                </div>
                <div className="grid gap-3 py-4 sm:grid-cols-2">
                  {['Admissions', 'Attendance', 'Fees', 'Report Cards'].map((item, i) => <div key={item} className="rounded-2xl bg-gray-50 p-4"><div className="text-2xl">{['📝','✅','💳','📊'][i]}</div><p className="mt-2 font-black">{item}</p><p className="text-sm text-gray-500">Ready module</p></div>)}
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-5 text-white">
                  <p className="text-sm font-bold text-red-100">Demo Login</p>
                  <p className="mt-1 text-xl font-black">Admin • Teacher • Student</p>
                  <p className="mt-2 text-sm text-red-100">Client ko demo dikhane ke liye ready.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => (
  <section className="border-b border-gray-100 bg-white py-6">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 text-center md:grid-cols-4">
      {['Smart Classes', 'Digital Attendance', 'Online Fees', 'Parent Communication'].map((item) => <div key={item} className="rounded-2xl bg-gray-50 px-4 py-3 text-sm font-black text-gray-700">✓ {item}</div>)}
    </div>
  </section>
);

const ErpModulesSection = () => {
  const modules = [
    ['👨‍💼', 'Admin Dashboard', 'Admissions, fees, attendance, notices, analytics and school settings.'],
    ['👨‍🏫', 'Teacher Portal', 'Homework, attendance, marks, timetable and class communication.'],
    ['🎒', 'Student Portal', 'Profile, attendance, homework, marks, fee status and calendar.'],
    ['🧾', 'Fees Management', 'Pending fees, receipts, payment history and export-ready records.'],
    ['📊', 'Reports & Analytics', 'Student strength, attendance trend, revenue cards and quick actions.'],
    ['📢', 'Notice Board', 'School announcements, events, holidays and parent updates.'],
  ];
  return (
    <section id="erp-modules" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="ERP Modules" title="School management ko simple aur professional banaye" subtitle="Client ko demo dene ke liye website ke saath ERP preview ready hai." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(([icon, title, desc]) => <div key={title} className="rounded-[1.5rem] border border-gray-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-3xl">{icon}</div><h3 className="text-xl font-black text-gray-950">{title}</h3><p className="mt-3 leading-7 text-gray-600">{desc}</p></div>)}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="bg-white py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
      <div>
        <SectionTitle eyebrow="About" title="Education + Technology ka perfect combination" subtitle={schoolConfig.shortDescription} />
        <div className="grid gap-4 sm:grid-cols-2">
          {schoolConfig.whyChooseUs.map((item) => <div key={item.title} className="rounded-3xl bg-gray-50 p-5"><div className="text-3xl">{item.icon}</div><h3 className="mt-3 font-black text-gray-950">{item.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p></div>)}
        </div>
      </div>
      <div className="rounded-[2rem] bg-gradient-to-br from-red-600 to-red-800 p-8 text-white shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-100">Principal Message</p>
        <h3 className="mt-3 text-3xl font-black">{schoolConfig.principal.name}</h3>
        <p className="mt-5 leading-8 text-red-50">Hamari priority hai ki har student ko safe campus, quality teaching aur digital learning experience mile. Gurukul Pathshala traditional values aur modern education dono ko saath lekar chalti hai.</p>
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          {['Safe Campus', 'Smart ERP', 'Modern Learning'].map((x) => <div key={x} className="rounded-2xl bg-white/10 p-4 text-sm font-bold">{x}</div>)}
        </div>
      </div>
    </div>
  </section>
);

const AdmissionSection = () => {
  const [formData, setFormData] = useState({ parentName: '', studentName: '', classApplied: '', phone: '', message: '' });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Admission Inquiry%0AParent: ${formData.parentName}%0AStudent: ${formData.studentName}%0AClass: ${formData.classApplied}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${schoolConfig.contact.whatsapp.replace('+', '').replace(/\s/g, '')}?text=${text}`, '_blank');
  };
  return (
    <section id="admission" className="bg-gradient-to-br from-red-50 to-amber-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Admission" title={schoolConfig.admission.heading} subtitle={schoolConfig.admission.description} />
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="rounded-[2rem] bg-white p-7 shadow-sm"><h3 className="text-2xl font-black">Admission Process</h3><ol className="mt-5 space-y-4">{schoolConfig.admission.process.map((step, i) => <li key={step} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">{i + 1}</span><span className="pt-1 font-semibold text-gray-700">{step}</span></li>)}</ol></div>
            <div className="rounded-[2rem] bg-gray-950 p-7 text-white"><h3 className="text-2xl font-black">Fee Snapshot</h3><div className="mt-5 space-y-3 text-sm">{Object.entries(schoolConfig.admission.fees).map(([k, v]) => <div key={k} className="flex justify-between border-b border-white/10 pb-3"><span className="capitalize text-gray-300">{k.replace(/([A-Z])/g, ' $1')}</span><b>{v}</b></div>)}</div></div>
          </div>
          <form onSubmit={submit} className="rounded-[2rem] bg-white p-7 shadow-xl">
            <h3 className="text-2xl font-black text-gray-950">Quick Admission Inquiry</h3><p className="mt-2 text-gray-600">Form submit karte hi WhatsApp inquiry ready ho jayegi.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Parent/Guardian Name" value={formData.parentName} onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} className="rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
              <input required placeholder="Student Name" value={formData.studentName} onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} className="rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
              <select required value={formData.classApplied} onChange={(e) => setFormData({ ...formData, classApplied: e.target.value })} className="rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"><option value="">Select Class</option>{schoolConfig.classes.map((cls) => <option key={cls.name}>{cls.name}</option>)}</select>
              <input required placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <textarea placeholder="Message / Address" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="mt-4 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
            <button className="mt-4 w-full rounded-2xl bg-red-600 px-6 py-4 font-black text-white hover:bg-red-700">Send Inquiry on WhatsApp</button>
          </form>
        </div>
      </div>
    </section>
  );
};

const FacilitiesSection = () => (
  <section id="facilities" className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-4">
      <SectionTitle eyebrow="Facilities" title="Parent trust badhane wale school features" subtitle="Website par clear facilities dikhne se school ka professional impression strong hota hai." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {schoolConfig.facilities.slice(0, 9).map((f) => <div key={f.title} className="group rounded-[1.5rem] bg-gray-50 p-6 transition-all hover:bg-red-600 hover:text-white"><div className="text-4xl">{f.icon}</div><h3 className="mt-4 text-xl font-black">{f.title}</h3><p className="mt-3 leading-7 text-gray-600 group-hover:text-red-50">{f.description}</p></div>)}
      </div>
    </div>
  </section>
);

const GallerySection = () => (
  <section id="gallery" className="bg-gray-50 py-20">
    <div className="mx-auto max-w-7xl px-4">
      <SectionTitle eyebrow="Gallery" title="School life ka professional preview" subtitle="Infrastructure, events, sports aur classroom activities ek modern gallery me." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {schoolConfig.gallery.slice(0, 8).map((img) => <div key={img.src} className="group relative aspect-square overflow-hidden rounded-[1.5rem] bg-red-100 shadow-sm"><img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform group-hover:scale-110" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-bold text-white">{img.alt}</div></div>)}
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const testimonials = [
    ['Parent', 'School ka digital system aur communication bahut helpful hai. Attendance aur notices easily mil jate hain.'],
    ['Teacher', 'ERP dashboard se attendance, homework aur marks manage karna simple ho gaya hai.'],
    ['Admin', 'Admissions, fees aur reports ko ek jagah manage karne ka clean solution hai.'],
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Testimonials" title="Parents aur school team ke liye built" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map(([role, text]) => <div key={role} className="rounded-[1.5rem] border bg-white p-7 shadow-sm"><div className="text-3xl text-yellow-400">★★★★★</div><p className="mt-4 leading-8 text-gray-700">“{text}”</p><p className="mt-5 font-black text-red-600">{role}</p></div>)}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle eyebrow="FAQ" title="Common questions" />
        <div className="space-y-4">
          {schoolConfig.faq.slice(0, 6).map((f, i) => <div key={f.question} className="overflow-hidden rounded-3xl bg-white shadow-sm"><button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between px-6 py-5 text-left font-black text-gray-950"><span>{f.question}</span><span>{open === i ? '−' : '+'}</span></button>{open === i && <p className="px-6 pb-6 leading-7 text-gray-600">{f.answer}</p>}</div>)}
        </div>
      </div>
    </section>
  );
};


const NoticeEventsSection = () => (
  <section className="bg-white py-20">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2">
      <div className="rounded-[2rem] border border-gray-100 bg-gray-50 p-7">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600">Notice Board</p>
        <h2 className="mt-3 text-3xl font-black text-gray-950">Latest school updates</h2>
        <div className="mt-6 space-y-4">
          {schoolConfig.notices.slice(0, 4).map((notice) => (
            <div key={notice.id} className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-black text-gray-950">{notice.title}</h3>
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">{notice.category}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">{notice.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[2rem] border border-gray-100 bg-gray-950 p-7 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-300">Events</p>
        <h2 className="mt-3 text-3xl font-black">Upcoming activities</h2>
        <div className="mt-6 space-y-4">
          {schoolConfig.upcomingEvents.slice(0, 4).map((event) => (
            <div key={event.name} className="flex gap-4 rounded-3xl bg-white/10 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-2xl">📅</div>
              <div>
                <h3 className="font-black">{event.name}</h3>
                <p className="mt-1 text-sm text-gray-300">{event.date} • {event.time} • {event.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PricingSection = ({ onOpenLogin }: { onOpenLogin: () => void }) => {
  const plans = [
    ['Website Demo', 'For school presentation', ['Premium landing page', 'Admission inquiry', 'Gallery + FAQ', 'WhatsApp CTA']],
    ['ERP Demo', 'For management preview', ['Admin dashboard', 'Teacher portal', 'Student portal', 'Fees + reports']],
    ['Full Setup', 'For real school launch', ['Backend connection', 'Database setup', 'Online payments', 'Training + support']],
  ];
  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Plans" title="Demo aur full setup ke liye clear packages" subtitle="Client ko price final karne se pehle website/ERP ka professional demo dikhaya ja sakta hai." />
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map(([name, desc, features], index) => (
            <div key={name as string} className={`rounded-[2rem] border p-7 shadow-sm ${index === 1 ? 'border-red-200 bg-white shadow-xl ring-4 ring-red-50' : 'border-gray-100 bg-white'}`}>
              {index === 1 && <span className="mb-4 inline-flex rounded-full bg-red-600 px-4 py-2 text-xs font-black text-white">Most Useful Demo</span>}
              <h3 className="text-2xl font-black text-gray-950">{name}</h3>
              <p className="mt-2 text-gray-600">{desc}</p>
              <ul className="mt-6 space-y-3">
                {(features as string[]).map((f) => <li key={f} className="flex gap-3 font-semibold text-gray-700"><span className="text-green-600">✓</span>{f}</li>)}
              </ul>
              <button onClick={index === 1 ? onOpenLogin : undefined} className="mt-7 w-full rounded-2xl bg-gray-950 px-5 py-4 font-black text-white hover:bg-red-600">
                {index === 1 ? 'View ERP Demo' : 'Request Callback'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onOpenLogin }: { onOpenLogin: () => void }) => (
  <section className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-4">
      <div className="rounded-[2rem] bg-gradient-to-r from-red-600 via-red-700 to-gray-950 p-8 text-white shadow-2xl md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-100">Ready for demo</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">School owner ko dikhane ke liye premium first impression ready</h2>
            <p className="mt-5 max-w-2xl leading-8 text-red-50">Landing page se admission inquiry milegi aur ERP demo se school management ko real software feel aayega.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Button onClick={onOpenLogin} variant="light">Open ERP Demo</Button>
            <Button href="#contact" variant="outline">Contact Now</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = ({ onOpenLogin }: { onOpenLogin: () => void }) => (
  <section id="contact" className="bg-gray-950 py-20 text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
      <div><p className="text-sm font-bold uppercase tracking-[0.25em] text-red-300">Contact</p><h2 className="mt-3 text-4xl font-black md:text-5xl">Demo, admission ya school visit ke liye contact karein</h2><p className="mt-5 leading-8 text-gray-300">{schoolConfig.contact.address}</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><a href={`tel:${schoolConfig.contact.phone}`} className="rounded-3xl bg-white/10 p-5 font-black hover:bg-white/15">📞 {schoolConfig.contact.phone}</a><a href={`https://wa.me/${schoolConfig.contact.whatsapp.replace('+', '').replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="rounded-3xl bg-green-600 p-5 font-black hover:bg-green-700">💬 WhatsApp Now</a><a href={`mailto:${schoolConfig.contact.email}`} className="rounded-3xl bg-white/10 p-5 font-black hover:bg-white/15">📧 Email</a><button onClick={onOpenLogin} className="rounded-3xl bg-red-600 p-5 text-left font-black hover:bg-red-700">🔐 ERP Demo Login</button></div></div>
      <div className="rounded-[2rem] bg-white p-8 text-gray-950"><h3 className="text-2xl font-black">Client Demo Checklist</h3><ul className="mt-6 space-y-4 text-gray-700">{['Landing page premium look ready', 'Admission inquiry WhatsApp connected', 'ERP demo login button visible', 'Mobile responsive design improved', 'SEO/PWA files already included'].map((x) => <li key={x} className="flex gap-3"><span className="text-green-600">✓</span><span className="font-semibold">{x}</span></li>)}</ul></div>
    </div>
  </section>
);

const Footer = ({ onOpenLogin }: { onOpenLogin: () => void }) => (
  <footer className="bg-black py-10 text-gray-400">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
      <div><p className="text-xl font-black text-white">{schoolConfig.schoolName}</p><p className="mt-1 text-sm">{schoolConfig.footer.copyright}</p></div>
      <div className="flex flex-wrap gap-4 text-sm font-bold"><a href="#home">Home</a><a href="#admission">Admission</a><a href="#contact">Contact</a><button onClick={onOpenLogin}>ERP Login</button></div>
    </div>
  </footer>
);

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <><a href={`https://wa.me/${schoolConfig.contact.whatsapp.replace('+', '').replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl shadow-xl">💬</a>{showTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gray-950 text-xl text-white shadow-xl">↑</button>}</>;
};

function App() {
  const [activeView, setActiveView] = useState<'website' | 'erp'>('website');
  useEffect(() => {
    if (window.location.hash === '#login' || window.location.hash.startsWith('#erp')) setActiveView('erp');
  }, []);
  const openLogin = () => { window.location.hash = 'login'; setActiveView('erp'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const openWebsite = () => { window.location.hash = 'home'; setActiveView('website'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  if (activeView === 'erp') return <ErpApp onBackHome={openWebsite} />;
  return <div className="min-h-screen bg-white"><Header onOpenLogin={openLogin} /><main><HeroSection onOpenLogin={openLogin} /><TrustBar /><ErpModulesSection /><AboutSection /><AdmissionSection /><NoticeEventsSection /><FacilitiesSection /><GallerySection /><TestimonialsSection /><PricingSection onOpenLogin={openLogin} /><FAQSection /><FinalCTA onOpenLogin={openLogin} /><ContactSection onOpenLogin={openLogin} /></main><Footer onOpenLogin={openLogin} /><FloatingButtons /></div>;
}

export default App;
