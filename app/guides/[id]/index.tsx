import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Modal
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";

const guide = {
  name: "Ulugbek Temirov",
  age: 42,
  phoneNumber: "+998936563672",
  location: "Bukhara, Uzbekistan",
  price: "$200/hour",
  verified: true,
  experience: "5 years experience",
  bio: "I'm a father of two and have been living in San Francisco for over 10 years. I've worked at the best restaurants in the city and love to share my knowledge about food and wine with others.",
  avatar: "https://cdn.usegalileo.ai/stability/e3075532-c7cb-4ddb-a6f8-09b53e58cdf8.png",
  cars: [
    {
      id: "1",
      model: "Tesla Model X",
      year: "2022",
      features: "Electric, Autopilot, Panoramic Sunroof",
      price: "$50/hour",
      image: "https://cdn.usegalileo.ai/stability/0981de47-88ca-40df-8548-94a1f158d560.png",
    },
    {
      id: "2",
      model: "Porsche Taycan",
      year: "2023",
      price: "$30/hour",
      features: "Electric, Sporty, Fast",
      image: "https://cdn.usegalileo.ai/stability/bfa01367-eab5-4d3d-8ff3-005f2d24f16b.png",
    },
  ],
  languages: [{
    name: "English",
    level: "Proficient",
  }, {
    name: "Spanish",
    level: "Basic",
  }, {
    name: "German",
    level: "Advanced",
  }],
  services: ["Wine Tours", "City Tours", "Airport Transfers"],
  reviews: [
    {
      id: "1",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Jenny",
      date: "Jan 2022",
      rating: 5,
      
      comment: "Michael is very professional and friendly.",
    },
    {
      id: "2",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Tina",
      date: "Dec 2021",
      rating: 4.5,
      comment: "We had a great time with Michael. He's very knowledgeable.",

    },
  ],
};

export default function GuideDetailPage() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

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
  
  return (
    <ParallaxScrollView
      headerImage={
        <Image source={{ uri: guide.avatar }} style={styles.headerImage} />
      }
      headerBackgroundColor={{ light: "#F5F5F5", dark: "#1D1D1D" }}
    >
      {/* Guide Information */}
      <View style={styles.profileSection}>
  <Text style={styles.guideTitle}>{guide.name} {guide.verified && <MaterialIcons name="verified" size={16} color="green" />}</Text>
  <Text style={styles.age}>
    {guide.age} years old
  </Text>
  <Text style={styles.subText}>{guide.location}</Text>
  <Text style={styles.subText}><Ionicons name="call" size={16} color="gray" /> {guide.phoneNumber}</Text> {/* Add this line */}
  <Text style={styles.subText}>
    {guide.price} • {guide.experience}
  </Text>
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.contactButton}>
      <Text style={styles.contactText} onPress={handleContactPress}>Contact</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bookButton}>
      <Text style={styles.bookText}>Book Now</Text>
    </TouchableOpacity>
  </View>
</View>


      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.text}>{guide.bio}</Text>
      </View>

      {/* Cars Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cars</Text>
        <FlatList
          data={guide.cars}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.carCard} onPress={() => handleCarPress(item)}>
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
        // close when user clicks outside the modal
        onDismiss={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* @ts-ignore */}
            <Text style={styles.modalTitle}>{selectedCar?.model}</Text>
            {/* @ts-ignore */}
            <Text>Year: {selectedCar?.year}</Text>
            {/* @ts-ignore */}
            <Text>Features: {selectedCar?.features}</Text>
            {/* @ts-ignore */}
            <Text>Price: {selectedCar?.price}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        {guide.services.map((service, index) => (
          <View key={index} style={styles.serviceRow}>
            <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" />
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </View>

      {/* Languages Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {guide.languages.map((language, index) => (
          <View key={index} style={styles.languageRow}>
            <Ionicons style={{marginTop: 3}} name="language-outline" size={16} color="#555" />
            <Text style={styles.languageText}>{language.name} - {language.level}</Text> 
          </View>
        ))}
      </View>

      {/* Reviews Section */}
      <View style={{ marginTop: 20 }}>
  <Text style={styles.sectionTitle}>Reviews</Text>
  <ScrollView style={{paddingVertical: 10}} horizontal showsHorizontalScrollIndicator={false}>
    {guide.reviews.map((review, index) => (
      <View key={index} style={styles.reviewCard}>
        <Image source={{ uri: review.avatar }} style={styles.reviewerAvatar} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.reviewerName}>{review.name}</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
          <View style={styles.starContainer}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <Ionicons key={i} name="star" size={16} color="gold" />
            ))}
          </View>
          <Text style={styles.reviewText}>{review.comment}</Text>
        </View>
      </View>
    ))}
  </ScrollView>
</View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    color: '#555',
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
  contactButton: {
    flex: 1,
    backgroundColor: "#F0F2F4",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
    textAlign: 'center'
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
    width: 150
  },
  bookText: {
    fontWeight: "bold",
    color: "#FFF",
    textAlign: 'center',
    flexWrap: 'nowrap'
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
    fontWeight: '500',
    color: "#555",
    marginBottom: 2
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  carDetails: {
    fontSize: 12,
    color: "#555",
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
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 300, // Adjust card width as needed
  },
  reviewerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 18,
  },
  guideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
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
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  carModel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 'auto',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 5,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF7F50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

