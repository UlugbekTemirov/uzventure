import { ThemeProvider } from "@react-navigation/native";
import "react-native-reanimated";
import { DefaultTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import "react-native-gesture-handler";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { ActivityIndicator, LogBox, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { Slot } from "expo-router";
import { Colors } from "@/constants/Colors";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

LogBox.ignoreLogs(["Setting a timer"]);

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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
      } else {
        console.warn("User ID not found in AsyncStorage.");
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


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }


  return (
    <ThemeProvider value={DefaultTheme}>
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
          }}
          drawerContent={(props) => (
            <CustomDrawerContent user={user} {...props} />
          )}
        >
          <Slot />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
