# 🏫 गुरुकुल पाठशाला - वेबसाइट एडिटिंग गाइड

## 📖 वेबसाइट कैसे चलाएं (How to Run)

### पहली बार सेटअप:
```bash
npm install
```

### वेबसाइट चलाने के लिए:
```bash
npm run dev
```

### ब्राउज़र में खोलें:
`http://localhost:5173`

### Production Build:
```bash
npm run build
```

---

## ✏️ वेबसाइट कैसे एडिट करें

### 📁 मुख्य कॉन्फ़िगरेशन फ़ाइल

सभी एडिटेबल कंटेंट **`src/config/schoolData.ts`** फ़ाइल में है

इस फ़ाइल को खोलें और बदलें:
- स्कूल का नाम और टैगलाइन
- संपर्क जानकारी
- रंग (colors)
- लोगो
- एडमिशन की जानकारी
- कक्षाएं (classes)
- सुविधाएं (facilities)
- सूचनाएं (notices)
- शिक्षक (teachers)
- गैलरी तस्वीरें
- कार्यक्रम (events)
- उपलब्धियां (achievements)
- FAQ
- और बहुत कुछ!

---

## 🔧 क्विक एडिट गाइड

### 1. स्कूल का नाम बदलें
```typescript
// src/config/schoolData.ts में
schoolName: "आपके स्कूल का नाम",
tagline: "आपकी टैगलाइन यहां",
```

### 2. लोगो बदलें
1. अपनी लोगो फ़ाइल को `public/` फोल्डर में रखें (जैसे `logo.png` या `logo.svg`)
2. कॉन्फ़िग में पाथ अपडेट करें:
```typescript
logo: {
  src: "/logo.png",  // आपकी लोगो फ़ाइल का पाथ
  alt: "School Logo",
  width: 60,
  height: 60,
},
```

### 3. पता और संपर्क जानकारी बदलें
```typescript
contact: {
  address: "आपके स्कूल का पूरा पता",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "your@email.com",
  googleMapLink: "https://maps.google.com/?q=Your+Location",
},
```

### 4. रंग बदलें (Color Theme)
```typescript
colors: {
  primary: "#DC2626",      // मुख्य रंग (बटन, हाईलाइट्स)
  secondary: "#1F2937",    // हेडर, फूटर
  accent: "#FEF3C7",       // बैकग्राउंड
  white: "#FFFFFF",
  text: "#374151",
  lightGray: "#F3F4F6",
},
```
**रंग कोड्स:**
- लाल: `#DC2626`, `#EF4444`, `#B91C1C`
- काला: `#1F2937`, `#111827`
- नीला: `#3B82F6`, `#2563EB`
- हरा: `#10B981`, `#059669`

### 5. नोटिस जोड़ें/बदलें
```typescript
notices: [
  {
    id: 1,
    title: "नोटिस का शीर्षक",
    date: "2026-01-15",
    category: "Admission",  // Admission, Event, Academic, Holiday
    priority: "high",       // high, medium, low
    description: "नोटिस का विवरण यहां"
  },
  // और नोटिस जोड़ें...
],
```

### 6. शिक्षक जोड़ें/बदलें
1. शिक्षक की फोटो `public/teachers/` में रखें
2. कॉन्फ़िग में जोड़ें:
```typescript
teachers: [
  {
    name: "शिक्षक का नाम",
    designation: "Principal/Teacher",
    qualification: "M.Ed, B.Ed",
    experience: "10 years",
    image: "/teachers/teacher1.jpg",  // फोटो का पाथ
    description: "छोटा विवरण"
  },
],
```

### 7. गैलरी में तस्वीरें जोड़ें
1. तस्वीरें `public/gallery/` फोल्डर में रखें
2. कॉन्फ़िग अपडेट करें:
```typescript
gallery: [
  { src: "/gallery/image1.jpg", alt: "तस्वीर का विवरण", category: "Events" },
  { src: "/gallery/image2.jpg", alt: "तस्वीर का विवरण", category: "Infrastructure" },
],
```

### 8. कक्षाएं जोड़ें/बदलें
```typescript
classes: [
  { name: "Nursery", age: "3+ years", strength: "30 students" },
  { name: "LKG", age: "4+ years", strength: "30 students" },
  { name: "UKG", age: "5+ years", strength: "30 students" },
  { name: "Class 1", age: "6+ years", strength: "35 students" },
  // और कक्षाएं जोड़ें...
],
```

### 9. सुविधाएं जोड़ें/बदलें (Facilities)
```typescript
facilities: [
  {
    icon: "📚",  // इमोजी या आइकन
    title: "सुविधा का नाम",
    description: "विवरण यहां"
  },
],
```

**सुविधा आइकन्स के लिए इमोजी:**
- 📚 लाइब्रेरी
- 💻 कंप्यूटर लैब
- ⚽ स्पोर्ट्स
- 🎨 आर्ट रूम
- 🔬 साइंस लैब
- 🎵 म्यूजिक रूम
- 🚌 ट्रांसपोर्ट
- 🍽️ मिड डे मील

### 10. कार्यक्रम जोड़ें (Events)
```typescript
upcomingEvents: [
  {
    name: "कार्यक्रम का नाम",
    date: "2026-01-26",
    time: "9:00 AM",
    venue: "School Ground"
  },
],
```

### 11. उपलब्धियां जोड़ें (Achievements)
```typescript
achievements: [
  {
    title: "उपलब्धि का शीर्षक",
    description: "विवरण",
    year: "2025",
    icon: "🏆"
  },
],
```

