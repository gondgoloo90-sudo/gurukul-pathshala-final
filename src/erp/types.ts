export type UserRole = 'admin' | 'teacher' | 'student';

export type ErpPage =
  | 'dashboard'
  | 'students'
  | 'admission'
  | 'promote'
  | 'teachers'
  | 'attendance'
  | 'fees'
  | 'examination'
  | 'library'
  | 'transport'
  | 'notices'
  | 'documents'
  | 'settings'
  | 'classes'
  | 'homework'
  | 'marks'
  | 'messages'
  | 'calendar'
  | 'result'
  | 'profile';

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  icon: string;
}

export interface ActivityItem {
  title: string;
  time: string;
  tone: 'red' | 'green' | 'blue' | 'amber' | 'purple';
}
