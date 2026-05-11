import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { authService } from "../services/authService";

type RootStackParamList = {
  ForgotPassword: { userId: string };
  Otp: { method: "email"; userId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ route, navigation }: Props) {
  const userId = route.params?.userId?.toLowerCase().trim() ?? "";

  // Encapsulation
  const userEmail = authService.getUserEmail(userId);

  // Logic
  const handleSendOTP = () => {
    navigation.navigate("Otp", { method: "email", userId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header onBack={() => navigation.goBack()} title="Reset Password" />

        <Branding
          icon="lock-closed"
          subtitle={`OTP will be sent to your\nregistered email address`}
        />

        <OptionCard value={userEmail} label="Send OTP to Email" icon="mail" />

        <View style={{ flex: 1 }} />

        <PrimaryBtn label="Send OTP" onPress={handleSendOTP} />
      </View>
    </SafeAreaView>
  );
}

// Encapsulation: Components
const Header = ({ onBack, title }: any) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="chevron-back" size={28} color="#1e293b" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={{ width: 38 }} />
  </View>
);

const Branding = ({ icon, subtitle }: any) => (
  <View style={styles.iconSection}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={45} color="#0044CC" />
    </View>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const OptionCard = ({ value, label, icon }: any) => (
  <View style={styles.optionCard}>
    <View style={styles.iconBox}>
      <Ionicons name={icon} size={24} color="#0044CC" />
    </View>
    <View>
      <Text style={styles.optionValue}>{value || "No email found"}</Text>
      <Text style={styles.optionLabel}>{label}</Text>
    </View>
  </View>
);

const PrimaryBtn = ({ label, onPress }: any) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Text style={styles.btnTxt}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFBFF" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#1e293b" },
  iconSection: { alignItems: "center", marginBottom: 40 },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7FF",
    borderWidth: 1.5,
    borderColor: "#0044CC",
    borderRadius: 16,
    padding: 20,
  },
  iconBox: { marginRight: 16 },
  optionValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  optionLabel: { fontSize: 14, color: "#64748b" },
  btn: {
    backgroundColor: "#0044CC",
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  btnTxt: { color: "white", fontSize: 16, fontWeight: "700" },
});
