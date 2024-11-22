import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const { width } = Dimensions.get('window');

const guide = {
  name: 'Ulugbek Temirov',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  isVerified: true,
  rating: 4.7,
  age: 35,
  location: 'Bukhara, Uzbekistan',
  bio: 'An experienced guide with a passion for sharing the rich history and culture of Uzbekistan.',
  languages: [
    { name: 'English', fluency: 'Fluent' },
    { name: 'Russian', fluency: 'Conversational' },
    { name: 'Uzbek', fluency: 'Native' },
  ],
  cars: [ 
    {
      id: '1',
      model: 'Toyota Corolla',
      color: 'White',
      seats: 5,
      type: 'Sedan',
      price: '$50/day',
      image: 'https://bucket.dealervenom.com/copeland-toyota/C430752_8X8_Front.webp?auto=compress%2Cformat&ixlib=php-3.3.1',
    },
    {
      id: '2',
      model: 'Ford Explorer',
      color: 'Black',
      seats: 7,
      type: 'SUV',
      price: '$70/day',
      image: 'https://images.jazelc.com/uploads/chastangford-m2en/Ford-Explorer-Platinum-Houston-TX.jpg',
    },
  ],
  services: ['Historical Tours', 'City Tours', 'Adventure Tours', 'Private Guide'],
  knownLocations: ['Bukhara', 'Samarkand', 'Tashkent', 'Khiva'],
  reviews: [
    { id: '1', name: 'John Doe', rating: 5, comment: 'Fantastic experience!', date: '2024-10-01' },
    { id: '2', name: 'Jane Smith', rating: 4, comment: 'Great guide and very knowledgeable.', date: '2024-09-20' },
  ],
};

const GuideDetailPage = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
          <Image source={{ uri: guide.avatar }} style={styles.headerImage} />
      }>
    
      {/* Guide Details */}
      <View style={styles.infoContainer}>
        <View style={styles.detailsRow}>
          <Ionicons name="star" size={20} color="gold" />
          <Text style={styles.ratingText}>{guide.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.locationText}>
          <Ionicons name="location-outline" size={16} color="gray" /> {guide.location}
        </Text>
        <Text style={styles.bioText}>{guide.bio}</Text>
      </View>

      {/* Cars Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Cars</Text>
        <FlatList
          horizontal
          data={guide.cars}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.carCard}>
              <Image source={{ uri: item.image }} style={styles.carImage} />
              <Text style={styles.carModel}>{item.model}</Text>
              <Text style={styles.carDetails}>Color: {item.color}</Text>
              <Text style={styles.carDetails}>Seats: {item.seats}</Text>
              <Text style={styles.carDetails}>Type: {item.type}</Text>
              <Text style={styles.carPrice}>{item.price}</Text>
            </View>
          )}
        />
      </View>

      {/* Other Sections (Languages, Reviews, etc.) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {guide.languages.map((lang, index) => (
          <Text key={index} style={styles.languageText}>
            {lang.name} - {lang.fluency}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {guide.reviews.map((review) => (
          <View key={review.id} style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <Ionicons name="star" size={14} color="gold" />
              <Text>{review.rating}</Text>
            </View>
            <Text style={styles.reviewDate}>{review.date}</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 8,
  },
  headerName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  verifiedBadge: {
    marginLeft: 5,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
  },
  locationText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    width: width * 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  carModel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carDetails: {
    fontSize: 14,
    color: '#555',
  },
  carPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF7F50',
  },
  languageText: {
    fontSize: 14,
    marginVertical: 2,
  },
  reviewContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewName: {
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: 'gray',
  },
  reviewComment: {
    marginTop: 5,
  },
});

export default GuideDetailPage;
