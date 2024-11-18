import React from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { Colors } from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { ThemedButton } from '@/components/ThemedButton';

export default function RegisterScreen() {
const router = useRouter()

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/register-travel.jpg')} 
        style={styles.illustration} 
      />
      <ThemedText style={styles.title}>Create an Account</ThemedText>
      <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>
      
      <ThemedTextInput 
        placeholder="Name" 
        style={styles.input} 
        placeholderTextColor={Colors.light.icon} 
      />
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
          title="Register" 
          onPress={() => router.push('/home')} 
        />
      </View>
      
      <Link href="/" style={styles.link}>
        <ThemedText style={styles.linkHighlight}>Already have an account? Login</ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
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
