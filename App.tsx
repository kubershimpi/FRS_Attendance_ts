import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types";

/**
 * Inheritance: Service Modules
 */
import { notificationService } from "./src/services/notificationService";

// Screens
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import OtpScreen from "./src/screens/OtpScreen";
import CreateNewPasswordScreen from "./src/screens/CreateNewPasswordScreen";
import SuccessScreen from "./src/screens/SuccessScreen";
import NotificationScreen from "./src/screens/NotificationScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Navigation: Infrastructure & Root Entry
 */
export default function App() {
  useEffect(() => {
    /**
     * Logic: Initialize System Notification Permissions
     * This ensures the app can push alerts to the Android Notification Shade.
     */
    const setupNotifications = async () => {
      const granted = await notificationService.requestPermissions();
      if (!granted) {
        console.log("System: Notification permissions are restricted.");
      }
    };

    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        {/* Group: Authentication Flow */}
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen
            name="CreateNewPassword"
            component={CreateNewPasswordScreen}
          />
          <Stack.Screen name="Success" component={SuccessScreen} />
        </Stack.Group>

        {/* Group: Core FRS Application */}
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />

          {/* Logic: New Feature Registration */}
          <Stack.Screen name="Notifications" component={NotificationScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
