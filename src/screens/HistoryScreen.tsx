import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { AttendanceLog } from "../types";

/**
 * Inheritance
 */
import { attendanceService } from "../services/attendanceService";
import { Header } from "../components/Header";
import { BottomTab } from "../components/BottomTab";
import { BaseCard } from "../components/common/BaseCard";

type RootStackParamList = {
  History: { userId: string };
  Home: { userId: string };
  Profile: { userId: string };
  Notifications: undefined;
};

interface Props {
  route: RouteProp<RootStackParamList, "History">;
  navigation: StackNavigationProp<RootStackParamList, "History">;
}

/**
 * Screen: History
 */
export default function HistoryScreen({ route, navigation }: Props) {
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = route.params?.userId || "ramesh@mindbox.com";

  useEffect(() => {
    attendanceService
      .getHistory(userId)
      .then(setLogs)
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Attendance History"
        onProfilePress={() => navigation.navigate("Profile", { userId })}
        onNotificationPress={() => navigation.navigate("Notifications")}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0044CC" />
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.date}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <LogCard item={item} />}
          ListEmptyComponent={<EmptyState />}
        />
      )}

      <BottomTab activeTab="History" navigation={navigation} />
    </SafeAreaView>
  );
}

/**
 * Encapsulation: Modular Card
 */
const LogCard = ({ item }: { item: AttendanceLog }) => {
  const today = moment().format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");

  let day = item.dayName.toUpperCase();
  if (item.date === today) day = "TODAY";
  else if (item.date === yesterday) day = "YESTERDAY";

  return (
    <BaseCard style={styles.cardSpacing}>
      <View style={styles.row}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.date}>
          {moment(item.date).format("DD MMM YYYY")}
        </Text>
      </View>

      <View style={styles.line} />

      <View style={styles.timesContainer}>
        <Time label="IN TIME" val={item.checkIn} color="#22C55E" />
        <View style={styles.vLine} />
        <Time label="OUT TIME" val={item.checkOut} color="#F97316" />
      </View>
    </BaseCard>
  );
};

// UI: Refactored for larger data display (Matches 2nd Image)
const Time = ({ label, val, color }: any) => (
  <View style={styles.box}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.iconCircle, { backgroundColor: color + "15" }]}>
      <Ionicons name="time-outline" size={26} color={color} />
    </View>
    <Text style={[styles.val, { color: val ? "#1E293B" : "#94A3B8" }]}>
      {val || "--:--"}
    </Text>
  </View>
);

const EmptyState = () => (
  <View style={styles.center}>
    <Ionicons name="document-text-outline" size={50} color="#cbd5e1" />
    <Text style={styles.empty}>No records found.</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  list: { padding: 20, paddingBottom: 120 },
  cardSpacing: { padding: 20, marginBottom: 15 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  day: { fontWeight: "900", color: "#0044CC", fontSize: 14 },
  date: { color: "#64748B", fontSize: 13, fontWeight: "500" },
  line: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 10 },
  timesContainer: { flexDirection: "row", marginTop: 10 },
  box: { flex: 1, alignItems: "center" },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 12,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  val: { fontSize: 20, fontWeight: "800", letterSpacing: 0.5 },
  vLine: {
    width: 1,
    backgroundColor: "#F1F5F9",
    height: "80%",
    alignSelf: "center",
  },
  empty: { color: "#94A3B8", marginTop: 10 },
});
