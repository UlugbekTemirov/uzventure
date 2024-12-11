import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";

const CustomHeader = ({ title, onHamburgerPress, onProfilePress }: any) => {
  const route = useRoute();

  const isHome = route.name === "(tabs)";

  if (!isHome) {
    return null;
  }

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onHamburgerPress} style={styles.iconButton}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
          UZVENTURE
        </Text>
      </View>

      <TouchableOpacity onPress={onProfilePress} style={styles.iconButton}>
        <Ionicons name="person-circle-outline" size={28} color="#fff" />
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
    backgroundColor: Colors.light.tint,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
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
