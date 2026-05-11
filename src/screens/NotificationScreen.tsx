import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  notificationService,
  AppNotification,
} from "../services/notificationService";
import { Header } from "../components/Header";

/**
 * Screen: Notifications
 */
export default function NotificationScreen({ navigation }: any) {
  const [data, setData] = useState<AppNotification[]>([]);

  useEffect(() => {
    // Syncing: Fetch and Filter attendance-specific data
    notificationService.getNotifications().then((allNotifications) => {
      const attendanceOnly = allNotifications.filter(
        (item) => item.type === "attendance",
      );
      setData(attendanceOnly);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Notifications" onBack={() => navigation.goBack()} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState />}
      />
    </SafeAreaView>
  );
}

/**
 * Encapsulation: Row Item
 * Logic: Dynamically renders In-Time and Name from Service data
 */
const NotificationItem = ({ item }: { item: AppNotification }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.9}>
    {/* Header: System Branding */}
    <View style={styles.cardHeader}>
      <View style={styles.brandGroup}>
        <View style={styles.miniLogo}>
          <MaterialCommunityIcons
            name="face-recognition"
            size={14}
            color="white"
          />
        </View>
        <Text style={styles.brandText}>FRS ATTENDANCE</Text>
      </View>
      <Text style={styles.nowText}>{item.time}</Text>
    </View>

    {/* Body: Real-Time Data (IN Time & Name) */}
    <View style={styles.cardBody}>
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark-circle" size={40} color="#22C55E" />
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.alertTitle}>{item.title}</Text>

        {/* Logic: Only show IN Time if provided by backend */}
        {item.inTime && (
          <Text style={styles.dataRow}>
            IN Time: <Text style={styles.boldData}>{item.inTime}</Text>
          </Text>
        )}

        <Text style={styles.userName}>{item.userName || "User"}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const EmptyState = () => (
  <View style={styles.center}>
    <Ionicons name="notifications-off-outline" size={60} color="#CBD5E1" />
    <Text style={styles.emptyTxt}>No attendance alerts</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F1F5F9" },
  list: { padding: 14, paddingBottom: 40 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  brandGroup: { flexDirection: "row", alignItems: "center" },
  miniLogo: {
    backgroundColor: "#0044CC",
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  brandText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  nowText: { fontSize: 11, color: "#94A3B8" },
  cardBody: { flexDirection: "row", alignItems: "flex-start" },
  iconWrapper: { marginRight: 15 },
  textWrapper: { flex: 1 },
  alertTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 6,
  },
  // Style: The "IN Time: 09:12 AM" row
  dataRow: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 4,
  },
  boldData: {
    fontWeight: "600",
    color: "#1E293B",
  },
  userName: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
  },
  emptyTxt: { color: "#94A3B8", marginTop: 15, fontSize: 16 },
});
