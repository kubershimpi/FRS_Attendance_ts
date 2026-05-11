import moment from "moment";
import { UserProfile, AttendanceLog, HomeStatusResponse } from "../types/index";

// 1. THE STORAGE
export let UsersDatabase: Record<
  string,
  { password: string; profile: UserProfile }
> = {
  "ramesh@mindbox.com": {
    password: "password123",
    profile: {
      id: "MBX9012",
      name: "Ramesh Kumar",
      email: "ramesh@mindbox.com",
      phone: "+91 98765 43210",
      department: "IT Department",
      designation: "Software Engineer",
      location: "Bangalore, India",
    },
  },
};

const getDynamicLogs = (userId: string): AttendanceLog[] => {
  const today = moment().format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

  return [
    {
      date: today,
      dayName: moment().format("dddd"),
      checkIn: null,
      checkOut: null,
      status: "Waiting...",
    },
    {
      date: yesterday,
      dayName: moment().subtract(1, "days").format("dddd"),
      checkIn: null,
      checkOut: null,
      status: "No Record",
    },
  ];
};

// 2. THE API LAYER
export const mockApi = {
  getHomeStatus: (userId: string): Promise<HomeStatusResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanId = userId.toLowerCase().trim();
        const user = UsersDatabase[cleanId];
        const logs = getDynamicLogs(cleanId);
        resolve({
          success: true,
          employee: user.profile,
          today: logs[0],
        });
      }, 400);
    });
  },
  getAttendanceHistory: (
    userId: string,
  ): Promise<{ success: boolean; logs: AttendanceLog[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanId = userId.toLowerCase().trim();
        resolve({
          success: true,
          logs: getDynamicLogs(cleanId),
        });
      }, 400);
    });
  },
};

// 3. THE UPDATE FUNCTION (Named Export)
export const updatePasswordInDB = (
  userId: string,
  newPassword: string,
): boolean => {
  const cleanId = userId.toLowerCase().trim();
  if (UsersDatabase[cleanId]) {
    UsersDatabase[cleanId].password = newPassword;
    console.log(`[DB] Password updated for ${cleanId}: ${newPassword}`);
    return true;
  }
  return false;
};
