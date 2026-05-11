import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  onProfilePress?: () => void;
  onNotificationPress?: () => void; // Logic: Added for redirection
  onBack?: () => void; // Logic: Added for sub-screens
  rightElement?: React.ReactNode; // Encapsulation: Allows custom icons
}

/**
 * UI: Header
 * Inheritance: Shared layout for all core screens
 */
export const Header: React.FC<Props> = ({
  title,
  onProfilePress,
  onNotificationPress,
  onBack,
  rightElement,
}) => (
  <View style={styles.container}>
    {/* Left Section */}
    <View style={styles.sideSection}>
      {onBack ? (
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onProfilePress}>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      )}
    </View>

    {/* Center Section */}
    <Text style={styles.title}>{title}</Text>

    {/* Right Section */}
    <View style={styles.sideSection}>
      {rightElement ? (
        rightElement
      ) : (
        <TouchableOpacity onPress={onNotificationPress} activeOpacity={0.7}>
          <View style={styles.dot} />
          <Ionicons name="notifications-outline" size={28} color="white" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0044CC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  sideSection: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  dot: {
    position: "absolute",
    top: 2,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: "#0044CC",
    zIndex: 1,
  },
});
