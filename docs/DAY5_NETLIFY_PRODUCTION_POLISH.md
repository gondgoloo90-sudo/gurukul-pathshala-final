# Day 5 – Netlify Production Polish

## Added
- Netlify SPA redirects to prevent 404 on page refresh.
- `netlify.toml` build configuration.
- Basic PWA manifest and theme color.
- Robots file for crawler access.
- ERP Settings page now includes demo data Export Backup and Import Backup.

## How to deploy
1. Upload/push this Day 5 folder to GitHub.
2. Netlify build command: `npm run build`.
3. Netlify publish directory: `dist`.
4. After deploy, test Home, Login, Admin Dashboard, Settings, Export Backup.

## Why this matters
The website is now safer for demo and testing. If demo data changes during testing, you can export a backup and restore it later.
