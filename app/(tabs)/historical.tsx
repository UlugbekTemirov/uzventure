import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Linking } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function LocationsPage() {
  const route = useRoute();

  const [districts, setDistricts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // @ts-ignore
  const id = (route?.params?.id as any) || null;

  useEffect(() => {
    if (id && districts.length > 0) {
      const modalLocation = locations.find(
        (district: any) => district.id == id
      ) as any;
      const location = {
        id: modalLocation.id,
        name: modalLocation.name,
        description: modalLocation.info,
        image: modalLocation.image,
        details: modalLocation.info,
        coordinates: `${modalLocation.geoLocation.latitude}° N, ${modalLocation.geoLocation.longitude}° E`,
        googleLink: modalLocation.googleLocation,
      };

      setSelectedLocation(location);
      setModalVisible(true);
    }
  }, [id, districts]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const fetchedDistricts: any = {};
        const locs = [] as any;
        querySnapshot.forEach((doc) => {
          locs.push({ id: doc.id, ...doc.data() });
        });
        setLocations(locs);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const districtName = data.region.name;
          const location = {
            id: data.id,
            name: data.name,
            description: data.info,
            image: data.image,
            details: data.info,
            coordinates: `${data.geoLocation.latitude}° N, ${data.geoLocation.longitude}° E`,
            googleLink: data.googleLocation,
          };

          if (!fetchedDistricts[districtName]) {
            fetchedDistricts[districtName] = {
              id: data.region.id,
              name: districtName,
              locations: [],
            };
          }

          fetchedDistricts[districtName].locations.push(location);
        });

        const districtArray = Object.values(fetchedDistricts).map(
          (district: any) => ({
            ...district,
            locations: district.locations.sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
            ),
          })
        );

        setDistricts(districtArray as any);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationPress = (location: any) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderLocationCard = (location: any) => {
    const rating = location.rating || "5.0";

    return (
      <TouchableOpacity
        key={location.id}
        style={styles.locationCard}
        onPress={() => handleLocationPress(location)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: location.image }}
            style={styles.locationImage}
          />
          <View style={styles.ratingOverlay}>
            <Text style={styles.ratingText}>{rating} ★</Text>
          </View>
        </View>
        <Text style={styles.locationName}>{location.name}</Text>
        <Text
          style={styles.locationDescription}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {location.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Locations</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {districts.map((district: any) => (
          <View key={district.id} style={styles.districtContainer}>
            <Text style={styles.districtName}>{district.name}</Text>
            <FlatList
              data={district.locations}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => renderLocationCard(item)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                ...styles.locationsList,
              }}
            />
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: selectedLocation?.image }}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>{selectedLocation?.name}</Text>
            <Text style={styles.modalDetails}>{selectedLocation?.details}</Text>
            <Text style={styles.modalCoordinates}>
              Coordinates: {selectedLocation?.coordinates}
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => {
                  if (selectedLocation?.googleLink) {
                    Linking.openURL(selectedLocation.googleLink).catch((err) =>
                      console.error("Error opening Google Maps:", err)
                    );
                  }
                }}
              >
                <Text style={styles.directionButtonText}>Get Directions</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  locationImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  ratingOverlay: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 5,
    paddingBottom: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  ratingText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  scrollContainer: {
    paddingBottom: 90,
  },
  districtContainer: {
    marginBottom: 20,
  },
  districtName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#333",
  },
  locationsList: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  locationCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  locationDescription: {
    fontSize: 14,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  directionButton: {
    width: "48%",
    marginTop: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  directionButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  modalCoordinates: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },
  closeButton: {
    width: "48%",
    marginTop: 10,
    backgroundColor: "#FF7F50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
