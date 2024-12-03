import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth, db } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function CustomDrawerContent({ ...props }: any) {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };
    initialize();
  }, []);


  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    await auth.signOut();
    router.push("/(auth)/login");
  };

  const renderRouteName = (route: any) => {
    if (route.name === "(tabs)") {
      return "Home";
    } else if (route.name === "news") {
      return "News";
    } else if (route.name === "profile") {
      return "Profile";
    } else if (route.name === "(auth)/login") {
      return "Login";
    }
    return route.name;
  };

  const renderIconName = (route: any) => {
    if (route.name === "(tabs)") {
      return "home";
    } else if (route.name === "news") {
      return "newspaper";
    } else if (route.name === "profile") {
      return "person-circle-outline";
    } else if (route.name === "(auth)/login") {
      return "log-in";
    }
    return route.name;
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#fff" }}
      >
        <View style={styles.profileContainer}>
          <View>
            <Text style={styles.profileName}>{user?.name || "Guest"}</Text>
            <Text style={styles.profileEmail}>{user?.email || "No Email"}</Text>
          </View>
          <Image
            source={{
              uri: user?.avatar || "https://avatar.iran.liara.run/public/boy",
            }}
            style={styles.profileImage}
          />
        </View>

        {props.state.routes
          .filter((route: any) =>
            ["(tabs)", "news", "profile", "(auth)/login"].includes(route.name)
          )
          .map((route: any, index: any) => (
            <TouchableOpacity
              key={index}
              onPress={() => props.navigation.navigate(route.name)}
              style={{
                ...styles.drawerItem,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 15,
              }}
            >
              <Ionicons
                name={renderIconName(route)}
                size={24}
                color={Colors.light.tint}
                style={{ marginRight: 12 }}
              />
              <Text style={styles.drawerItemText}>
                {renderRouteName(route)}
              </Text>
            </TouchableOpacity>
          ))}
      </DrawerContentScrollView>

      <View style={[styles.footer, { paddingBottom: bottom }]}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={Colors.light.tint}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FF7F50",
    borderRadius: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  profileEmail: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#eee",
  },
  drawerItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    borderTopColor: "#eee",
    borderTopWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.light.tint,
    marginLeft: 10,
  },
});
