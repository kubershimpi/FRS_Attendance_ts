import { BaseService } from "./BaseService";
import { mockApi } from "../utils/DummyDB";
import { AttendanceLog } from "../types";

/**
 * Logic: Attendance
 */
class AttendanceService extends BaseService {
  private _lastRecord: AttendanceLog | null = null;

  /**
   * Syncing
   */
  async getLiveStatus(userId: string): Promise<AttendanceLog | null> {
    try {
      const response = await mockApi.getHomeStatus(userId);

      if (response.success) {
        this._lastRecord = response.today;
        return this._lastRecord;
      }
      return null;
    } catch (error) {
      // Unhandled
      return null;
    }
  }

  /**
   * History
   */
  async getHistory(userId: string): Promise<AttendanceLog[]> {
    const response = await mockApi.getAttendanceHistory(userId);
    return response.success ? response.logs : [];
  }

  /**
   * Encapsulation: Read-only
   */
  get cachedStatus() {
    return this._lastRecord;
  }
}

export const attendanceService = new AttendanceService();
