import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Service: Storage
 */
class StorageService {
  // Encapsulation: Private keys
  private readonly USER_KEY = "@user_id";
  private readonly TOKEN_KEY = "@auth_token";
  private readonly PASS_KEY = "@user_password";

  /**
   * Persistence: Save Session
   */
  async saveSession(email: string, token: string): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        [this.USER_KEY, email.toLowerCase().trim()],
        [this.TOKEN_KEY, token],
      ]);
    } catch (error) {
      console.error("Storage Save Failure:", error);
      throw error;
    }
  }

  /**
   * Logic: Sync Password
   */
  async updateLocalPass(newPass: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.PASS_KEY, newPass);
    } catch (error) {
      console.error("Storage Update Failure:", error);
      throw error;
    }
  }

  /**
   * Logic: Retrieve
   */
  async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Cleanup
   */
  async clearAuth(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.USER_KEY,
        this.TOKEN_KEY,
        this.PASS_KEY,
      ]);
    } catch (error) {
      await AsyncStorage.clear();
    }
  }
}

export const storageService = new StorageService();
