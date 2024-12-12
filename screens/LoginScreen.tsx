import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router"; // Import useRouter hook
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onPress = React.useCallback(async () => {
    try {
      setLoading(true);
      const result = await startOAuthFlow();

      const { createdSessionId, setActive, signIn, signUp } = result as any;

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.push({
          pathname: "/home",
          params: { sessionId: createdSessionId },
        });
      } else {
        if (signIn) {
          await signIn();
        } else if (signUp) {
          await signUp();
        }
      }
    } catch (err) {
      console.log("OAuth error:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <Image 
        source={require('@/assets/images/girl_traveling.png')} 
        style={styles.illustration} 
      />
      </View>
      <View style={{ backgroundColor: "#ffff", padding: 20, marginTop: -50 }}>
      <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            maxWidth: "90%",
            marginHorizontal: 'auto'
          }}
        >
          <Text style={{color: Colors.light.tint, fontWeight: "bold"}}>UzVenture</Text> - Your ultimate travel companion
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfitregular",
            textAlign: "center",
            marginVertical: 15,
            color: "#999999",
          }}
        >
          Discover the best destinations around the world and find local guides who can show you the hidden gems of your destination
        </Text>
        <TouchableOpacity disabled={loading} style={{...styles.btn, backgroundColor: loading ? 'gray' : Colors.light.tint}} onPress={onPress}>
      <Ionicons name="logo-google" size={24} color="#fff" style={styles.icon} />
      <Text style={styles.text}>
        {loading ? "Loading..." : "Continue with Google"}
      </Text>
    </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 99,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "outfitregular",
    fontWeight: "bold",
    paddingBottom: 2
  },
  illustration: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    marginBottom: 20,
  },
});