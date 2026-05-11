// src/types/index.ts

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  location: string;
}

export interface AttendanceLog {
  date: string;
  dayName: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
}

export interface HomeStatusResponse {
  success: boolean;
  employee: UserProfile;
  today: AttendanceLog;
}
