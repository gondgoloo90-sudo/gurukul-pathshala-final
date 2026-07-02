# 🏫 Gurukul Pathshala - School Website

A modern, professional, and easily editable school website built with React, Vite, and Tailwind CSS.

---

## 🚀 How to Run the Website

### Prerequisites
- Node.js installed (version 16 or higher)
- npm (comes with Node.js)

### Steps to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Visit `http://localhost:5173` (or the URL shown in terminal)

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## ✏️ How to Edit the Website

### 📁 Main Configuration File

All editable content is in **`src/config/schoolData.ts`**

Open this file to change:
- School name and tagline
- Contact information
- Colors
- Logo
- Admission details
- Classes
- Facilities
- Notices
- Teachers
- Gallery images
- Events
- Achievements
- FAQ
- And much more!

---

## 🔧 Quick Edit Guide

### 1. Change School Name
```typescript
// In src/config/schoolData.ts
schoolName: "Your School Name",
tagline: "Your Tagline Here",
```

### 2. Change Logo
1. Put your logo file in the `public/` folder (e.g., `logo.png`)
2. Update the path in config:
```typescript
logo: {
  src: "/logo.png",  // Your logo file path
  alt: "School Logo",
  width: 60,
  height: 60,
},
```

### 3. Change Contact Information
```typescript
contact: {
  address: "Your School Address",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "your@email.com",
  googleMapLink: "https://maps.google.com/?q=Your+Location",
},
```

### 4. Change Colors
```typescript
colors: {
  primary: "#DC2626",      // Main color (buttons, highlights)
  secondary: "#1F2937",    // Headers, footer
  accent: "#FEF3C7",       // Backgrounds
  white: "#FFFFFF",
  text: "#374151",
  lightGray: "#F3F4F6",
},
```

### 5. Add/Update Notice
```typescript
notices: [
  {
    id: 1,
    title: "Notice Title",
    date: "2026-01-15",
    category: "Admission",  // Admission, Event, Academic, Holiday
    priority: "high",       // high, medium, low
    description: "Notice description here"
  },
  // Add more notices...
],
```

### 6. Add/Update Teacher
```typescript
teachers: [
  {
    name: "Teacher Name",
    designation: "Principal/Teacher",
    qualification: "M.Ed, B.Ed",
    experience: "10 years",
    image: "/teachers/teacher1.jpg",  // Put image in public/teachers/
    description: "Short description"
  },
],
```

### 7. Add Gallery Images
1. Put images in `public/gallery/` folder
2. Update config:
```typescript
gallery: [
  { src: "/gallery/image1.jpg", alt: "Image Description", category: "Events" },
  { src: "/gallery/image2.jpg", alt: "Image Description", category: "Infrastructure" },
],
```

### 8. Add/Update Classes
```typescript
classes: [
  { name: "Nursery", age: "3+ years", strength: "30 students" },
  { name: "LKG", age: "4+ years", strength: "30 students" },
  // Add more classes...
],
```

### 9. Add/Update Facilities
```typescript
facilities: [
  {
    icon: "📚",  // Emoji or use icon component
    title: "Facility Name",
    description: "Description here"
  },
],
```

### 10. Add/Update Events
```typescript
upcomingEvents: [
  {
    name: "Event Name",
    date: "2026-01-26",
    time: "9:00 AM",
    venue: "School Ground"
  },
],
```

### 11. Add/Update Achievements
```typescript
achievements: [
  {
    title: "Achievement Title",
    description: "Description",
    year: "2025",
    icon: "🏆"
  },
],
```

### 12. Add/Update FAQ
```typescript
faq: [
  {
    question: "Your question here?",
    answer: "Your answer here."
  },
],
```

### 13. Update Admission Details
```typescript
admission: {
  isOpen: true,
  session: "2026-27",
  heading: "Admission Open for Session 2026-27",
  description: "Description here",
  eligibility: "Age criteria",
  process: ["Step 1", "Step 2", "Step 3"],
  documentsRequired: ["Document 1", "Document 2"],
  fees: {
    admissionFee: "₹5,000",
    annualFee: "₹25,000",
    monthlyFee: "₹2,500",
    transportFee: "₹1,000",
  }
},
```

---

## 📁 File Structure

```
project/
├── public/
│   ├── logo.png              # School logo
│   ├── teachers/             # Teacher photos
│   │   ├── principal.jpg
│   │   └── teacher1.jpg
│   └── gallery/              # Gallery images
│       ├── image1.jpg
│       └── image2.jpg
├── src/
│   ├── config/
│   │   └── schoolData.ts     # ⭐ MAIN CONFIG FILE - Edit this!
│   ├── App.tsx               # Main application
│   └── main.tsx              # Entry point
├── index.html                # HTML template
├── package.json
└── README.md                 # This file
```

---

## 🎨 Customization Tips

### Adding Images
1. Place images in `public/` folder
2. Use path like `/folder/image.jpg` in config
3. Recommended sizes:
   - Logo: 200x200px
   - Teacher photos: 400x500px
   - Gallery images: 800x600px
   - Hero image: 1200x800px

### Changing Color Theme
Edit the `colors` object in `schoolData.ts`:
- Use any hex color code
- Primary color affects buttons, highlights
- Secondary color affects headers, footer
- Test changes in real-time with dev server

### Adding New Sections
1. Create new component in `App.tsx`
2. Add it in the main App component
3. Add navigation link in Header component

---

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Easy to edit configuration
- ✅ Modern design with animations
- ✅ Admission inquiry form
- ✅ Contact form
- ✅ Notice board
- ✅ Photo gallery with lightbox
- ✅ WhatsApp floating button
- ✅ Call button
- ✅ Back to top button
- ✅ FAQ accordion
- ✅ Events section
- ✅ Achievements showcase
- ✅ Teacher profiles
- ✅ Class information
- ✅ Facilities display
- ✅ Google Maps integration
- ✅ Social media links

---

## 🛠️ Technologies Used

- **React** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **TypeScript** - Type Safety

---

## 📞 Support

For any issues or questions:
1. Check this README
2. Review `src/config/schoolData.ts` comments
3. All sections have inline comments explaining what to change

---

## 📄 License

This website template is free to use for your school.

---

**Made with ❤️ for Gurukul Pathshala**


## Day 4 Update – Enterprise Backend Ready

This version adds a backend-ready service layer, validation helpers, persisted login role, and production build verification. The project still works fully as a local demo, but it is now easier to connect with Firebase, Supabase, or a custom Node.js backend.

### Important Day 4 Files

- `src/services/api.ts` – central API client for future backend
- `src/lib/validators.ts` – common form validation helpers
- `docs/DAY4_BACKEND_READY_PLAN.md` – next backend roadmap

### Run Locally

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
```
