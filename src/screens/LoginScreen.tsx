import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { authService } from "../services/authService";

type RootStackParamList = {
  Login: undefined;
  Home: { userId: string };
  ForgotPassword: { userId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hide, setHide] = useState(true);

  // Logic: Secure Authentication Flow
  const handleLogin = async () => {
    const cleanEmail = email.toLowerCase().trim();

    if (!cleanEmail || !pass) {
      Alert.alert("Required", "Please enter both ID and Password.");
      return;
    }

    const success = await authService.login(cleanEmail, pass);

    if (success) {
      navigation.navigate("Home", { userId: cleanEmail });
    } else {
      Alert.alert("Auth Error", "Invalid credentials. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <Branding title="FRS ATTENDANCE" subtitle="Welcome back!" />

        <View style={styles.form}>
          <InputField
            val={email}
            set={setEmail}
            icon="person-outline"
            ph="Email"
            kb="email-address"
          />

          <InputField
            val={pass}
            set={setPass}
            icon="lock-closed-outline"
            ph="Password"
            secure={hide}
            toggle={() => setHide(!hide)}
          />

          <TouchableOpacity
            style={styles.forgot}
            onPress={() =>
              email
                ? navigation.navigate("ForgotPassword", { userId: email })
                : Alert.alert("Identification", "Enter your email to reset.")
            }
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <SubmitBtn label="Login" onPress={handleLogin} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/**
 * Encapsulation: Modular UI Components
 */
const Branding = ({ title, subtitle }: any) => (
  <View style={styles.center}>
    <View style={styles.logo}>
      <MaterialCommunityIcons name="face-recognition" size={45} color="white" />
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const InputField = ({ val, set, icon, ph, secure, toggle, kb }: any) => (
  <View style={styles.inputBox}>
    <Ionicons name={icon} size={20} color="#64748B" style={styles.icon} />
    <TextInput
      style={styles.input}
      value={val}
      onChangeText={set}
      placeholder={ph}
      secureTextEntry={secure}
      keyboardType={kb || "default"}
      autoCapitalize="none"
      placeholderTextColor="#94A3B8"
    />
    {toggle && (
      <TouchableOpacity onPress={toggle}>
        <Ionicons
          name={secure ? "eye-outline" : "eye-off-outline"}
          size={20}
          color="#64748B"
        />
      </TouchableOpacity>
    )}
  </View>
);

const SubmitBtn = ({ label, onPress }: any) => (
  <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.8}>
    <Text style={styles.btnTxt}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  flex: { flex: 1, justifyContent: "center", paddingHorizontal: 30 },
  center: { alignItems: "center", marginBottom: 50 },
  logo: {
    width: 85,
    height: 85,
    backgroundColor: "#0044CC",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 8,
    shadowColor: "#0044CC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0044CC",
    letterSpacing: 0.5,
  },
  subtitle: { fontSize: 16, color: "#64748B", marginTop: 5 },
  form: { width: "100%" },
  // Updated Style: Box Look
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC", // Light gray background
    borderWidth: 1,
    borderColor: "#E2E8F0", // Full border color
    borderRadius: 12, // Rounded corners
    height: 60,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  icon: { marginRight: 15 },
  input: { flex: 1, fontSize: 16, color: "#1E293B" },
  forgot: { alignSelf: "flex-end", marginBottom: 35 },
  forgotText: { color: "#0044CC", fontSize: 14, fontWeight: "700" },
  btn: {
    backgroundColor: "#0044CC",
    borderRadius: 12,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  btnTxt: { color: "white", fontSize: 18, fontWeight: "800" },
});
