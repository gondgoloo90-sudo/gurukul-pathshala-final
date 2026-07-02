# CHANGELOG - Day 1 UI

## Added
- Separate ERP/Login system without removing the existing public school website.
- Premium Login Page with Admin, Teacher and Student role selection.
- Admin Dashboard, Teacher Dashboard and Student Dashboard using reusable data.
- Dashboard Sidebar with role-based menus.
- Top Header with profile area, mobile menu and dark mode toggle.
- Responsive dashboard layout for desktop, tablet and mobile.
- Modern UI cards, quick actions, activity feed and placeholder sections for Day 2 features.

## Modified
- `src/App.tsx`
  - Added ERP view switch.
  - Added ERP Login button in desktop and mobile header.
  - Kept public homepage sections safe and unchanged.
  - Updated logo path to `/logo.svg.png` where required.

## Created
- `src/erp/ErpApp.tsx`
- `src/erp/LoginPage.tsx`
- `src/erp/DashboardShell.tsx`
- `src/erp/DashboardHome.tsx`
- `src/erp/erpData.ts`
- `src/erp/types.ts`

## Test
- `npm install` completed successfully.
- `npm run build` completed successfully with no TypeScript/build errors.

## How to use
- Open public website normally.
- Click `ERP Login` in the header.
- Select Admin, Teacher or Student.
- Click login to open the matching dashboard.
