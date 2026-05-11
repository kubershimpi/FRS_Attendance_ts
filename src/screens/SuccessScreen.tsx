import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Success: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Success">;

export default function SuccessScreen({ navigation }: Props) {
  // Logic
  const handleBack = () => navigation.navigate("Login");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.flex}>
        <SuccessVisual icon="checkmark" />

        <Content
          title="Password Changed!"
          sub={`Your password has been changed successfully.\nUse your new password to log in.`}
        />

        <PrimaryBtn label="Back to Login" onPress={handleBack} />
      </View>
    </SafeAreaView>
  );
}

// Encapsulation
const SuccessVisual = ({ icon }: any) => (
  <View style={styles.center}>
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Ionicons name={icon} size={50} color="white" />
      </View>
    </View>
  </View>
);

const Content = ({ title, sub }: any) => (
  <View style={styles.textCenter}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subText}>{sub}</Text>
  </View>
);

const PrimaryBtn = ({ label, onPress }: any) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Text style={styles.btnTxt}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFBFF" },
  flex: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  center: { alignItems: "center", marginBottom: 40 },
  outer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#E6EDFF",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#0044CC",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  textCenter: { alignItems: "center", marginBottom: 50 },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 12,
  },
  subText: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
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
