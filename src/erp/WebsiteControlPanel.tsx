import { useRef, useState } from 'react';
import {
  defaultWebsiteSettings,
  getWebsiteSettings,
  readFileAsDataUrl,
  resetWebsiteSettings,
  saveWebsiteSettings,
  type GalleryImage,
  type WebsiteSettings,
} from '../services/websiteSettingsService';

type TabKey = 'branding' | 'homepage' | 'gallery' | 'contact' | 'seo';

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'branding', label: 'Branding', icon: '🎨' },
  { key: 'homepage', label: 'Homepage Content', icon: '📝' },
  { key: 'gallery', label: 'Gallery / Images', icon: '🖼️' },
  { key: 'contact', label: 'Contact Information', icon: '📞' },
  { key: 'seo', label: 'SEO Settings', icon: '🔍' },
];

// ---------- Shared local UI atoms (kept local so this module has no risk of touching other files) ----------
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}>{children}</div>
);
const PrimaryButton = ({ children, onClick, type = 'button', disabled }: { children: React.ReactNode; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }) => (
  <button type={type} onClick={onClick} disabled={disabled} className="rounded-2xl bg-red-600 text-white px-5 py-3 font-black shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors disabled:opacity-60">
    {children}
  </button>
);
const SoftButton = ({ children, onClick, type = 'button' }: { children: React.ReactNode; onClick?: () => void; type?: 'button' | 'submit' }) => (
  <button type={type} onClick={onClick} className="rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
    {children}
  </button>
);
const DangerButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button onClick={onClick} className="rounded-2xl bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 px-4 py-3 font-black hover:bg-red-100 dark:hover:bg-red-900 transition-colors">
    {children}
  </button>
);
const TextInput = ({ label, value, onChange, placeholder, type = 'text', hint }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; hint?: string }) => (
  <label className="block">
    <span className="text-sm font-black text-slate-600 dark:text-slate-300">{label}</span>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || label} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
    {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
  </label>
);
const TextArea = ({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) => (
  <label className="block">
    <span className="text-sm font-black text-slate-600 dark:text-slate-300">{label}</span>
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
  </label>
);
const ColorInput = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <label className="block">
    <span className="text-sm font-black text-slate-600 dark:text-slate-300">{label}</span>
    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent" />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent outline-none font-bold" />
    </div>
  </label>
);
const ImageUploadField = ({ label, value, onChange, aspect = 'aspect-video' }: { label: string; value: string; onChange: (dataUrl: string) => void; aspect?: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    onChange(dataUrl);
  };
  return (
    <div>
      <span className="text-sm font-black text-slate-600 dark:text-slate-300">{label}</span>
      <div className="mt-2 flex flex-col sm:flex-row gap-4 items-start">
        <div className={`w-full sm:w-48 ${aspect} rounded-2xl bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden`}>
          {value ? <img src={value} alt={label} className="w-full h-full object-contain" /> : <span className="text-slate-400 text-sm font-bold p-3 text-center">No image set</span>}
        </div>
        <div className="flex flex-col gap-2">
          <SoftButton onClick={() => inputRef.current?.click()}>Upload Image</SoftButton>
          {value && <button onClick={() => onChange('')} className="text-xs font-black text-red-600 hover:text-red-700 text-left">Remove Image</button>}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { handleFile(e.target.files?.[0]); e.currentTarget.value = ''; }} />
        </div>
      </div>
    </div>
  );
};
const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-6">
    <h3 className="text-2xl font-black">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
  </div>
);

