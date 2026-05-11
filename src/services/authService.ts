import { BaseService } from "./BaseService";
import { storageService } from "./storageService";
import { updatePasswordInDB, UsersDatabase } from "../utils/DummyDB";

/**
 * Inheritance
 */
class AuthService extends BaseService {
  /**
   * Encapsulation
   */
  async login(email: string, pass: string): Promise<boolean> {
    const cleanId = email.toLowerCase().trim();
    const user = UsersDatabase[cleanId];

    if (user && user.password === pass) {
      await storageService.saveSession(cleanId, "mock_token_123");
      return true;
    }
    return false;
  }

  /**
   * Logic: Password Management
   */
  async resetPassword(uid: string, newPass: string): Promise<boolean> {
    const success = updatePasswordInDB(uid, newPass);
    if (success) {
      await storageService.updateLocalPass(newPass);
    }
    return success;
  }

  /**
   * Logic: Data Retrieval
   */
  getContactDetail(userId: string, method: "phone" | "email"): string {
    const user = UsersDatabase[userId.toLowerCase().trim()];
    if (!user) return "not registered";
    return method === "phone" ? user.profile.phone : user.profile.email;
  }

  /**
   * Logic: FRS User Identification
   */
  getUserEmail(userId: string): string {
    const user = UsersDatabase[userId.toLowerCase().trim()];
    return user?.profile?.email || "";
  }

  /**
   * Cleanup
   */
  async logout(): Promise<void> {
    await storageService.clearAuth();
  }
}

export const authService = new AuthService();
