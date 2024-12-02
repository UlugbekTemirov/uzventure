import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const CustomHeader = ({ title, onHamburgerPress, onProfilePress }: any) => {
  const route = useRoute();
  console.log("route", route.name)

  const isHome = route.name === "(tabs)";

  if (!isHome) {
    return null;
  }

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onHamburgerPress} style={styles.iconButton}>
        <Ionicons name="menu" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Logo</Text>
      </View>

      <TouchableOpacity onPress={onProfilePress} style={styles.iconButton}>
        <Ionicons name="person-circle-outline" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "transparent",
  },
  iconButton: {
    padding: 8,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default CustomHeader;
