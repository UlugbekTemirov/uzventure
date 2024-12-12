import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import LocationMarker from '@/components/LocationMarker';
import RNPickerSelect from 'react-native-picker-select';

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<any>([]);
  const [category, setCategory] = useState<string | null>('all');

  const fetchLocations = async (selectedCategory: string | null) => {
    try {
      const locationsCollection = collection(db, "locations");
      let q = locationsCollection as any;

      if (selectedCategory && selectedCategory !== 'all') {
        q = query(locationsCollection, where("category", "==", selectedCategory));
      }

      const querySnapshot = await getDocs(q);
      const fetchedLocations = [] as any;
      querySnapshot.forEach((doc: any) => {
        fetchedLocations.push({ id: doc.id, ...doc.data() });
      });

      return fetchedLocations;
    } catch (error) {
      console.error("Error fetching locations:", error);
      return [];
    }
  };

  const router = useRouter();

  useEffect(() => {
    async function loadLocations() {
      setLoading(true);
      const data = await fetchLocations(category);
      setLocations(data);
      setLoading(false);
    }
    loadLocations();
  }, [category]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 39.770496918,
          longitude: 64.418831658,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        style={styles.map}
      >
        {locations.length > 0 &&
          locations.map((location: any, index: number) => (
            <LocationMarker key={index} location={location} />
          ))}
      </MapView>

      <TouchableOpacity onPress={() => router.push('/locations')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={25} color="#999" />
      </TouchableOpacity>

      <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select category', value: null }}
          style={{
            inputAndroid: {
              backgroundColor: '#fff',
              padding: 0,
            },
          }}
          value={category}
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: 'All', value: 'all' },
            { label: 'Historical', value: 'historical' },
            { label: 'Modern', value: 'modern' },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickerContainer: {
    position: 'absolute',
    width: 180,
    top: 20,
    right: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
});