### 12. FAQ जोड़ें/बदलें
```typescript
faq: [
  {
    question: "आपका सवाल यहां?",
    answer: "आपका जवाब यहां."
  },
],
```

### 13. एडमिशन की जानकारी बदलें
```typescript
admission: {
  isOpen: true,
  session: "2026-27",
  heading: "Admission Open for Session 2026-27",
  description: "विवरण यहां",
  eligibility: "उम्र का मानदंड",
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

## 📁 फ़ाइल संरचना (File Structure)

```
project/
├── public/
│   ├── logo.svg              # स्कूल लोगो
│   ├── teachers/             # शिक्षक फोटो
│   │   ├── principal.svg
│   │   └── teacher1.svg
│   └── gallery/              # गैलरी तस्वीरें
│       ├── image1.svg
│       └── image2.svg
├── src/
│   ├── config/
│   │   └── schoolData.ts     # ⭐ मुख्य कॉन्फ़िग फ़ाइल - इसे एडिट करें!
│   ├── App.tsx               # मुख्य एप्लीकेशन
│   └── main.tsx              # एंट्री पॉइंट
├── index.html                # HTML टेम्पलेट
├── package.json
├── README.md                 # अंग्रेजी गाइड
└── EDITING_GUIDE_HINDI.md    # यह फ़ाइल (हिंदी गाइड)
```

---

## 🎨 कस्टमाइजेशन टिप्स

### तस्वीरें जोड़ना
1. तस्वीरें `public/` फोल्डर में रखें
2. कॉन्फ़िग में पाथ जैसे `/folder/image.jpg` उपयोग करें
3. सुझाए गए साइज:
   - लोगो: 200x200px
   - शिक्षक फोटो: 400x500px
   - गैलरी तस्वीरें: 800x600px
   - हीरो इमेज: 1200x800px

### रंग थीम बदलना
`schoolData.ts` में `colors` ऑब्जेक्ट एडिट करें:
- कोई भी hex color कोड उपयोग करें
- Primary color बटन और हाईलाइट्स को प्रभावित करता है
- Secondary color हेडर और फूटर को प्रभावित करता है
- Dev server के साथ रियल-टाइम में बदलाव देखें

### नया सेक्शन जोड़ना
1. `App.tsx` में नया कंपोनेंट बनाएं
2. मुख्य App कंपोनेंट में जोड़ें
3. Header कंपोनेंट में नेविगेशन लिंक जोड़ें

---

## 📱 फीचर्स

- ✅ पूरी तरह रेस्पॉन्सिव (मोबाइल, टैबलेट, डेस्कटॉप)
- ✅ आसानी से एडिट करने योग्य कॉन्फ़िगरेशन
- ✅ एनिमेशन के साथ आधुनिक डिज़ाइन
- ✅ एडमिशन इनक्वायरी फॉर्म
- ✅ संपर्क फॉर्म
- ✅ नोटिस बोर्ड
- ✅ लाइटबॉक्स के साथ फोटो गैलरी
- ✅ व्हाट्सएप फ्लोटिंग बटन
- ✅ कॉल बटन
- ✅ बैक टू टॉप बटन
- ✅ FAQ एकोर्डियन
- ✅ इवेंट्स सेक्शन
- ✅ उपलब्धियां प्रदर्शन
- ✅ शिक्षक प्रोफाइल
- ✅ कक्षा जानकारी
- ✅ सुविधाएं प्रदर्शन
- ✅ Google Maps इंटीग्रेशन
- ✅ सोशल मीडिया लिंक्स

---

## 🛠️ टेक्नोलॉजी

- **React** - UI फ्रेमवर्क
- **Vite** - बिल्ड टूल
- **Tailwind CSS** - स्टाइलिंग
- **TypeScript** - टाइप सेफ्टी

---

## ❓ समस्याएं और समाधान

### लोगो नहीं दिख रहा?
- फ़ाइल का नाम सही है check करें
- फ़ाइल `public/` फोल्डर में है confirm करें
- ब्राउज़र कैश clear करें

### तस्वीरें नहीं दिख रही?
- फ़ाइल पाथ सही है check करें
- फ़ाइल एक्सटेंशन (.jpg, .png, .svg) सही है
- `public/` फोल्डर में फ़ाइलें रखें

### रंग नहीं बदल रहे?
- `schoolData.ts` सेव किया है confirm करें
- Dev server रीस्टार्ट करें
- ब्राउज़र रिफ्रेश करें (Ctrl+F5)

### फॉर्म काम नहीं कर रहा?
- फॉर्म डेटा कंसोल में लॉग होता है check करें
- ब्राउज़र कंसोल में errors देखें

---

## 📞 सहायता

किसी भी समस्या या प्रश्न के लिए:
1. यह README पढ़ें
2. `src/config/schoolData.ts` में कमेंट्स देखें
3. सभी सेक्शन्स में इनलाइन कमेंट्स हैं जो बताते हैं कि क्या बदलना है

---

## 🎯 अगले कदम

1. ✅ `src/config/schoolData.ts` खोलें
2. ✅ स्कूल का नाम बदलें
3. ✅ अपनी लोगो फ़ाइल `public/` में रखें
4. ✅ संपर्क जानकारी अपडेट करें
5. ✅ अपनी तस्वीरें `public/gallery/` और `public/teachers/` में रखें
6. ✅ नोटिस, इवेंट्स, और अन्य डेटा अपडेट करें
7. ✅ `npm run dev` चलाएं और वेबसाइट देखें
8. ✅ `npm run build` करें और होस्ट करें

---

**गुरुकुल पाठशाला के लिए ❤️ के साथ बनाया गया**
