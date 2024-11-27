import { ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import { DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import 'react-native-gesture-handler';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import { Children, useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from "@/config/firebaseConfig";
import { ActivityIndicator, LogBox, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments  } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Set the initial route for the drawer
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

LogBox.ignoreLogs(["Setting a timer"]); 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const isAuthPage = segments[0] === '(auth)';

  useEffect(() => {
    async function fetchSampleData() {
      try {
        const querySnapshot = await getDocs(collection(db, "guides"));
        querySnapshot.forEach((doc) => {
        });
      } catch (error) {
        console.error("Firebase error:", error);
      }
    }
    fetchSampleData();
  }, []);

  useEffect(() => {
    const checkUserSession = async () => {
      const userId = await AsyncStorage.getItem("userId");
      console.log("userID", userId)

      if (!userId) {
        router.push("/(auth)/login");
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkUserSession();
    setLoading(false);
  }, []);

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
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
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
           screenListeners={{
            state: (e) => {
              const isDrawerOpen = e.data?.state?.history?.at(-1)?.type === "drawer";
              if (isDrawerOpen) {
                fetchUser(); 
              }
            },
          }}
            screenOptions={{
              drawerHideStatusBarOnOpen: false,
              drawerActiveBackgroundColor: '#5363df',
              drawerActiveTintColor: '#fff',
            }}
            drawerContent={props => <CustomDrawerContent user={user} fetchUser={fetchUser} {...props} />}
           
          >
            <Drawer.Screen
              name="(tabs)"
              options={{
                drawerLabel: 'Home',
                headerTitle: 'Home',
                drawerIcon: ({ size, color }) => (
                  <Ionicons size={size} color={color} name="home-outline" />
                ),
              }}
            />
            <Drawer.Screen
              name="news"
              options={{
                drawerLabel: 'News',
                headerTitle: 'News',
                drawerIcon: ({ size, color }) => (
                  <Ionicons size={size} color={color} name="newspaper-outline" />
                ),
              }}
            />
            <Drawer.Screen
              name="profile"
              options={{
                drawerLabel: 'Profile',
                headerTitle: 'Profile',
                drawerIcon: ({ size, color }) => (
                  <Ionicons size={size} color={color} name="person-circle-outline" />
                ),
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
    </ThemeProvider>
  );
}
