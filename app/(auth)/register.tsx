import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import { auth, db } from "@/config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      const userDocRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        userType: 'tourist',
        createdAt: new Date().toISOString(),
      });
  
      router.push("/login");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/register-travel.jpg")}
        style={styles.illustration}
      />
      <ThemedText style={styles.title}>Create an Account</ThemedText>
      <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>

      <ThemedTextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholderTextColor={Colors.light.icon}
      />
      <ThemedTextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={Colors.light.icon}
      />
      <ThemedTextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={Colors.light.icon}
      />

      <View style={styles.buttonContainer}>
        <ThemedButton title="Register" onPress={handleRegister} />
      </View>

      <Link href="/login" style={styles.link}>
        <ThemedText style={styles.linkHighlight}>
          Already have an account? Login
        </ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 15,
  },
  illustration: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: Colors.light.icon,
  },
  linkHighlight: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
});
