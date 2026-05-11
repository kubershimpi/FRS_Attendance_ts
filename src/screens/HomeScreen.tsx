import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { UserProfile } from "../types";

/**
 * Inheritance
 */
import { Header } from "../components/Header";
import { BottomTab } from "../components/BottomTab";
import { BaseCard } from "../components/common/BaseCard";
import { useAttendance } from "../hooks/useAttendance";

type RootStackParamList = {
  Home: { userId: string };
  History: { userId: string };
  Profile: { userId: string; userData: UserProfile };
  Notifications: undefined;
};

interface Props {
  route: RouteProp<RootStackParamList, "Home">;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
}

/**
 * Screen: Home
 */
export default function HomeScreen({ route, navigation }: Props) {
  const userId = route.params?.userId ?? "ramesh@mindbox.com";

  // Logic: Hook handles polling for FRS data
  const { data, loading } = useAttendance(userId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Attendance"
        onProfilePress={() =>
          navigation.navigate("Profile", { userId, userData: data?.employee })
        }
        // Logic: Redirect to Notification Screen
        onNotificationPress={() => navigation.navigate("Notifications")}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <BaseCard style={styles.card}>
          <View style={styles.biometric}>
            <MaterialCommunityIcons
              name="face-recognition"
              size={60}
              color="#0044CC"
            />
            <View
              style={[
                styles.dot,
                { backgroundColor: data?.checkIn ? "#22C55E" : "#3B82F6" },
              ]}
            />
          </View>

          {loading ? (
            <ActivityIndicator
              size="small"
              color="#0044CC"
              style={styles.loader}
            />
          ) : (
            <StatusText checkedIn={!!data?.checkIn} />
          )}

          <View style={styles.divider} />

          <View style={styles.timeRow}>
            <TimeBox label="IN TIME" value={data?.checkIn} color="#22C55E" />
            <View style={styles.vDivider} />
            <TimeBox label="OUT TIME" value={data?.checkOut} color="#F97316" />
          </View>
        </BaseCard>
      </ScrollView>

      <BottomTab activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
}

/**
 * Encapsulation: UI Modules
 */
const StatusText = ({ checkedIn }: { checkedIn: boolean }) => (
  <>
    <Text style={styles.statusTitle}>
      {checkedIn ? "Identity Verified" : "Awaiting Recognition"}
    </Text>
    <Text style={styles.statusSubtitle}>
      {checkedIn
        ? "Your attendance is recorded."
        : "System standby for FRS detection."}
    </Text>
  </>
);

const TimeBox = ({ label, value, color }: any) => (
  <View style={styles.timeBox}>
    <Text style={styles.timeLabel}>{label}</Text>
    <View style={[styles.iconCircle, { backgroundColor: color + "10" }]}>
      <Ionicons name="time-outline" size={24} color={color} />
    </View>
    <Text style={styles.timeValue}>{value ?? "--:--"}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 20 },
  card: { alignItems: "center", padding: 30 },
  biometric: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 3,
    borderColor: "white",
  },
  loader: { marginVertical: 10 },
  statusTitle: { fontSize: 20, fontWeight: "800", color: "#1E293B" },
  statusSubtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 30,
  },
  timeRow: { flexDirection: "row", width: "100%" },
  timeBox: { flex: 1, alignItems: "center" },
  timeLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  timeValue: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  vDivider: { width: 1, backgroundColor: "#F1F5F9" },
});
