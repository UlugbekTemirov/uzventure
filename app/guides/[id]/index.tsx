import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function GuideDetailPage() {
  const { id }: any = useLocalSearchParams();

  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<any>({});

  const fetchGuideByField = async () => {
    const q = query(collection(db, "guides"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setGuide(doc.data());
      });
    } else {
      console.log("No matching document found!");
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

  const handleCarPress = (car: any) => {
    setSelectedCar(car);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleContactPress = () => {
    const phoneNumber = guide.phoneNumber;

    if (!phoneNumber) {
      return;
    }

    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!guide) {
    return <Text>Guide not found</Text>;
  }

  console.log("guide details:", guide);

  return (
    <ParallaxScrollView
      headerImage={
        <Image source={{ uri: guide?.avatar }} style={styles.headerImage} />
      }
      headerBackgroundColor={{ light: "#F5F5F5", dark: "#1D1D1D" }}
    >
      <View style={styles.profileSection}>
  <Text style={styles.guideTitle}>
    {guide?.name}{" "}
    {guide?.isVerified && (
      <MaterialIcons name="verified" size={16} color="green" />
    )}
  </Text>
  <Text style={styles.age}>{guide?.age} years old</Text>
  <Text style={styles.subText}>{guide?.location}</Text>
  <Text style={styles.subText}>{guide?.phoneNumber}</Text>
  <Text style={styles.subText}>
    ${guide?.price}/hour • {guide?.experience} of experience
  </Text>
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.contactButton}>
      <Text style={styles.contactText} onPress={handleContactPress}>
        Contact
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bookButton}>
      <Text style={styles.bookText}>Book Now</Text>
    </TouchableOpacity>
  </View>
  <Text style={styles.buttonsSubText}>
    "Book Now" button will send booking letter to guides email:{" "}
    {guide?.email}
  </Text>

  <View style={styles.socialMediaContainer}>
    {guide?.socialMedia?.telegram && (
      <TouchableOpacity
        onPress={() => Linking.openURL(guide.socialMedia.telegram)}
        style={styles.iconButton}
      >
        <FontAwesome name="telegram" size={24} color="#0088cc" />
      </TouchableOpacity>
    )}
    {guide?.socialMedia?.instagram && (
      <TouchableOpacity
        onPress={() => Linking.openURL(guide.socialMedia.instagram)}
        style={styles.iconButton}
      >
        <Ionicons name="logo-instagram" size={24} color="#C13584" />
      </TouchableOpacity>
    )}
    {guide?.socialMedia?.youtube && (
      <TouchableOpacity
        onPress={() => Linking.openURL(guide.socialMedia.youtube)}
        style={styles.iconButton}
      >
        <Ionicons name="logo-youtube" size={24} color="#FF0000" />
      </TouchableOpacity>
    )}
    {guide?.socialMedia?.linkedin && (
      <TouchableOpacity
        onPress={() => Linking.openURL(guide.socialMedia.linkedin)}
        style={styles.iconButton}
      >
        <Ionicons name="logo-linkedin" size={24} color="#0077b5" />
      </TouchableOpacity>
    )}
  </View>
</View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.text}>{guide?.bio}</Text>
      </View>

      {guide?.cars?.length > 0 && (
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cars</Text>
        <FlatList
          data={guide.cars}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.carCard}
              onPress={() => handleCarPress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.carImage} />
              <Text style={styles.carModel}>{item.model}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
          onDismiss={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedCar?.image }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{selectedCar?.model}</Text>
              <Text>
                Year: {selectedCar?.year}
              </Text>
              <Text>
                Features: {selectedCar?.features.join(", ")}
              </Text>
              <Text>
                Price: ${selectedCar?.price} / km
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        {guide?.services?.map((service: any, index: any) => (
          <View key={index} style={styles.serviceRow}>
            <Ionicons
              name="checkmark-circle-outline"
              size={16}
              color="#4CAF50"
            />
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {guide?.languages?.map((language: any, index: any) => (
          <View key={index} style={styles.languageRow}>
            <Ionicons
              style={{ marginTop: 3 }}
              name="language-outline"
              size={16}
              color="#555"
            />
            <Text style={styles.languageText}>
              {language.name} - {language.level}
            </Text>
          </View>
        ))}
      </View>

      {guide?.reviews?.length > 0 && (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.sectionTitle}>Reviews</Text>
    <ScrollView
      style={{ paddingVertical: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {guide?.reviews?.map((review: any, index: any) => (
        <View key={review.id || index} style={styles.reviewCard}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={{ uri: review.avatar }}
              style={styles.reviewerAvatar}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.reviewerName}>{review.name}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
              <View style={styles.starContainer}>
                {Array.from({ length: 5 }).map((_, i) => {
                  if (i < Math.floor(review.rating)) {
                    return (
                      <Ionicons key={i} name="star" size={16} color="gold" />
                    );
                  } else if (i < Math.ceil(review.rating)) {
                    return (
                      <Ionicons
                        key={i}
                        name="star-half"
                        size={16}
                        color="gold"
                      />
                    );
                  } else {
                    return (
                      <Ionicons
                        key={i}
                        name="star-outline"
                        size={16}
                        color="gold"
                      />
                    );
                  }
                })}
              </View>
            </View>
          </View>
          <Text style={styles.reviewText}>{review.comment}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
)}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  iconButton: {
    marginHorizontal: 10,
  },
  profileSection: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  phoneText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
    display: "flex",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  contactButton: {
    flex: 1,
    backgroundColor: "#F0F2F4",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
    textAlign: "center",
  },
  contactText: {
    fontWeight: "bold",
    color: "#111",
  },
  bookButton: {
    flex: 1,
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: 150,
  },
  bookText: {
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    flexWrap: "nowrap",
  },
  section: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 0,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  age: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  carDetails: {
    fontSize: 12,
    color: "#555",
  },
  buttonsSubText: {
    fontSize: 10,
    color: "#555",
    textAlign: "center",
    maxWidth: 300,
    marginTop: 10,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  serviceText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  languageText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  reviewCard: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 300, // Adjust card width as needed
  },
  reviewerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 18,
    marginTop: 5
  },
  guideTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  carCard: {
    width: 150,
    marginRight: 10,
  },
  carImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  carModel: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    height: "auto",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 5,
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF7F50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
