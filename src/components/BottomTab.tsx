import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface Props {
  activeTab: "Home" | "History";
  navigation: any;
}

/**
 * UI: Navigation
 */
export const BottomTab: React.FC<Props> = ({ activeTab, navigation }) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons
          name={activeTab === "Home" ? "home" : "home-outline"}
          size={24}
          color={activeTab === "Home" ? "#0044CC" : "#64748B"}
        />
        <Text style={[styles.label, activeTab === "Home" && styles.active]}>
          Home
        </Text>
        {activeTab === "Home" && <View style={styles.indicator} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("History")}
      >
        <Ionicons
          name={activeTab === "History" ? "time" : "time-outline"}
          size={24}
          color={activeTab === "History" ? "#0044CC" : "#64748B"}
        />
        <Text style={[styles.label, activeTab === "History" && styles.active]}>
          History
        </Text>
        {activeTab === "History" && <View style={styles.indicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    width: width,
    flexDirection: "row",
    backgroundColor: "white",
    height: 80,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  item: { flex: 1, alignItems: "center", justifyContent: "center" },
  label: { fontSize: 11, color: "#64748B", marginTop: 4, fontWeight: "500" },
  active: { color: "#0044CC", fontWeight: "700" },
  indicator: {
    position: "absolute",
    top: 0,
    width: 40,
    height: 3,
    backgroundColor: "#0044CC",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
