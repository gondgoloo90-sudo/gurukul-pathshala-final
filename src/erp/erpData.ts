import type { ActivityItem, DashboardStat, UserRole } from './types';

export const roleLabels: Record<UserRole, string> = {
  admin: 'Admin',
  teacher: 'Teacher',
  student: 'Student',
  parent: 'Parent',
};

export const roleSubtitles: Record<UserRole, string> = {
  admin: 'Complete School Control Center',
  teacher: 'Teaching, Attendance & Class Work',
  student: 'Learning, Homework & Progress',
  parent: "Your Child's Progress, Fees & Notices",
};

export const dashboardStats: Record<UserRole, DashboardStat[]> = {
  admin: [
    { label: 'Total Students', value: '842', change: '+12 this month', icon: '🎓' },
    { label: 'Teachers', value: '42', change: '4 departments', icon: '👩‍🏫' },
    { label: 'Fee Collection', value: '₹8.4L', change: '82% collected', icon: '💳' },
    { label: 'Attendance', value: '94%', change: '+3% today', icon: '✅' },
    { label: 'Parents', value: '690', change: '91% connected', icon: '👨‍👩‍👧' },
    { label: 'Classes', value: '18', change: 'Nursery to 8', icon: '🏫' },
    { label: 'Pending Fees', value: '₹1.8L', change: 'Need follow-up', icon: '⏳' },
    { label: 'Notices', value: '12', change: '3 urgent', icon: '📢' },
  ],
  teacher: [
    { label: 'My Classes', value: '6', change: 'Today schedule', icon: '📚' },
    { label: 'Students', value: '214', change: 'Across sections', icon: '🎓' },
    { label: 'Homework', value: '18', change: 'Submissions pending', icon: '📝' },
    { label: 'Attendance', value: '96%', change: 'Marked today', icon: '✅' },
    { label: 'Messages', value: '9', change: '4 parent replies', icon: '💬' },
    { label: 'Tests', value: '3', change: 'This week', icon: '🧪' },
    { label: 'Lesson Plan', value: '88%', change: 'Completed', icon: '📌' },
    { label: 'Doubts', value: '24', change: 'Resolved today', icon: '❓' },
  ],
  student: [
    { label: 'Attendance', value: '92%', change: 'Good standing', icon: '✅' },
    { label: 'Assignments', value: '7', change: '2 due soon', icon: '📘' },
    { label: 'Average Score', value: '88%', change: '+5% improved', icon: '🏆' },
    { label: 'Fee Status', value: 'Paid', change: 'No dues', icon: '💳' },
    { label: 'Live Classes', value: '4', change: 'Today', icon: '🎥' },
    { label: 'Library', value: '2', change: 'Books issued', icon: '📚' },
    { label: 'Rank', value: '#8', change: 'Class 7-A', icon: '🥇' },
    { label: 'Notices', value: '5', change: 'Read all', icon: '📢' },
  ],
  parent: [
    { label: "Child's Attendance", value: '92%', change: 'Good standing', icon: '✅' },
    { label: 'Pending Homework', value: '2', change: 'Due this week', icon: '📘' },
    { label: 'Latest Score', value: '88%', change: 'Unit Test 1', icon: '🏆' },
    { label: 'Fee Status', value: 'Check', change: 'View details', icon: '💳' },
    { label: 'Messages', value: '3', change: 'From school', icon: '💬' },
    { label: 'Upcoming Events', value: '2', change: 'This month', icon: '🗓️' },
    { label: 'Notices', value: '5', change: 'Unread', icon: '📢' },
    { label: 'Class', value: 'Class 8-A', change: 'Current section', icon: '🏫' },
  ],
};

export const activities: Record<UserRole, ActivityItem[]> = {
  admin: [
    { title: 'New admission inquiry received', time: '10:20 AM', tone: 'red' },
    { title: 'Class 5 fee report generated', time: '10:45 AM', tone: 'green' },
    { title: 'Teacher meeting scheduled', time: '11:15 AM', tone: 'blue' },
    { title: 'Transport route updated', time: '12:30 PM', tone: 'amber' },
  ],
  teacher: [
    { title: 'Class 7-A attendance completed', time: '09:15 AM', tone: 'green' },
    { title: 'Math homework assigned', time: '10:40 AM', tone: 'blue' },
    { title: 'Parent message needs reply', time: '11:00 AM', tone: 'amber' },
    { title: 'Weekly test marks pending', time: 'Today', tone: 'red' },
  ],
  student: [
    { title: 'Science homework submitted', time: '08:20 AM', tone: 'green' },
    { title: 'Math test on Friday', time: 'Today', tone: 'red' },
    { title: 'Library book return reminder', time: 'Tomorrow', tone: 'amber' },
    { title: 'Sports practice at 4 PM', time: 'Today', tone: 'blue' },
  ],
  parent: [
    { title: "Child's attendance marked Present", time: '09:10 AM', tone: 'green' },
    { title: 'New homework assigned in Math', time: '10:40 AM', tone: 'blue' },
    { title: 'Fee due reminder for this month', time: 'Today', tone: 'amber' },
    { title: 'Parent Teacher Meeting scheduled', time: 'This week', tone: 'red' },
  ],
};

export const quickActions: Record<UserRole, string[]> = {
  admin: ['Add Student', 'Collect Fee', 'Take Attendance', 'Create Notice', 'Add Teacher', 'Generate Report'],
  teacher: ['Mark Attendance', 'Add Homework', 'Enter Marks', 'Message Parents', 'Create Test', 'Share Notes'],
  student: ['View Homework', 'Download Result', 'Pay Fees', 'Ask Teacher', 'View Timetable', 'Library Card'],
  parent: ['View Attendance', 'View Homework', 'Pay Fees', 'Message Teacher', 'View Timetable', 'View Report Card'],
};

export const chartBars: Record<UserRole, { label: string; value: number }[]> = {
  admin: [
    { label: 'Mon', value: 72 }, { label: 'Tue', value: 88 }, { label: 'Wed', value: 64 }, { label: 'Thu', value: 92 }, { label: 'Fri', value: 78 }, { label: 'Sat', value: 84 },
  ],
  teacher: [
    { label: 'Mon', value: 82 }, { label: 'Tue', value: 76 }, { label: 'Wed', value: 90 }, { label: 'Thu', value: 68 }, { label: 'Fri', value: 86 }, { label: 'Sat', value: 74 },
  ],
  student: [
    { label: 'Mon', value: 60 }, { label: 'Tue', value: 80 }, { label: 'Wed', value: 76 }, { label: 'Thu', value: 92 }, { label: 'Fri', value: 70 }, { label: 'Sat', value: 88 },
  ],
  parent: [
    { label: 'Mon', value: 68 }, { label: 'Tue', value: 84 }, { label: 'Wed', value: 72 }, { label: 'Thu', value: 90 }, { label: 'Fri', value: 76 }, { label: 'Sat', value: 82 },
  ],
};

export const noticesByRole: Record<UserRole, string[]> = {
  admin: ['Admission campaign review at 3 PM', 'Pending fee follow-up list ready', 'New dashboard modules planned for Day 2'],
  teacher: ['Submit weekly lesson plan today', 'Parent meeting tomorrow', 'Class 8 science practical schedule updated'],
  student: ['Math test on Friday', 'Bring project file tomorrow', 'Sports practice at 4 PM'],
  parent: ['Parent Teacher Meeting this week', 'Fee due reminder for this month', "Check child's latest homework"],
};
