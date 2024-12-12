import ParallaxScrollView from "@/components/ParallaxScrollView";
import { db } from "@/config/firebaseConfig";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MyCarousel from "@/components/MyCarousel";
import MapView from "react-native-maps";
import LocationMarker from "@/components/LocationMarker";

const LocationDetails = () => {
  const { id }: any = useLocalSearchParams();
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

//   const [scrollEnabled, setScrollEnabled] = useState(true);
// const [panHandlers, setPanHandlers] = useState({});
// useEffect(() => {
//     const panResponder = PanResponder.create({
//         onStartShouldSetPanResponder: () => true,
//         onMoveShouldSetPanResponder: () => true,
//         onPanResponderStart: (event, gesture) => {
//             setTimeout(() => setScrollEnabled(gesture.numberActiveTouches === 2), 100)
//         }
//     });
//     setPanHandlers(panResponder.panHandlers);
// }, []);

  const fetchGuideByField = async () => {
    const q = query(collection(db, "locations"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setLocation(doc.data());
      });
    } else {
    }
  };

  useEffect(() => {
    async function loadGuides() {
      setLoading(true);
      await fetchGuideByField();
      setLoading(false);
    }
    loadGuides();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }

  console.log(location)

  return (
    <View style={styles.container}>
        <ParallaxScrollView
      headerImage={
        <View
          style={{
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={() => router.push('/locations')}
            style={styles.goBackButton}
          >
            <Ionicons name="arrow-back" size={25} color="black" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} onPress={() => setLiked(!liked)} style={styles.favoriteFloatButton}>
            <Ionicons name="heart" size={25} color={liked ? "red" : "#999"} />
          </TouchableOpacity>
          <MyCarousel images={location?.images} />
        </View>
      }
      headerBackgroundColor={{ light: "#F5F5F5", dark: "#1D1D1D" }}
    >
      <View>
        <Text style={styles.locationName}>{location?.name}</Text>
        <Text style={styles.locationInfo}>{location?.info}</Text>
      </View>

      <View  
    //   {...panHandlers}
       style={{
        overflow: 'hidden',
        borderRadius: 10    
      }}>
      <MapView
        initialRegion={{
          latitude: location?.geoLocation?.latitude || 41.311081,
          longitude: location?.geoLocation?.longitude || 69.240562,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        style={styles.map}
      >
          {!loading && <LocationMarker location={location} />}
      </MapView>
      </View>

      </ParallaxScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => Linking.openURL(location?.googleLocation)} style={styles.directionsButton}>
        <MaterialIcons name="route" size={24} color="#fff" />
          <Text style={styles.footerButtonText}>Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
      },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: '100%',
    height: 250,
  },
  goBackButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 2,
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  goBackButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  locationName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  locationInfo: {
    fontSize: 16,
    marginTop: 10,
  },
  ratingContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    zIndex: 1,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,

  },
  directionsButton: {
    backgroundColor: '#FF7F50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  favoriteButton: {
    backgroundColor: '#0047AB',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 18,
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  favoriteFloatButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 2
  }
});

export default LocationDetails;
