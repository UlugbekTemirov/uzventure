import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { Colors } from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { ThemedButton } from '@/components/ThemedButton';
import { auth } from '@/config/firebaseConfig'; // Your Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', `Welcome back, ${userCredential.user.email}!`);
      console.log('User logged in:', userCredential.user.uid);
      await AsyncStorage.setItem("userId", userCredential.user.uid);
      router.push('/');
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image 
        source={require('@/assets/images/girl_traveling.png')} 
        style={styles.illustration} 
      />
      <ThemedText style={styles.title}>Welcome Back</ThemedText>
      <ThemedText style={styles.subtitle}>Login to continue</ThemedText>
      
      <ThemedTextInput 
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
        style={styles.input} 
        placeholderTextColor={Colors.light.icon} 
      />
      <ThemedTextInput 
        placeholder="Password" 
        value={password}
        onChangeText={setPassword}
        style={styles.input} 
        secureTextEntry 
        placeholderTextColor={Colors.light.icon} 
      />

      <View style={styles.buttonContainer}>
        <ThemedButton 
          title={loading ? 'Logging in...' : 'Login'} 
          onPress={handleLogin} 
        />
      </View>
      
      <Link href="/register" style={styles.link}>
        <ThemedText style={styles.linkHighlight}>Don't have an account? Register</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
  },
  illustration: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
    marginBottom: 20,
    textAlign: 'center',
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
    overflow: 'hidden',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: Colors.light.icon,
  },
  linkHighlight: {
    color: Colors.light.tint,
    fontWeight: '600',
  },
});
