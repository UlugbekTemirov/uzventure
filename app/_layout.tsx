import DrawerLayout from "@/app/drawerLayout"; // Import your dedicated drawer layout
import { ThemeProvider } from "@react-navigation/native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from "@/screens/LoginScreen";
import { DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import WelcomeScreen from "@/screens/WelcomeScreen";
import { useState } from "react";

export default function RootLayout() {
  const [done, setDone] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "outfit-regular": require("@/assets/fonts/Outfit-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <ClerkProvider publishableKey={publishableKey}>
        <SignedIn>
          <DrawerLayout />
        </SignedIn>
        <SignedOut>
          {done ? <LoginScreen /> : <WelcomeScreen onDone={() => setDone(true)} />}
        </SignedOut>
      </ClerkProvider>
    </ThemeProvider>
  );
}
