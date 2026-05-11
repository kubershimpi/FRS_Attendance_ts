import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { BaseService } from "./BaseService";

/**
 * Interface: Infrastructure for Alerts
 */
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: "attendance" | "system" | "alert";

  // Real-time metadata for system center display
  inTime?: string;
  userName?: string;
}

/**
 * Configuration: Notification Behavior
 * Ensures alerts show up even when the app is open.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService extends BaseService {
  /**
   * Logic: System Permissions & Channels
   * Required to show notifications in the Android/iOS center.
   */
  async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") return false;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("frs-alerts", {
        name: "Attendance Alerts",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#0044CC",
      });
    }
    return true;
  }

  /**
   * Logic: Trigger System Notification Center
   * This pushes the data to the phone's shade (Android Notification Center).
   */
  async triggerSystemNotification(notif: AppNotification) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "FRS ATTENDANCE",
        // Formats message exactly like your reference image
        body: `Attendance Marked\nIN Time: ${notif.inTime}\n${notif.userName}`,
        data: { id: notif.id },
      },
      trigger: null, // Immediate
    });
  }

  /**
   * Logic: Data Retrieval (Mocked for Testing)
   */
  async getNotifications(): Promise<AppNotification[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "Attendance Marked",
            message: "Check-in Successful at Main Gate",
            time: "now",
            isRead: false,
            type: "attendance",
            inTime: "09:12 AM",
            userName: "Ramesh Kumar",
          },
          {
            id: "2",
            title: "Shift Reminder",
            message: "Your evening shift starts in 1 hour.",
            time: "1 hour ago",
            isRead: true,
            type: "system",
          },
        ]);
      }, 500);
    });
  }
}

export const notificationService = new NotificationService();
