import React, { useState } from "react";
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

const DISTRICTS = [
  {
    id: "1",
    name: "Bukhara District",
    locations: [
      {
        id: "1",
        name: "Ark Fortress",
        description: "A historic fortress in Bukhara.",
        image: "https://example.com/ark-fortress.jpg",
        details:
          "The Ark is a massive fortress located in Bukhara, Uzbekistan. It was built in the 5th century AD and has been home to rulers of Bukhara for centuries.",
        coordinates: "39.7747° N, 64.4156° E",
      },
      {
        id: "2",
        name: "Bolo Haouz Mosque",
        description: "A beautiful mosque near the Ark Fortress.",
        image: "https://example.com/bolo-haouz.jpg",
        details:
          "Bolo Haouz Mosque, also known as the 'Mosque of Forty Pillars,' was built in 1712 and is famous for its stunning wooden pillars.",
        coordinates: "39.7775° N, 64.4162° E",
      },
    ],
  },
  {
    id: "2",
    name: "Samarkand District",
    locations: [
      {
        id: "1",
        name: "Registan Square",
        description: "The heart of Samarkand's history.",
        image: "https://example.com/registan.jpg",
        details:
          "Registan Square is an iconic landmark of Samarkand, featuring three majestic madrasahs built during the Timurid Empire.",
        coordinates: "39.6542° N, 66.9763° E",
      },
      {
        id: "2",
        name: "Gur-e-Amir Mausoleum",
        description: "The resting place of Amir Timur.",
        image: "https://example.com/gur-e-amir.jpg",
        details:
          "The Gur-e-Amir Mausoleum is a masterpiece of Persian-Mongol architecture and the final resting place of Tamerlane (Amir Timur).",
        coordinates: "39.6549° N, 66.9719° E",
      },
    ],
  },
  {
    id: "3",
    name: "Samarkand District",
    locations: [
      {
        id: "1",
        name: "Registan Square",
        description: "The heart of Samarkand's history.",
        image: "https://example.com/registan.jpg",
        details:
          "Registan Square is an iconic landmark of Samarkand, featuring three majestic madrasahs built during the Timurid Empire.",
        coordinates: "39.6542° N, 66.9763° E",
      },
      {
        id: "2",
        name: "Gur-e-Amir Mausoleum",
        description: "The resting place of Amir Timur.",
        image: "https://example.com/gur-e-amir.jpg",
        details:
          "The Gur-e-Amir Mausoleum is a masterpiece of Persian-Mongol architecture and the final resting place of Tamerlane (Amir Timur).",
        coordinates: "39.6549° N, 66.9719° E",
      },
    ],
  },
];

export default function LocationsPage() {
  const [districts, setDistricts] = useState(DISTRICTS);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLocationPress = (location: any) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderLocationCard = (location: any) => (
    <TouchableOpacity
      key={location.id}
      style={styles.locationCard}
      onPress={() => handleLocationPress(location)}
    >
      <Image source={{ uri: location.image }} style={styles.locationImage} />
      <Text style={styles.locationName}>{location.name}</Text>
      <Text style={styles.locationDescription}>{location.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Locations</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {districts.map((district) => (
          <View key={district.id} style={styles.districtContainer}>
            <Text style={styles.districtName}>{district.name}</Text>
            <FlatList
              data={district.locations}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => renderLocationCard(item)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.locationsList}
            />
          </View>
        ))}
      </ScrollView>

      {/* Modal for Location Details */}
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
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
  locationImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
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
