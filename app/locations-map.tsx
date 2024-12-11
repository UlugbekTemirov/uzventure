import React, { useEffect, useState } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { ActivityIndicator, Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import LocationMarker from '@/components/LocationMarker';

export default function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [locations, setLocations] = useState<any>([]);
    const fetchLocations = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "locations"));
          const locations = [] as any;
          querySnapshot.forEach((doc) => {
            locations.push({ id: doc.id, ...doc.data() });
          });
          return locations;
        } catch (error) {
          console.error("Error fetching guides:", error);
          return [];
        }
      };
    const router = useRouter();

    
  useEffect(() => {
    async function loadLocations() {
      setLoading(true);
      const data = await fetchLocations();
      setLocations(data);
      setLoading(false);
    }
    loadLocations();
  }, []);

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView initialRegion={{
    latitude: 39.770496918,
    longitude: 64.418831658,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }} style={styles.map} >
    {
      locations.length > 0 && locations.map((location: any, index: number) => (
        <Marker 
        onPress={() => Alert.alert("pressed")}
        key={index}
        coordinate={{
          latitude: location.geoLocation.latitude,
          longitude: location.geoLocation.longitude,
        }}
      >
        <LocationMarker location={location} />
      </Marker>
      ))}
  </MapView>

      <TouchableOpacity onPress={()=> router.push('/locations')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#555" />
      </TouchableOpacity>
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
      padding: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
