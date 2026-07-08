# QA Report + Google Sign-In Setup

## ✅ Testing kiya gaya (is session mein)
- `npm install` — clean, no errors
- `npx tsc --noEmit` (full TypeScript check) — pehle 1 error tha, ab 0
- `npm run build` (production build) — successful
- `npm run preview` (built site actual serve karke) — homepage, favicon, aur OG tags check kiye — sab 200 OK

## 🐛 Bugs jo mile aur fix kiye

1. **TypeScript error** — `src/services/api.ts` mein `import.meta.env` type error tha
   (`vite-env.d.ts` missing tha). **Fixed**: `src/vite-env.d.ts` add kiya.

2. **Broken favicon** — `index.html` mein `<link rel="icon" href="/logo.png">` tha
   lekin `logo.png` file project mein exist hi nahi karti thi (sirf `logo.svg` aur
   `logo.svg.png` hain) — browser tab icon 404 tha. **Fixed**: ab `/logo.svg.png`
   point karta hai (jo actually exist karti hai).

3. **Missing Open Graph / Twitter tags** — jab link WhatsApp/Facebook pe share
   hota, koi preview title/image nahi aata tha, kyunki ye tags sirf JavaScript se
   (runtime pe) inject ho rahe the — WhatsApp/Facebook ke crawlers JS run nahi
   karte, isliye unhe kuch nahi dikhta tha. **Fixed**: static `og:title`,
   `og:description`, `og:image`, `twitter:card` tags `index.html` mein add kiye,
   plus runtime update bhi ab `og:title`/`og:description` ko admin panel ke SEO
   settings se sync karta hai.

## ⚠️ Cheezein jo maine fix NAHI ki (aapka input chahiye)

1. **Placeholder phone number** — `src/config/schoolData.ts` mein abhi bhi
   `+91 98765 43210` (dummy number) hai — WhatsApp inquiry button aur call button
   isi number pe jayenge. **Aapko real school number dena hoga**, main update kar dunga.

2. **Client-side-only SEO/rendering** — Site poori tarah JavaScript se render
   hoti hai (Vite SPA, single-file build). Iska matlab Google jaise search
   engines ko naya page abhi bhi properly index karne mein dikkat ho sakti hai
   jab tak Google JS render na kare (usually kar leta hai but slower + less
   reliable than server-rendered pages). Agar SEO priority hai, Next.js jaisa
   SSR framework consider karo future mein.

3. **Mock/local login system** — Email+password login abhi `src/erp/auth.ts`
   mein hardcoded demo accounts (`admin@gurukul.com` / `123456` etc.) se chalta
   hai — koi real backend/database nahi hai. Production ke liye ye replace
   karna hoga (Firebase Auth / your own backend), warna koi bhi jo code dekh
   le wo admin password jaan sakta hai.

## 🔵 Naya feature — Google Sign-In / Sign-Up

Login page (role select karne ke baad) mein ab **"Continue with Google"** button
add ho gaya hai. Lekin ye button tab tak kaam nahi karega jab tak aap apna
**Google Client ID** add nahi karte — yeh security ke liye zaroori hai
(Google verify karta hai ki request kaunsi website se aa rahi hai).

### Setup steps (5 minute kaam):
1. Jao: https://console.cloud.google.com/apis/credentials
2. **"Create Credentials" → "OAuth client ID"** choose karo
3. Application type: **"Web application"**
4. **"Authorized JavaScript origins"** mein add karo:
   - `https://gurukul-pathshala-offi.netlify.app` (ya aapka final custom domain)
   - `http://localhost:5173` (local testing ke liye)
5. Client ID copy karo (kuch aisa dikhega: `123456-abc.apps.googleusercontent.com`)
6. **Netlify dashboard** → aapki site → **Site settings → Environment variables**
   → naya variable add karo:
   - Key: `VITE_GOOGLE_CLIENT_ID`
   - Value: (jo Client ID copy kiya)
7. Site ko **redeploy** karo (Netlify → Deploys → Trigger deploy)
8. Ab login page pe Google button kaam karega ✅

Jab tak ye setup nahi hota, button ki jagah "Google Sign-In coming soon" dikhega
— app crash nahi hoga, silently disabled rahega.

**Note**: Abhi ke liye Google se sign-in karne wala user seedha login ho jata hai
(bina password/backend verification ke) — jaisa baaki demo login bhi hai. Jab
real backend banega, us JWT ko server pe verify karna zaroori hoga (code mein
`BACKEND TODO` comment likha hai exact jagah pe).
