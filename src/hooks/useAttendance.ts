import { useState, useEffect, useCallback } from "react";
import { attendanceService } from "../services/attendanceService";
import { AttendanceLog } from "../types";

/**
 * Hook: Logic
 */
export const useAttendance = (userId: string) => {
  const [data, setData] = useState<AttendanceLog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Syncing
   */
  const fetchStatus = useCallback(async () => {
    const response = await attendanceService.getLiveStatus(userId);
    setData(response);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchStatus();

    /**
     * Polling
     */
    const interval = setInterval(fetchStatus, 5000);

    /**
     * Unload
     */
    return () => {
      clearInterval(interval);
    };
  }, [fetchStatus]);

  return { data, loading, refetch: fetchStatus };
};
