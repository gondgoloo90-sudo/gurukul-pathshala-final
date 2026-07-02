export const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const required = (value: string) => value.trim().length > 0;

export const createStudentId = (count: number) => `GPS${String(count + 1).padStart(3, '0')}`;
