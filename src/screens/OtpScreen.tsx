import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { authService } from "../services/authService";

type RootStackParamList = {
  Otp: { method: "phone" | "email"; userId: string };
  CreateNewPassword: { userId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Otp">;

export default function OtpScreen({ route, navigation }: Props) {
  const method = route.params?.method ?? "phone";
  const userId = route.params?.userId ?? "";

  // Encapsulation
  const contact = authService.getContactDetail(userId, method);

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const refs = useRef<(TextInput | null)[]>([]);

  // Cleanup
  useEffect(() => {
    if (timer <= 0) return;
    const itv = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(itv);
  }, [timer]);

  // Logic
  const handleType = (txt: string, idx: number) => {
    const next = [...otp];
    next[idx] = txt;
    setOtp(next);
    if (txt && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleVerify = () => {
    navigation.navigate("CreateNewPassword", { userId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <Header onBack={() => navigation.goBack()} />

        <Branding contact={contact} onChange={() => navigation.goBack()} />

        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <OtpInput
              key={i}
              val={digit}
              onRef={(r: any) => (refs.current[i] = r)}
              onChange={(txt: any) => handleType(txt, i)}
              onDelete={(e: any) => {
                if (e.nativeEvent.key === "Backspace" && !otp[i] && i > 0)
                  refs.current[i - 1]?.focus();
              }}
            />
          ))}
        </View>

        <Timer val={timer} />

        <View style={{ flex: 1 }} />
        <PrimaryBtn label="Verify OTP" onPress={handleVerify} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Encapsulation: Components
const Header = ({ onBack }: any) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="chevron-back" size={28} />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Verification</Text>
    <View style={{ width: 28 }} />
  </View>
);

const Branding = ({ contact, onChange }: any) => (
  <View style={styles.center}>
    <View style={styles.circle}>
      <Ionicons name="chatbubble-ellipses" size={40} color="#0044CC" />
    </View>
    <Text style={styles.sub}>OTP sent to</Text>
    <Text style={styles.contact}>{contact}</Text>
    <TouchableOpacity onPress={onChange}>
      <Text style={styles.change}>Change?</Text>
    </TouchableOpacity>
  </View>
);

const OtpInput = ({ val, onRef, onChange, onDelete }: any) => (
  <TextInput
    ref={onRef}
    style={[styles.box, val && styles.boxActive]}
    keyboardType="number-pad"
    maxLength={1}
    value={val}
    onChangeText={onChange}
    onKeyPress={onDelete}
  />
);

const Timer = ({ val }: { val: number }) => (
  <View style={styles.center}>
    <Text style={styles.sub}>
      Resend in <Text style={styles.bold}>00:{val < 10 ? `0${val}` : val}</Text>
    </Text>
  </View>
);

const PrimaryBtn = ({ label, onPress }: any) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Text style={styles.btnTxt}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFBFF" },
  flex: { flex: 1, padding: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  center: { alignItems: "center", marginBottom: 30 },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  sub: { fontSize: 15, color: "#64748b" },
  contact: {
    fontSize: 18,
    color: "#0044CC",
    fontWeight: "bold",
    marginVertical: 5,
  },
  change: { fontSize: 14, color: "#0044CC", fontWeight: "600" },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  box: {
    width: 45,
    height: 55,
    borderWidth: 1.5,
    borderColor: "#93A3D8",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  boxActive: { borderColor: "#0044CC", backgroundColor: "#F4F7FF" },
  bold: { color: "#0044CC", fontWeight: "700" },
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
