import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import {  useClerk, useUser } from "@clerk/clerk-expo";

export default function CustomDrawerContent({ ...props }: any) {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { user } = useUser();
  const { signOut } = useClerk()

  const handleLogout = async () => {
    signOut({redirectUrl: '/'})
  };

  const renderRouteName = (route: any) => {
    if (route.name === "(tabs)") {
      return "Home";
    } else if (route.name === "news/index") {
      return "News";
    } else if (route.name === 'locations-map') {
      return 'Locations'
    }
    return route.name;
  };
6
  const renderIconName = (route: any) => {
    if (route.name === "(tabs)") {
      return "home";
    } else if (route.name === "news/index") {
      return "newspaper";
    } else if (route.name === 'locations-map') {
      return 'map'
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
          <View style={{
            maxWidth: '70%'
          }}>
            <Text style={styles.profileName}>{user?.fullName || "Guest"}</Text>
            <Text style={styles.profileEmail}>{ user?.emailAddresses[0].emailAddress || "No Email"}</Text>
          </View>
          <Image
            source={{
              uri: user?.imageUrl || "https://avatar.iran.liara.run/public/boy",
            }}
            style={styles.profileImage}
          />
        </View>

        {props.state.routes
          .filter((route: any) =>
            ["(tabs)", "news/index", 'locations-map'].includes(route.name)
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