// ---------- Gallery repeater (shared by "images" and "banners") ----------
const ImageRepeater = ({ title, items, onChange }: { title: string; items: GalleryImage[]; onChange: (items: GalleryImage[]) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addImage = async (file: File | undefined) => {
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    onChange([...items, { id: `img-${Date.now()}`, src: dataUrl, alt: file.name.replace(/\.[^.]+$/, '') }]);
  };
  const removeImage = (id: string) => onChange(items.filter((img) => img.id !== id));
  const updateAlt = (id: string, alt: string) => onChange(items.map((img) => (img.id === id ? { ...img, alt } : img)));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-black text-lg">{title} <span className="text-slate-400 font-bold text-sm">({items.length})</span></h4>
        <SoftButton onClick={() => inputRef.current?.click()}>＋ Add Image</SoftButton>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { addImage(e.target.files?.[0]); e.currentTarget.value = ''; }} />
      </div>
      {items.length === 0 && <p className="text-slate-400 text-sm font-semibold py-6 text-center">No images added yet.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((img) => (
          <div key={img.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="aspect-video bg-slate-50 dark:bg-slate-800">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 space-y-2">
              <input value={img.alt} onChange={(e) => updateAlt(img.id, e.target.value)} placeholder="Image caption / alt text" className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500" />
              <button onClick={() => removeImage(img.id)} className="text-xs font-black text-red-600 hover:text-red-700">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- Main panel ----------
const WebsiteControlPanel = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('branding');
  const [form, setForm] = useState<WebsiteSettings>(() => getWebsiteSettings());
  const [saved, setSaved] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const update = <K extends keyof WebsiteSettings>(key: K, value: WebsiteSettings[K]) => setForm((current) => ({ ...current, [key]: value }));

  const handleSave = () => {
    saveWebsiteSettings(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    const restored = resetWebsiteSettings();
    setForm(restored);
    setConfirmingReset(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm font-black text-red-600 uppercase tracking-wide">Admin Only</p>
          <h2 className="text-3xl sm:text-4xl font-black mt-1">Website Control Panel</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Website ka logo, content, images, colors aur contact info bina coding ke edit karein.</p>
        </div>
        <div className="flex gap-3">
          <DangerButton onClick={() => setConfirmingReset(true)}>Reset to Default Website Content</DangerButton>
          <PrimaryButton onClick={handleSave}>💾 Save Changes</PrimaryButton>
        </div>
      </div>

      {saved && (
        <div className="mb-6 rounded-2xl bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-5 py-4 font-black">
          ✅ Website settings saved. Landing page will show these changes immediately (and after refresh too).
        </div>
      )}

      <div className="mb-6 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-5 py-3 text-sm font-bold">
        ℹ️ Images abhi demo storage (browser) me save hote hain. Production me image Cloudinary/S3/server storage par upload hogi.
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 flex items-center gap-2 rounded-2xl px-5 py-3 font-black transition-colors ${activeTab === tab.key ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* A. Branding */}
      {activeTab === 'branding' && (
        <Card className="p-6">
          <SectionHeading title="Branding" subtitle="School name, logo, favicon, brand colors and hero background." />
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <TextInput label="School / Website Name" value={form.branding.schoolName} onChange={(v) => update('branding', { ...form.branding, schoolName: v })} />
              <ColorInput label="Primary Color" value={form.branding.primaryColor} onChange={(v) => update('branding', { ...form.branding, primaryColor: v })} />
              <ColorInput label="Secondary Color" value={form.branding.secondaryColor} onChange={(v) => update('branding', { ...form.branding, secondaryColor: v })} />
            </div>
            <div className="space-y-6">
              <ImageUploadField label="Logo" value={form.branding.logoUrl} onChange={(v) => update('branding', { ...form.branding, logoUrl: v })} aspect="aspect-square" />
              <ImageUploadField label="Favicon" value={form.branding.faviconUrl} onChange={(v) => update('branding', { ...form.branding, faviconUrl: v })} aspect="aspect-square" />
            </div>
          </div>
          <div className="mt-6">
            <ImageUploadField label="Hero Background Image" value={form.branding.heroBackgroundImage} onChange={(v) => update('branding', { ...form.branding, heroBackgroundImage: v })} />
          </div>
        </Card>
      )}

      {/* B. Homepage Content */}
      {activeTab === 'homepage' && (
        <Card className="p-6">
          <SectionHeading title="Homepage Content" subtitle="Hero section, CTA button, About text and Features text." />
          <div className="grid gap-5">
            <TextInput label="Hero Title" value={form.homepage.heroTitle} onChange={(v) => update('homepage', { ...form.homepage, heroTitle: v })} />
            <TextArea label="Hero Subtitle" value={form.homepage.heroSubtitle} onChange={(v) => update('homepage', { ...form.homepage, heroSubtitle: v })} rows={3} />
            <div className="grid sm:grid-cols-2 gap-5">
              <TextInput label="CTA Button Text" value={form.homepage.ctaText} onChange={(v) => update('homepage', { ...form.homepage, ctaText: v })} />
              <TextInput label="CTA Button Link" value={form.homepage.ctaLink} onChange={(v) => update('homepage', { ...form.homepage, ctaLink: v })} hint="e.g. #admission or https://..." />
            </div>
            <TextArea label="About Section Text" value={form.homepage.aboutText} onChange={(v) => update('homepage', { ...form.homepage, aboutText: v })} rows={4} />
            <TextArea label="Features Text" value={form.homepage.featuresText} onChange={(v) => update('homepage', { ...form.homepage, featuresText: v })} rows={3} />
          </div>
        </Card>
      )}

      {/* C. Gallery / Images */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <Card className="p-6">
            <ImageRepeater title="Website Gallery" items={form.gallery.images} onChange={(images) => update('gallery', { ...form.gallery, images })} />
          </Card>
          <Card className="p-6">
            <ImageRepeater title="Banner Images" items={form.gallery.banners} onChange={(banners) => update('gallery', { ...form.gallery, banners })} />
          </Card>
        </div>
      )}

      {/* D. Contact Information */}
      {activeTab === 'contact' && (
        <Card className="p-6">
          <SectionHeading title="Contact Information" subtitle="Address, phone, WhatsApp, email, map link and social media." />
          <div className="grid md:grid-cols-2 gap-5">
            <TextInput label="Phone Number" value={form.contact.phone} onChange={(v) => update('contact', { ...form.contact, phone: v })} />
            <TextInput label="WhatsApp Number" value={form.contact.whatsapp} onChange={(v) => update('contact', { ...form.contact, whatsapp: v })} />
            <TextInput label="Email" value={form.contact.email} onChange={(v) => update('contact', { ...form.contact, email: v })} type="email" />
            <TextInput label="Google Map Link" value={form.contact.googleMapLink} onChange={(v) => update('contact', { ...form.contact, googleMapLink: v })} />
          </div>
          <div className="mt-5">
            <TextArea label="School Address" value={form.contact.address} onChange={(v) => update('contact', { ...form.contact, address: v })} rows={2} />
          </div>
          <h4 className="font-black text-lg mt-6 mb-4">Social Media Links</h4>
          <div className="grid md:grid-cols-2 gap-5">
            <TextInput label="Facebook" value={form.contact.social.facebook} onChange={(v) => update('contact', { ...form.contact, social: { ...form.contact.social, facebook: v } })} />
            <TextInput label="Instagram" value={form.contact.social.instagram} onChange={(v) => update('contact', { ...form.contact, social: { ...form.contact.social, instagram: v } })} />
            <TextInput label="Twitter / X" value={form.contact.social.twitter} onChange={(v) => update('contact', { ...form.contact, social: { ...form.contact.social, twitter: v } })} />
            <TextInput label="YouTube" value={form.contact.social.youtube} onChange={(v) => update('contact', { ...form.contact, social: { ...form.contact.social, youtube: v } })} />
          </div>
        </Card>
      )}

      {/* E. SEO Settings */}
      {activeTab === 'seo' && (
        <Card className="p-6">
          <SectionHeading title="SEO Settings" subtitle="Search engine title, description, keywords and share preview image." />
          <div className="grid gap-5">
            <TextInput label="Website Title" value={form.seo.title} onChange={(v) => update('seo', { ...form.seo, title: v })} />
            <TextArea label="Meta Description" value={form.seo.metaDescription} onChange={(v) => update('seo', { ...form.seo, metaDescription: v })} rows={3} />
            <TextInput label="Keywords" value={form.seo.keywords} onChange={(v) => update('seo', { ...form.seo, keywords: v })} hint="Comma separated, e.g. school, admission, Varanasi" />
            <ImageUploadField label="Open Graph Image (share preview)" value={form.seo.ogImage} onChange={(v) => update('seo', { ...form.seo, ogImage: v })} />
          </div>
        </Card>
      )}

      {confirmingReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl p-6">
            <h3 className="text-2xl font-black mb-2">Reset Website Content?</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Ye action Branding, Homepage, Gallery, Contact aur SEO — sab default values par restore kar dega. Ye undo nahi ho sakta.</p>
            <div className="flex justify-end gap-3">
              <SoftButton onClick={() => setConfirmingReset(false)}>Cancel</SoftButton>
              <DangerButton onClick={handleReset}>Yes, Reset Everything</DangerButton>
            </div>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-slate-400 font-semibold">Defaults reference: {defaultWebsiteSettings.branding.schoolName}</p>
    </div>
  );
};

export default WebsiteControlPanel;
