// ============================================
// SCHOOL DATA CONFIGURATION
// ============================================
// Yahan par aap easily school ka saara data change kar sakte hain
// Edit this file to update all school information

export const schoolConfig = {
  // ========== BASIC SCHOOL INFO ==========
  // Change school name, tagline, and basic details here
  schoolName: "Gurukul Pathshala",
  tagline: "Where Tradition Meets Modern Education",
  shortDescription: "Providing quality education with traditional values since 2010. We nurture young minds to become responsible citizens of tomorrow.",
  
  // ========== CONTACT INFORMATION ==========
  // Update address, phone, email, WhatsApp number here
  contact: {
    address: "Gurukul Pathshala, Near Main Road, Varanasi, Uttar Pradesh, India",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "info@gurukulpathshala.com",
    googleMapLink: "https://maps.google.com/?q=Varanasi,Uttar+Pradesh",
  },

  // ========== COLOR THEME ==========
  // Change these hex codes to update website colors
  colors: {
    primary: "#DC2626",      // Red - Main color (buttons, highlights)
    secondary: "#1F2937",    // Dark Gray/Black - Headers, footer
    accent: "#FEF3C7",       // Light Cream - Backgrounds
    white: "#FFFFFF",        // White
    text: "#374151",         // Gray text
    lightGray: "#F3F4F6",    // Light backgrounds
  },

  // ========== LOGO ==========
  // Replace with your actual logo file path (put logo in public/logo.png or logo.svg)
  logo: {
    src: "/logo.svg",  // Put your logo file in public/ folder (SVG or PNG)
    alt: "Gurukul Pathshala Logo",
    width: 60,
    height: 60,
  },

  // ========== ADMISSION INFO ==========
  // Update admission details here
  admission: {
    isOpen: true,
    session: "2026-27",
    heading: "Admission Open for Session 2026-27",
    description: "We are now accepting admissions from Nursery to Class 8. Limited seats available. Apply now!",
    eligibility: "Age 3+ for Nursery, Age 4+ for LKG, Age 5+ for UKG",
    process: [
      "Fill the admission inquiry form",
      "Visit school for interaction",
      "Submit required documents",
      "Pay admission fees",
      "Complete enrollment"
    ],
    documentsRequired: [
      "Birth Certificate",
      "Aadhar Card (Child & Parents)",
      "Previous School Report Card (if applicable)",
      "Passport Size Photos (4)",
      "Address Proof"
    ],
    fees: {
      admissionFee: "₹5,000",
      annualFee: "₹25,000",
      monthlyFee: "₹2,500",
      transportFee: "₹1,000 (Optional)",
    }
  },

  // ========== CLASSES OFFERED ==========
  // Add or remove classes here
  classes: [
    { name: "Nursery", age: "3+ years", strength: "30 students" },
    { name: "LKG", age: "4+ years", strength: "30 students" },
    { name: "UKG", age: "5+ years", strength: "30 students" },
    { name: "Class 1", age: "6+ years", strength: "35 students" },
    { name: "Class 2", age: "7+ years", strength: "35 students" },
    { name: "Class 3", age: "8+ years", strength: "35 students" },
    { name: "Class 4", age: "9+ years", strength: "35 students" },
    { name: "Class 5", age: "10+ years", strength: "35 students" },
    { name: "Class 6", age: "11+ years", strength: "40 students" },
    { name: "Class 7", age: "12+ years", strength: "40 students" },
    { name: "Class 8", age: "13+ years", strength: "40 students" },
  ],

  // ========== FACILITIES ==========
  // Add or remove facilities here
  facilities: [
    {
      icon: "📚",
      title: "Smart Classes",
      description: "Modern digital classrooms with interactive smart boards"
    },
    {
      icon: "💻",
      title: "Computer Lab",
      description: "Well-equipped computer lab with latest systems"
    },
    {
      icon: "📖",
      title: "Library",
      description: "Rich collection of books and reading materials"
    },
    {
      icon: "⚽",
      title: "Sports Facilities",
      description: "Playground for cricket, football, basketball and more"
    },
    {
      icon: "🛡️",
      title: "Safe Campus",
      description: "Secure environment with 24/7 surveillance"
    },
    {
      icon: "👨‍🏫",
      title: "Experienced Teachers",
      description: "Qualified and dedicated teaching staff"
    },
    {
      icon: "📹",
      title: "CCTV Security",
      description: "Complete campus coverage for student safety"
    },
    {
      icon: "🏫",
      title: "Clean Classrooms",
      description: "Hygienic and well-maintained learning spaces"
    },
    {
      icon: "🎭",
      title: "Cultural Activities",
      description: "Regular events for holistic development"
    },
  ],

  // ========== NOTICE BOARD ==========
  // Add new notices at the top of the array
  notices: [
    {
      id: 1,
      title: "Admission Open 2026-27",
      date: "2026-01-15",
      category: "Admission",
      priority: "high",
      description: "Admissions are now open for session 2026-27. Apply before seats fill up!"
    },
    {
      id: 2,
      title: "Parent Teacher Meeting",
      date: "2026-01-20",
      category: "Event",
      priority: "medium",
      description: "PTM scheduled for all classes. Parents are requested to attend."
    },
    {
      id: 3,
      title: "Annual Function",
      date: "2026-02-10",
      category: "Event",
      priority: "medium",
      description: "Annual day celebration with cultural programs by students."
    },
    {
      id: 4,
      title: "Exam Time Table",
      date: "2026-01-25",
      category: "Academic",
      priority: "high",
      description: "Final exam schedule has been released. Check with class teacher."
    },
    {
      id: 5,
      title: "Holiday Notice",
      date: "2026-01-26",
      category: "Holiday",
      priority: "low",
      description: "School will remain closed on Republic Day."
    },
  ],

  // ========== TEACHERS / STAFF ==========
  // Add teacher details here
  teachers: [
    {
      name: "Dr. Rajesh Kumar",
      designation: "Principal",
      qualification: "M.Ed, Ph.D",
      experience: "20 years",
      image: "/teachers/principal.svg",  // Put teacher photos in public/teachers/
      description: "Leading the school with vision and dedication"
    },
    {
      name: "Smt. Priya Sharma",
      designation: "Vice Principal",
      qualification: "M.A, B.Ed",
      experience: "15 years",
      image: "/teachers/teacher1.svg",
      description: "Expert in curriculum development"
    },
    {
      name: "Shri Amit Singh",
      designation: "Senior Teacher",
      qualification: "M.Sc, B.Ed",
      experience: "12 years",
      image: "/teachers/teacher1.svg",
      description: "Mathematics and Science expert"
    },
    {
      name: "Smt. Neha Gupta",
      designation: "Primary Teacher",
      qualification: "B.Ed, D.El.Ed",
      experience: "8 years",
      image: "/teachers/teacher1.svg",
      description: "Specialist in early childhood education"
    },
    {
      name: "Shri Vikram Patel",
      designation: "Sports Teacher",
      qualification: "B.P.Ed",
      experience: "10 years",
      image: "/teachers/teacher1.svg",
      description: "Trained coach for multiple sports"
    },
    {
      name: "Smt. Anjali Verma",
      designation: "Computer Teacher",
      qualification: "MCA, B.Ed",
      experience: "7 years",
      image: "/teachers/teacher1.svg",
      description: "IT and coding instructor"
    },
  ],

  // ========== GALLERY IMAGES ==========
  // Add image paths here (put images in public/gallery/)
  gallery: [
    { src: "/gallery/image1.svg", alt: "School Building", category: "Infrastructure" },
    { src: "/gallery/image2.svg", alt: "Classroom", category: "Infrastructure" },
    { src: "/gallery/image3.svg", alt: "Computer Lab", category: "Facilities" },
    { src: "/gallery/image4.svg", alt: "Library", category: "Facilities" },
    { src: "/gallery/image5.svg", alt: "Sports Day", category: "Events" },
    { src: "/gallery/image6.svg", alt: "Annual Function", category: "Events" },
    { src: "/gallery/image7.svg", alt: "Students in Class", category: "Academic" },
    { src: "/gallery/image8.svg", alt: "Cultural Program", category: "Events" },
    { src: "/gallery/image9.svg", alt: "Playground", category: "Facilities" },
    { src: "/gallery/image10.svg", alt: "Science Lab", category: "Facilities" },
    { src: "/gallery/image11.svg", alt: "Art Class", category: "Academic" },
    { src: "/gallery/image12.svg", alt: "Group Photo", category: "Events" },
  ],

  // ========== EVENTS ==========
  upcomingEvents: [
    {
      name: "Republic Day Celebration",
      date: "2026-01-26",
      time: "9:00 AM",
      venue: "School Ground"
    },
    {
      name: "Annual Sports Meet",
      date: "2026-02-15",
      time: "8:00 AM",
      venue: "Sports Complex"
    },
    {
      name: "Science Exhibition",
      date: "2026-03-01",
      time: "10:00 AM",
      venue: "School Auditorium"
    },
    {
      name: "Parent Teacher Meeting",
      date: "2026-03-10",
      time: "11:00 AM",
      venue: "Classrooms"
    },
  ],

  // ========== ACHIEVEMENTS ==========
  achievements: [
    {
      title: "District Level Science Fair",
      description: "3 Gold, 5 Silver medals won by our students",
      year: "2025",
      icon: "🏆"
    },
    {
      title: "Sports Championship",
      description: "First position in inter-school cricket tournament",
      year: "2025",
      icon: "🏏"
    },
    {
      title: "Cultural Competition",
      description: "Best school award for dance performance",
      year: "2024",
      icon: "🎭"
    },
    {
      title: "Academic Excellence",
      description: "100% pass result for 5 consecutive years",
      year: "2025",
      icon: "📚"
    },
  ],

  // ========== PRINCIPAL MESSAGE ==========
  principal: {
    name: "Dr. Rajesh Kumar",
    message: `Welcome to Gurukul Pathshala! 

Our institution is committed to providing quality education that combines traditional values with modern teaching methodologies. We believe in nurturing not just academic excellence but also character development, creativity, and social responsibility.

At Gurukul Pathshala, every child is treated as unique and given personalized attention to help them reach their full potential. Our experienced faculty, state-of-the-art facilities, and holistic approach to education make us the preferred choice for parents in Varanasi.

We invite you to be a part of our educational family and witness your child's growth and success.

Warm Regards,
Dr. Rajesh Kumar
Principal`,
    image: "/teachers/principal.svg",
    signature: ""  // Optional: Add principal's signature image path
  },

  // ========== WHY CHOOSE US ==========
  whyChooseUs: [
    {
      icon: "🎯",
      title: "Quality Education",
      description: "CBSE affiliated curriculum with focus on conceptual learning"
    },
    {
      icon: "👨‍🏫",
      title: "Expert Faculty",
      description: "Highly qualified and experienced teaching staff"
    },
    {
      icon: "🏫",
      title: "Modern Infrastructure",
      description: "Smart classrooms, labs, library and sports facilities"
    },
    {
      icon: "🛡️",
      title: "Safe Environment",
      description: "CCTV surveillance and secure campus for children"
    },
    {
      icon: "🚌",
      title: "Transport Facility",
      description: "GPS enabled buses covering all major areas"
    },
    {
      icon: "🍽️",
      title: "Healthy Meals",
      description: "Nutritious mid-day meals and clean drinking water"
    },
  ],

  // ========== FAQ ==========
  faq: [
    {
      question: "What is the admission process?",
      answer: "Fill the admission inquiry form, visit school for interaction, submit required documents, and complete the enrollment process."
    },
    {
      question: "What is the age criteria for admission?",
      answer: "Nursery: 3+ years, LKG: 4+ years, UKG: 5+ years, Class 1: 6+ years (as on 31st March)"
    },
    {
      question: "Is transport facility available?",
      answer: "Yes, we provide GPS-enabled bus facility covering all major areas of Varanasi. Fee is optional."
    },
    {
      question: "What is the school timing?",
      answer: "School operates from 8:00 AM to 2:00 PM (Monday to Saturday). Activity classes may extend till 3:30 PM."
    },
    {
      question: "Do you provide mid-day meals?",
      answer: "Yes, we provide healthy and nutritious meals prepared in our hygienic kitchen."
    },
    {
      question: "What is the fee structure?",
      answer: "Admission Fee: ₹5,000, Annual Fee: ₹25,000, Monthly Fee: ₹2,500. Transport fee is optional at ₹1,000/month."
    },
    {
      question: "Can I schedule a school visit?",
      answer: "Yes, you can visit the school any working day between 9 AM to 1 PM. For guided tour, please call us to schedule."
    },
  ],

  // ========== SOCIAL MEDIA LINKS ==========
  socialMedia: {
    facebook: "https://facebook.com/gurukulpathshala",
    instagram: "https://instagram.com/gurukulpathshala",
    twitter: "https://twitter.com/gurukulpathshala",
    youtube: "https://youtube.com/gurukulpathshala",
  },

  // ========== FOOTER INFO ==========
  footer: {
    quickLinks: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Admission", href: "#admission" },
      { name: "Classes", href: "#classes" },
      { name: "Facilities", href: "#facilities" },
      { name: "Gallery", href: "#gallery" },
      { name: "Contact", href: "#contact" },
    ],
    copyright: "© 2026 Gurukul Pathshala. All Rights Reserved.",
  },
};

// ============================================
// END OF CONFIGURATION
// ============================================
// To make changes:
// 1. Edit values above
// 2. Save the file
// 3. Website will automatically update
// ============================================
