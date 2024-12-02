import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function CustomDrawerContent({ fetchUser, user, ...props }: any) {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const filteredRoutes = props.state.routes.filter((route: any) => {
    return ["(tabs)", "news", "profile"].includes(route.name);
  });

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    await auth.signOut();
    router.push("/(auth)/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView contentContainerStyle={{ backgroundColor: "#fff" }} {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: user?.avatar || "https://avatar.iran.liara.run/public/boy",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{user?.name || "Guest"}</Text>
            <Text style={styles.profileEmail}>{user?.email || "No Email"}</Text>
          </View>
        </View>

        <View style={{ paddingTop: 10 }}>
          <DrawerItemList
            {...props}
            state={{
              ...props.state,
              routes: filteredRoutes,
            }}
          />
        </View>
      </DrawerContentScrollView>

      <View style={[styles.footer, { paddingBottom: bottom }]}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={Colors.light.tint} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileTextContainer: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#666",
  },
  footer: {
    borderTopColor: "#eee",
    borderTopWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
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
