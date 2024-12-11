import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useClerk, useUser } from "@clerk/clerk-expo";
import {format} from 'date-fns'

export default function ProfileScreen() {
  const router = useRouter();
  const {user} = useUser()
  const { signOut } = useClerk()

  const handleLogout = async () => {
    signOut({redirectUrl: '/'})
  }

  const menuItems = [
    {
      id: 1,
      title: "Logout",
      subtitle: "",
      icon: "log-out-outline",
      action: handleLogout
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="#555" />
        </TouchableOpacity>

      <View style={styles.profileCard}>
        <Image
          source={{ uri: user?.imageUrl || "https://picsum.photos/200/300" }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.fullName || 'Guest'}</Text>
          <Text style={styles.profileEmail}>{user?.emailAddresses[0].emailAddress || "no email"}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.action} style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Ionicons name={item.icon as any} size={24} color="#666" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            {item.id === 5 && (
              <Ionicons name="chevron-forward" size={24} color="#666" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    borderRadius: '50%',
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fff',
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    borderTopEndRadius: '100%',
    borderTopStartRadius: '100%',
    backgroundColor: Colors.light.tint,
    marginBottom: 16,
    height: 160,
    marginTop: 70
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 200,
    position: "absolute",
    top: -55,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  profileInfo: {
    flex: 1,
    marginTop: 60
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
    textAlign: 'center'
  },
  profileEmail: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
    textAlign: 'center'
  },
  menuContainer: {
    backgroundColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIconContainer: {
    width: 40,
    alignItems: "center",
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});
