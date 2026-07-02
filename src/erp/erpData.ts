import type { ActivityItem, DashboardStat, UserRole } from './types';

export const roleLabels: Record<UserRole, string> = {
  admin: 'Admin',
  teacher: 'Teacher',
  student: 'Student',
};

export const dashboardStats: Record<UserRole, DashboardStat[]> = {
  admin: [
    { label: 'Total Students', value: '842', change: '+12 this month', icon: '🎓' },
    { label: 'Teachers', value: '42', change: '4 departments', icon: '👩‍🏫' },
    { label: 'Fee Collection', value: '₹8.4L', change: '82% collected', icon: '💳' },
    { label: 'Attendance', value: '94%', change: '+3% today', icon: '✅' },
  ],
  teacher: [
    { label: 'My Classes', value: '6', change: 'Today schedule', icon: '📚' },
    { label: 'Students', value: '214', change: 'Across sections', icon: '🎓' },
    { label: 'Homework', value: '18', change: 'Submissions pending', icon: '📝' },
    { label: 'Attendance', value: '96%', change: 'Marked today', icon: '✅' },
  ],
  student: [
    { label: 'Attendance', value: '92%', change: 'Good standing', icon: '✅' },
    { label: 'Assignments', value: '7', change: '2 due soon', icon: '📘' },
    { label: 'Average Score', value: '88%', change: '+5% improved', icon: '🏆' },
    { label: 'Fee Status', value: 'Paid', change: 'No dues', icon: '💳' },
  ],
};

export const activities: Record<UserRole, ActivityItem[]> = {
  admin: [
    { title: 'New admission inquiry received', time: '10 min ago', tone: 'red' },
    { title: 'Class 5 fee report generated', time: '30 min ago', tone: 'green' },
    { title: 'Teacher meeting scheduled', time: '1 hour ago', tone: 'blue' },
    { title: 'Transport route updated', time: 'Today', tone: 'amber' },
  ],
  teacher: [
    { title: 'Class 7-A attendance completed', time: '15 min ago', tone: 'green' },
    { title: 'Math homework assigned', time: '40 min ago', tone: 'blue' },
    { title: 'Parent message needs reply', time: '1 hour ago', tone: 'amber' },
    { title: 'Weekly test marks pending', time: 'Today', tone: 'red' },
  ],
  student: [
    { title: 'Science homework submitted', time: '20 min ago', tone: 'green' },
    { title: 'Math test on Friday', time: 'Today', tone: 'red' },
    { title: 'Library book return reminder', time: 'Tomorrow', tone: 'amber' },
    { title: 'Sports practice at 4 PM', time: 'Today', tone: 'blue' },
  ],
};

export const quickActions: Record<UserRole, string[]> = {
  admin: ['Add Student', 'Manage Fees', 'Notice Board', 'Reports'],
  teacher: ['Mark Attendance', 'Add Homework', 'Enter Marks', 'Message Parents'],
  student: ['View Homework', 'Download Result', 'Pay Fees', 'Ask Teacher'],
};
