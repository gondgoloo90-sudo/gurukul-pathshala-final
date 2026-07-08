export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export type ErpPage =
  | 'dashboard'
  | 'students'
  | 'admission'
  | 'promote'
  | 'teachers'
  | 'staff'
  | 'attendance'
  | 'fees'
  | 'scholarships'
  | 'examination'
  | 'library'
  | 'transport'
  | 'notices'
  | 'documents'
  | 'settings'
  | 'classes'
  | 'class-section'
  | 'subjects'
  | 'timetable'
  | 'homework'
  | 'marks'
  | 'messages'
  | 'calendar'
  | 'result'
  | 'profile'
  | 'parent-child'
  | 'ai-call-center'
  | 'website-settings';

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
