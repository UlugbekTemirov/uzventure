import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/CustomDrawerContent"; // Ensure you have a custom drawer
import CustomHeader from "@/components/CustomHeader"; // Your custom header component
import { Colors } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot, useRouter } from "expo-router";

export default function DrawerLayout() {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          header: ({ navigation }) => (
            <CustomHeader
              onHamburgerPress={() => navigation.toggleDrawer()}
              onProfilePress={() => router.push("/profile")}
            />
          ),
          drawerHideStatusBarOnOpen: false,
          drawerActiveBackgroundColor: Colors.light.tint,
          drawerActiveTintColor: "#fff",
          drawerStyle: {
            backgroundColor: Colors.light.background,
          },
        }}
        drawerContent={(props) => (
          <CustomDrawerContent user={null} {...props} />
        )}
      >
        <Slot /> {/* This renders the child routes dynamically */}
      </Drawer>
    </GestureHandlerRootView>
  );
}
