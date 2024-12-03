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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  console.log(user)
  
  const fetchUser = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.warn("User data not found in Firestore.");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchUser();
    };
    initialize();
  }, []);


  const menuItems = [
    // {
    //   id: 1,
    //   title: "Profile Details",
    //   subtitle: "Manage your profile details",
    //   icon: "person-outline",
    //   route: "ProfileDetails",
    // },
    // {
    //   id: 2,
    //   title: "Add Nominee",
    //   subtitle:
    //     "Add a third person of your account in case of unexpected event",
    //   icon: "people-outline",
    //   route: "AddNominee",
    // },
    // {
    //   id: 3,
    //   title: "Bank Account",
    //   subtitle: "Manage all your linked and save bank account",
    //   icon: "business-outline",
    //   route: "BankAccount",
    // },
    // {
    //   id: 4,
    //   title: "Device & Credentials",
    //   subtitle: "Manage your device credentials",
    //   icon: "phone-portrait-outline",
    //   route: "DeviceCredentials",
    // },
    {
      id: 5,
      title: "Delete My Account",
      subtitle: "",
      icon: "trash-outline",
      route: "DeleteAccount",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>go back</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name || 'Guest'}</Text>
          <Text style={styles.lastLogin}>{user?.userType || "Tourist"}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.tint,
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  lastLogin: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
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
