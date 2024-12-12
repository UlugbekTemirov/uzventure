import ParallaxScrollView from "@/components/ParallaxScrollView";
import { db } from "@/config/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import MyCarousel from "@/components/MyCarousel";

const { width: screenWidth } = Dimensions.get('window')

const LocationDetails = () => {
  const { id }: any = useLocalSearchParams();
  const router = useRouter();

  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  return (
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
          <MyCarousel images={location?.images} />
        </View>
      }
      headerBackgroundColor={{ light: "#F5F5F5", dark: "#1D1D1D" }}
    >
      <View>
        <Text style={styles.locationName}>{location?.name}</Text>
        <Text style={styles.locationInfo}>{location?.info}</Text>
      </View>
      
      </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default LocationDetails;
