import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TopBar({ navigation }: { navigation?: any }) {

  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => alert('Search')}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Notifications')} style={{ marginLeft: 20 }}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Profile')} style={{ marginLeft: 20 }}>
          <Ionicons name="person-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
