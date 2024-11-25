import { ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import { DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import 'react-native-gesture-handler';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/config/firebaseConfig";
import { LogBox } from "react-native";

// Set the initial route for the drawer
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

LogBox.ignoreLogs(["Setting a timer"]); 

export default function RootLayout() {
  useEffect(() => {
    async function fetchSampleData() {
      try {
        const querySnapshot = await getDocs(collection(db, "guides"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.error("Firebase error:", error);
      }
    }
    fetchSampleData();
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            drawerHideStatusBarOnOpen: false,
            drawerActiveBackgroundColor: '#5363df',
            drawerActiveTintColor: '#fff',
          }}
          drawerContent={CustomDrawerContent}
        >
          {/* <Drawer.Screen
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
          /> */}
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
