import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { auth, db } from "@/config/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CustomDrawerContent({ fetchUser, user, ...props }: any)  {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  // const [user, setUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem("userId");

  //       if (userId) {
  //         const userDocRef = doc(db, "users", userId);
  //         const userDoc = await getDoc(userDocRef);

  //         if (userDoc.exists()) {
  //           setUser(userDoc.data());
  //         } else {
  //           console.warn("User data not found in Firestore.");
  //           setUser({ name: "Guest", email: "No Email" });
  //         }
  //       } else {
  //         console.warn("No user ID found in storage. Redirecting to login.");
  //         router.push("/(auth)/login");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       router.push("/(auth)/login");
  //     } finally {
  //       // setLoading(false);
        
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#5363df" />
  //     </View>
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: "#fff" }}
        scrollEnabled={false}
        {...props}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: 20 }}>
          <Image
            source={{
              uri: user?.avatar || "https://avatar.iran.liara.run/public/boy",
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <View style={{ marginLeft: 20, flexDirection: "column" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user?.name || "Guest"}</Text>
            <Text style={{ fontSize: 15, fontWeight: "normal", fontStyle: "italic" }}>
              {user?.email || "No Email"}
            </Text>
          </View>
        </View>

        <View style={{ paddingTop: 10 }}>
          <DrawerItemList {...props} />
          <DrawerItem
            label={"Logout"}
            onPress={async () => {
              await AsyncStorage.removeItem("userId");
              await auth.signOut();
              router.push("/(auth)/login");
            }}
          />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      >
        <ThemedText>Footer</ThemedText>
      </View>
    </View>
  );
}
