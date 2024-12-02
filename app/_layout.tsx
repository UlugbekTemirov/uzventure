import { ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import { DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import 'react-native-gesture-handler';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from "@/config/firebaseConfig";
import { ActivityIndicator, LogBox, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '@/components/CustomHeader';
import { Slot } from 'expo-router';

// Set the initial route for the drawer
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

LogBox.ignoreLogs(["Setting a timer"]);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Fetch user data from Firestore based on session
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

  // Check if the user session exists and redirect if necessary
  const checkUserSession = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        router.push("/(auth)/login"); // Navigate to login page if no userId
      }
    } catch (error) {
      console.error("Error checking user session:", error);
    } finally {
      setLoading(false); // Set loading to false after session check
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchUser(); // Fetch user data
      await checkUserSession(); // Check user session
    };
    initialize(); // Run initialization
  }, []); // Only run once on component mount

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
            drawerActiveBackgroundColor: "#5363df",
            drawerActiveTintColor: "#fff",
          }}
          drawerContent={(props) => <CustomDrawerContent user={user} {...props} />}
        >
          {/* Slot is required to render child routes */}
          <Slot />  
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
