// ============================================
// GURUKUL PATHSHALA - SCHOOL WEBSITE
// ============================================
// Main Application Component
// All sections are modular and easy to edit
// ============================================

import { useState, useEffect } from 'react';
import { schoolConfig } from './config/schoolData';

// ============================================
// UTILITY COMPONENTS
// ============================================

// Section Title Component - Reusable heading for all sections
const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
      {title}
      <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></span>
    </h2>
    {subtitle && <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

// Button Component - Reusable button style
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  type = 'button'
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-800 text-white hover:bg-gray-900 shadow-lg",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
  };
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// ============================================
// HEADER COMPONENT
// ============================================
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Admission', href: '#admission' },
    { name: 'Classes', href: '#classes' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-red-600 to-red-700'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img 
                src="/logo.png" 
                alt={schoolConfig.logo.alt}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  // Fallback if logo not found - shows school initials
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-red-600 font-bold text-xl">GP</span>
            </div>
            <div>
              <h1 className={`font-bold text-xl ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                {schoolConfig.schoolName}
              </h1>
              <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-red-100'}`}>
                {schoolConfig.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors hover:text-red-300 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Button variant={isScrolled ? 'primary' : 'secondary'}>
              <a href="#admission" className="block">Admission Open</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="px-4 py-3">
              <Button className="w-full">
                <a href="#admission" className="block">Admission Open</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-yellow-300 font-semibold">🎓 {schoolConfig.admission.heading}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to<br />
              <span className="text-yellow-300">{schoolConfig.schoolName}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              {schoolConfig.tagline}
            </p>
            
            <p className="text-lg mb-8 text-red-50 max-w-xl">
              {schoolConfig.shortDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                <a href="#admission" className="block">Apply Now</a>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <a href="#about" className="block">Learn More</a>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-yellow-300">15+</div>
                <div className="text-sm text-red-100">Years Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-red-100">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">100%</div>
                <div className="text-sm text-red-100">Pass Result</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-300/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <img 
                  src="/hero-school.jpg" 
                  alt="School Building"
                  className="w-full h-96 object-cover rounded-2xl"
                  onError={(e) => {
                    // Fallback gradient if image not found
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
                    (e.target as HTMLImageElement).parentElement!.style.minHeight = '384px';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

// ============================================
// ABOUT SECTION
// ============================================
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="About Gurukul Pathshala" 
          subtitle="Building strong foundations for future leaders"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="absolute -inset-4 bg-red-100 rounded-3xl transform -rotate-3"></div>
            <img 
              src="/about-school.jpg" 
              alt="About School"
              className="relative w-full h-96 object-cover rounded-2xl shadow-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                (e.target as HTMLImageElement).parentElement!.style.minHeight = '384px';
                (e.target as HTMLImageElement).parentElement!.classList.add('rounded-2xl');
              }}
            />
          </div>

          {/* Content Side */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Empowering Young Minds Since 2010
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {schoolConfig.shortDescription}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our institution combines the best of traditional Indian values with modern educational 
              methodologies to create well-rounded individuals ready to face the challenges of tomorrow.
            </p>

            {/* Why Choose Us Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {schoolConfig.whyChooseUs.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button>
                <a href="#contact" className="block">Schedule a Visit</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PRINCIPAL MESSAGE SECTION
// ============================================
const PrincipalMessage = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Principal's Message" 
          subtitle="A word from our leadership"
        />

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-3 gap-8 p-8">
              {/* Principal Image */}
              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-100 rounded-2xl transform rotate-2"></div>
                  <img 
                    src={schoolConfig.principal.image}
                    alt={schoolConfig.principal.name}
                    className="relative w-full h-64 object-cover rounded-2xl shadow-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                      (e.target as HTMLImageElement).parentElement!.style.minHeight = '256px';
                      (e.target as HTMLImageElement).parentElement!.classList.add('rounded-2xl', 'flex', 'items-center', 'justify-center');
                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-6xl">👨‍🏫</span>';
                    }}
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {schoolConfig.principal.name}
                </h3>
                <p className="text-red-600 font-semibold mb-4">Principal</p>
                
                <div className="prose prose-red max-w-none">
                  {schoolConfig.principal.message.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Signature Placeholder */}
                <div className="mt-6">
                  <img 
                    src={schoolConfig.principal.signature}
                    alt="Signature"
                    className="h-16"
                    onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ADMISSION SECTION
// ============================================
const AdmissionSection = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    studentAge: '',
    classApplied: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({
      parentName: '',
      studentName: '',
      studentAge: '',
      classApplied: '',
      phone: '',
      email: '',
      address: '',
      message: ''
    });
  };

  return (
    <section id="admission" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={schoolConfig.admission.heading} 
          subtitle={schoolConfig.admission.description}
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Admission Info */}
          <div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Admission Process</h3>
              <ol className="space-y-4">
                {schoolConfig.admission.process.map((step, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Documents Required</h3>
              <ul className="space-y-3">
                {schoolConfig.admission.documentsRequired.map((doc, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-600 text-white rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Fee Structure</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-red-400 pb-3">
                  <span>Admission Fee</span>
                  <span className="font-bold text-xl">{schoolConfig.admission.fees.admissionFee}</span>
                </div>
                <div className="flex justify-between items-center border-b border-red-400 pb-3">
                  <span>Annual Fee</span>
                  <span className="font-bold text-xl">{schoolConfig.admission.fees.annualFee}</span>
                </div>
                <div className="flex justify-between items-center border-b border-red-400 pb-3">
                  <span>Monthly Fee</span>
                  <span className="font-bold text-xl">{schoolConfig.admission.fees.monthlyFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Transport Fee (Optional)</span>
                  <span className="font-bold text-xl">{schoolConfig.admission.fees.transportFee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Inquiry Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Admission Inquiry Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Name</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter parent name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter student name"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Age</label>
                  <input
                    type="number"
                    required
                    value={formData.studentAge}
                    onChange={(e) => setFormData({...formData, studentAge: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Age in years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Applied For</label>
                  <select
                    required
                    value={formData.classApplied}
                    onChange={(e) => setFormData({...formData, classApplied: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    {schoolConfig.classes.map((cls) => (
                      <option key={cls.name} value={cls.name}>{cls.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Any Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Any additional information..."
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CLASSES SECTION
// ============================================
const ClassesSection = () => {
  return (
    <section id="classes" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Classes Offered" 
          subtitle="Quality education from Nursery to Class 8"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {schoolConfig.classes.map((cls, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-red-600"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">{cls.name.replace('Class ', '')}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{cls.name}</h3>
              <p className="text-sm text-gray-600">Age: {cls.age}</p>
              <p className="text-xs text-gray-500 mt-1">{cls.strength}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {schoolConfig.admission.eligibility}
          </p>
          <Button>
            <a href="#admission" className="block">Apply for Admission</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FACILITIES SECTION
// ============================================
const FacilitiesSection = () => {
  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Facilities" 
          subtitle="State-of-the-art infrastructure for holistic development"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolConfig.facilities.map((facility, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-red-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">{facility.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{facility.title}</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// NOTICE BOARD SECTION
// ============================================
const NoticeBoardSection = () => {
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📢 Notice Board
          </h2>
          <p className="text-red-100">Stay updated with latest announcements</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {schoolConfig.notices.map((notice) => (
              <div 
                key={notice.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(notice.priority)}`}>
                        {notice.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        📅 {new Date(notice.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{notice.title}</h3>
                    <p className="text-gray-600">{notice.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-4xl">📌</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// TEACHERS SECTION
// ============================================
const TeachersSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Teachers" 
          subtitle="Dedicated educators shaping future leaders"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolConfig.teachers.map((teacher, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                <img 
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-6xl">👨‍🏫</span>';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{teacher.name}</h3>
                <p className="text-red-600 font-semibold mb-3">{teacher.designation}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📚 {teacher.qualification}</p>
                  <p>⏱️ {teacher.experience} experience</p>
                </div>
                <p className="mt-4 text-gray-500 text-sm italic">"{teacher.description}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// GALLERY SECTION
// ============================================
const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Photo Gallery" 
          subtitle="Glimpses of life at Gurukul Pathshala"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {schoolConfig.gallery.map((image, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
              onClick={() => setSelectedImage(image.src)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="absolute inset-0 flex items-center justify-center text-4xl">📷</span>`;
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-lg font-semibold">{image.category}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white text-4xl hover:text-red-500"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img 
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain"
              onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
            />
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================
// EVENTS SECTION
// ============================================
const EventsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Upcoming Events" 
          subtitle="Mark your calendar for these exciting activities"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolConfig.upcomingEvents.map((event, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-600"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">📅</span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{event.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>⏰ {event.time}</p>
                <p>📍 {event.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// ACHIEVEMENTS SECTION
// ============================================
const AchievementsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏆 Our Achievements
          </h2>
          <p className="text-red-100">Celebrating excellence and success</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolConfig.achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors"
            >
              <div className="text-5xl mb-4">{achievement.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
              <p className="text-red-100 mb-3">{achievement.description}</p>
              <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm text-white">
                {achievement.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FAQ SECTION
// ============================================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Frequently Asked Questions" 
          subtitle="Get answers to common queries"
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {schoolConfig.faq.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-red-50 transition-colors flex items-center justify-between"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-gray-800">{item.question}</span>
                  <span className={`transform transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CONTACT SECTION
// ============================================
const ContactSection = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Contact Us" 
          subtitle="Get in touch with us"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600">{schoolConfig.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <a href={`tel:${schoolConfig.contact.phone}`} className="text-red-600 hover:underline">
                      {schoolConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">WhatsApp</h4>
                    <a 
                      href={`https://wa.me/${schoolConfig.contact.whatsapp.replace('+', '')}`}
                      className="text-green-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {schoolConfig.contact.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <a href={`mailto:${schoolConfig.contact.email}`} className="text-red-600 hover:underline">
                      {schoolConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t">
                <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href={schoolConfig.socialMedia.facebook} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    f
                  </a>
                  <a href={schoolConfig.socialMedia.instagram} className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                    📷
                  </a>
                  <a href={schoolConfig.socialMedia.twitter} className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    𝕏
                  </a>
                  <a href={schoolConfig.socialMedia.youtube} className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                    ▶
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">🗺️</span>
                  <p className="text-gray-600">Google Map</p>
                  <a 
                    href={schoolConfig.contact.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline text-sm mt-2 inline-block"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Your message..."
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-xl">GP</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{schoolConfig.schoolName}</h3>
                <p className="text-gray-400 text-sm">{schoolConfig.tagline}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">{schoolConfig.shortDescription}</p>
            <div className="flex space-x-4">
              <a href={schoolConfig.socialMedia.facebook} className="text-gray-400 hover:text-white transition-colors">FB</a>
              <a href={schoolConfig.socialMedia.instagram} className="text-gray-400 hover:text-white transition-colors">IG</a>
              <a href={schoolConfig.socialMedia.twitter} className="text-gray-400 hover:text-white transition-colors">TW</a>
              <a href={schoolConfig.socialMedia.youtube} className="text-gray-400 hover:text-white transition-colors">YT</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {schoolConfig.footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <span>📍</span>
                <span>{schoolConfig.contact.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <span>📞</span>
                <a href={`tel:${schoolConfig.contact.phone}`} className="hover:text-white">
                  {schoolConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <span>📧</span>
                <a href={`mailto:${schoolConfig.contact.email}`} className="hover:text-white">
                  {schoolConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to get latest updates and notices</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-l-lg bg-gray-700 border-none focus:ring-2 focus:ring-red-500 text-white"
              />
              <button className="bg-red-600 px-6 py-3 rounded-r-lg hover:bg-red-700 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>{schoolConfig.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// FLOATING ACTION BUTTONS
// ============================================
const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${schoolConfig.contact.whatsapp.replace('+', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        title="Chat on WhatsApp"
      >
        <span className="text-2xl">💬</span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${schoolConfig.contact.phone}`}
        className="fixed bottom-6 right-24 z-40 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-all hover:scale-110"
        title="Call Now"
      >
        <span className="text-2xl">📞</span>
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-900 transition-all hover:scale-110"
          title="Back to Top"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PrincipalMessage />
        <AdmissionSection />
        <ClassesSection />
        <FacilitiesSection />
        <NoticeBoardSection />
        <TeachersSection />
        <GallerySection />
        <EventsSection />
        <AchievementsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
