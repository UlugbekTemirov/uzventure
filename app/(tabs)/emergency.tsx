import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

const EMERGENCY_SERVICES = [
  {
    id: 1,
    title: "Local Police",
    description: "For local law enforcement emergencies.",
    phone: "100",
    illustration: "https://abasayyoh.com/images/uzbek-police.jpg",
  },
  {
    id: 2,
    title: "Tourist Police",
    description: "For tourist-related emergencies and assistance.",
    phone: "1173",
    illustration: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxSPWMFZ-s5nVIWsu_S9kTpzM7-dnQQNe_A&s",
  },
  {
    id: 3,
    title: "Ambulance",
    description: "For medical emergencies and ambulance services.",
    phone: "103",
    illustration: "https://uz103.uz/img/banner.jpg",
  },
];

export default function EmergencyPage() {
  const handleCallPress = (phone: string) => {
    Alert.alert(
      "Confirm Call",
      `Are you sure you want to call ${phone}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          onPress: () => {
            const url = `tel:${phone}`;
            Linking.openURL(url).catch((err) =>
              console.error("Error opening phone app", err)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Emergency Services</Text>
      {EMERGENCY_SERVICES.map((service) => (
        <View key={service.id} style={styles.card}>
          <Image source={{ uri: service.illustration }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardDescription}>{service.description}</Text>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => handleCallPress(service.phone)}
            >
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#F5F5F5",
    paddingBottom: 90,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
    textAlign: "center",
  },
  callButton: {
    backgroundColor: "#FF7F50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  callButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
