import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Feather';
import IoniconsMaterial from '@expo/vector-icons/MaterialCommunityIcons';
import IoniconsSimple from '@expo/vector-icons/SimpleLineIcons';
import TopBar from '@/components/TopBar'; // Import your TopBar component

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors["light"].tint,
          headerShown: false,
          tabBarButton: ({ onPress, onLongPress, accessibilityState, children }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={onPress}
              onLongPress={onLongPress || undefined}
              accessibilityState={accessibilityState}
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
              }}
            >
              {children}
            </TouchableOpacity>
          ),
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              bottom: 10,
              marginHorizontal: 15,
              borderRadius: 15,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 10,
              height: 70,
            },
            default: {
              position: 'absolute',
              bottom: 10,
              marginHorizontal: 15,
              borderRadius: 15,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 10,
              height: 60,
            },
          }),
          tabBarItemStyle: {
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        {/* Add your Tabs.Screen components here */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons size={24} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: 'Shop',
            tabBarIcon: ({ color }) => <IoniconsSimple size={24} name="handbag" color={color} />,
          }}
        />
        <Tabs.Screen
          name="emergency"
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <View style={[styles.middleTab, { backgroundColor: Colors.light.danger }]}>
                <IoniconsMaterial size={32} name="police-badge-outline" color="#fff" />
              </View>
            ),
            tabBarButton: ({ onPress, onLongPress, accessibilityState, children }) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                onLongPress={onLongPress || undefined}
                accessibilityState={accessibilityState}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              >
                {children}
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="guides/index"
          options={{
            title: 'Guides',
            tabBarIcon: ({ color }) => <IoniconsSimple size={24} name="people" color={color} />,
          }}
        />
        <Tabs.Screen
          name="historical"
          options={{
            title: 'Places',
            tabBarIcon: ({ color }) => <IoniconsSimple size={24} name="location-pin" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  middleTab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
});
