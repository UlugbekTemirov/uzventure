import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { Colors } from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { ThemedButton } from '@/components/ThemedButton';

export default function LoginScreen() {
const router = useRouter()

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
        style={styles.input} 
        placeholderTextColor={Colors.light.icon} 
      />
      <ThemedTextInput 
        placeholder="Password" 
        style={styles.input} 
        secureTextEntry 
        placeholderTextColor={Colors.light.icon} 
      />

      <View style={styles.buttonContainer}>
        <ThemedButton 
          title="Login" 
          onPress={() => router.push('/')} 
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
