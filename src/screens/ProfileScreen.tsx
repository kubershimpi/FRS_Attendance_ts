import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { UserProfile } from "../types";
import { authService } from "../services/authService";

/**
 * Inheritance
 */
import { Header } from "../components/Header";
import { BottomTab } from "../components/BottomTab";
import { BaseCard } from "../components/common/BaseCard";

type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Login: undefined;
  Profile: { userData: UserProfile };
  Notifications: undefined;
};

interface Props {
  route: RouteProp<RootStackParamList, "Profile">;
  navigation: StackNavigationProp<RootStackParamList, "Profile">;
}

/**
 * Screen: Profile
 */
export default function ProfileScreen({ route, navigation }: Props) {
  const userData = route.params?.userData;

  // Cleanup: Handle Logout Persistence
  const handleLogout = async () => {
    await authService.logout();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Profile"
        onBack={() => navigation.navigate("Home")}
        // Logic: Redirect to Notifications from Profile
        onNotificationPress={() => navigation.navigate("Notifications")}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <BaseCard style={styles.card}>
          <Avatar />
          <Text style={styles.name}>{userData?.name}</Text>
          <View style={styles.line} />

          <View style={styles.list}>
            <InfoRow icon="mail-outline" label="Email" val={userData?.email} />
            <InfoRow icon="call-outline" label="Phone" val={userData?.phone} />
            <InfoRow
              icon="business-outline"
              label="Dept"
              val={userData?.department}
            />
            <InfoRow
              icon="briefcase-outline"
              label="Role"
              val={userData?.designation}
            />
            <InfoRow
              icon="location-outline"
              label="Loc"
              val={userData?.location}
              isLast
            />
          </View>
        </BaseCard>

        <LogoutBtn onPress={handleLogout} />
      </ScrollView>

      <BottomTab activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
}

/**
 * Encapsulation: Modular UI Components
 */
const Avatar = () => (
  <View style={styles.avatarBox}>
    <View style={styles.avatar}>
      <Ionicons name="person" size={50} color="#0044CC" />
    </View>
  </View>
);

const InfoRow = ({ icon, label, val, isLast }: any) => (
  <View style={[styles.row, !isLast && styles.border]}>
    <View style={styles.labelGroup}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color="#0044CC" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.val} numberOfLines={1}>
      {val}
    </Text>
  </View>
);

const LogoutBtn = ({ onPress }: any) => (
  <TouchableOpacity style={styles.logout} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.labelGroup}>
      <Ionicons name="log-out-outline" size={22} color="#E53935" />
      <Text style={styles.logoutTxt}>Logout</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 20, paddingBottom: 100 },
  card: { padding: 20 },
  avatarBox: { alignItems: "center", marginTop: 10 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  line: { height: 1, backgroundColor: "#F1F5F9", marginBottom: 10 },
  list: { width: "100%" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  border: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  labelGroup: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    backgroundColor: "#EEF4FF",
    padding: 6,
    borderRadius: 6,
    marginRight: 10,
  },
  label: { fontSize: 13, color: "#64748B", fontWeight: "500" },
  val: {
    fontSize: 13,
    color: "#0044CC",
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
    marginLeft: 10,
  },
  logout: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutTxt: {
    marginLeft: 10,
    color: "#E53935",
    fontSize: 15,
    fontWeight: "700",
  },
});
