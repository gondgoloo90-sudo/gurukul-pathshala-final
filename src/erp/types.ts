export type UserRole = 'admin' | 'teacher' | 'student';

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
