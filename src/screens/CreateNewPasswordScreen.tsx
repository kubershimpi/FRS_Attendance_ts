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
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { authService } from "../services/authService";
import { PasswordValidator } from "../utils/PasswordValidator";

type RootStackParamList = {
  CreateNewPassword: { userId: string };
  Success: undefined;
};

interface Props {
  route: RouteProp<RootStackParamList, "CreateNewPassword">;
  navigation: StackNavigationProp<RootStackParamList, "CreateNewPassword">;
}

/**
 * Screen: Security Credentials Update
 */
export default function CreateNewPasswordScreen({ route, navigation }: Props) {
  const userId = route.params?.userId ?? "";
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState({ new: true, conf: true });

  // Logic: Professional Validation Assessment
  const validation = PasswordValidator.validate(pass, confirm);

  // Persistence: Secure Transaction
  const handleReset = async () => {
    if (!validation.isValid) return;

    setLoading(true);
    try {
      // Encapsulation: Database and Local Storage Update logic
      const success = await authService.resetPassword(userId, pass);

      if (success) {
        navigation.navigate("Success");
      } else {
        Alert.alert(
          "Security Error",
          "Unable to update credentials at this time.",
        );
      }
    } catch (error) {
      console.error("Credential Update Failure:", error);
      Alert.alert(
        "Connection Error",
        "Please verify your network connectivity.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Header onBack={() => navigation.goBack()} title="Security" />

          <IconBrand title="New Password" icon="shield-checkmark" />

          <View style={styles.form}>
            <PasswordField
              val={pass}
              set={setPass}
              hide={secure.new}
              ph="New Password"
              toggle={() => setSecure({ ...secure, new: !secure.new })}
            />
            <PasswordField
              val={confirm}
              set={setConfirm}
              hide={secure.conf}
              ph="Confirm Password"
              toggle={() => setSecure({ ...secure, conf: !secure.conf })}
            />
          </View>

          {/* Logic: Professional Security Requirements */}
          <View style={styles.checklist}>
            <CheckItem
              label="Minimum 8 Characters"
              active={validation.minLengthRequirement}
            />
            <CheckItem
              label="Includes Numbers or Symbols"
              active={validation.complexityRequirement}
            />
            <CheckItem
              label="Identity Confirmation Match"
              active={validation.integrityMatch}
            />
          </View>

          <SubmitBtn
            active={validation.isValid && !loading}
            onPress={handleReset}
            label={loading ? "Updating..." : "Update Password"}
            isLoading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Encapsulation: UI Modules
const Header = ({ onBack, title }: any) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="chevron-back" size={28} color="#1E293B" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={{ width: 28 }} />
  </View>
);

const IconBrand = ({ title, icon }: any) => (
  <View style={styles.iconSection}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={45} color="#0044CC" />
    </View>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const PasswordField = ({ val, set, hide, toggle, ph }: any) => (
  <View style={styles.inputWrapper}>
    <TextInput
      style={styles.input}
      placeholder={ph}
      secureTextEntry={hide}
      value={val}
      onChangeText={set}
      autoCapitalize="none"
      placeholderTextColor="#94A3B8"
    />
    <TouchableOpacity onPress={toggle}>
      <Ionicons name={hide ? "eye" : "eye-off"} size={20} color="#64748b" />
    </TouchableOpacity>
  </View>
);

const CheckItem = ({ label, active }: any) => (
  <View style={styles.checkRow}>
    <Ionicons
      name="checkmark-circle"
      size={18}
      color={active ? "#22c55e" : "#cbd5e1"}
    />
    <Text style={[styles.checkTxt, active && { color: "#1e293b" }]}>
      {label}
    </Text>
  </View>
);

const SubmitBtn = ({ active, onPress, label, isLoading }: any) => (
  <TouchableOpacity
    style={[styles.btn, !active && styles.btnOff]}
    onPress={onPress}
    disabled={!active}
  >
    {isLoading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.btnTxt}>{label}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  flex: { flex: 1 },
  container: { padding: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#1E293B" },
  iconSection: { alignItems: "center", marginBottom: 30 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "800", color: "#1E293B", marginTop: 15 },
  form: { marginBottom: 25 },
  // UI: Box-style inputs for professional look
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    height: 60,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: { flex: 1, fontSize: 16, color: "#1E293B" },
  checklist: { marginBottom: 40 },
  checkRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  checkTxt: {
    marginLeft: 12,
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
  },
  btn: {
    backgroundColor: "#0044CC",
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  btnOff: { backgroundColor: "#93A3D8", elevation: 0 },
  btnTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
