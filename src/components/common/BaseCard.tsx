import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * UI: Container
 */
export const BaseCard: React.FC<Props> = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    marginVertical: 10,
    // Optimization: Elevation
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});
