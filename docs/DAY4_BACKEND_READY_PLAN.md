# Gurukul Pathshala ERP – Day 4 Backend Ready Plan

## Completed in Day 4

- Added `src/services/api.ts` service layer.
- Added `src/lib/validators.ts` validation helpers.
- Added login session persistence so refresh does not immediately logout.
- Added build verification for production.
- Prepared frontend so Firebase/Supabase/Express API can be connected later.

## Recommended Next Backend Options

### Option 1: Firebase
Best for quick launch, authentication, database, hosting and simple admin panel.

### Option 2: Supabase
Best for SQL database, role-based data and future reports.

### Option 3: Node.js + Express + MongoDB/PostgreSQL
Best for full custom SaaS product.

## Environment Variable

Create `.env` when real backend is ready:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

Till then the app runs safely in `local-demo` mode.

## Day 5 Target

- Real authentication schema
- Student admission validations
- Export reports as PDF/Excel
- Netlify deployment check
