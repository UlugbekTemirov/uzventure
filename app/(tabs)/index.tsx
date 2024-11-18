import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';

export default function HomePage() {
  const categories = [{
    id: '1',
    name: 'Historical',
    image: "https://minzifatravel.com/wp-content/uploads/2021/04/bukhara.jpg",
  }, {
    id: '3',
    name: 'Modern',
    image: 'https://trvlland.com/wp-content/uploads/2022/09/uzbekistan_tashkent-3.jpg'
  },
  {
    id: '4',
    name: 'Desert',
    image: 'https://uzbekistan.travel/storage/app/media/uploaded-files/11.jpg'
  },
  {
    id: '5',
    name: 'Mountain',
    image: "https://uzbekistan.travel/storage/app/media/uploaded-files/Hissar%20Mountains.png"
  },
  {
    id: '6',
    name: 'Valley',
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/53/e7/0a.jpg"
  },
  ];
  const guides = [
    { id: '1', name: 'John Doe', rating: 4.8, verified: true, price: '$50/hour' },
    { id: '2', name: 'Jane Smith', rating: 4.5, verified: false, price: '$40/hour' },
    { id: '3', name: 'Alex Johnson', rating: 4.9, verified: true, price: '$60/hour' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Main Header */}
        <Text style={styles.headerText}>Explore the beauty of <Text style={styles.textUzbekistan}>Uzbekistan </Text></Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search places" style={styles.searchInput} />
          <TouchableOpacity style={styles.searchIconContainer}>
            <Ionicons name="filter" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => (
              <LinearGradient
                colors={['#fff', '#fff']}
                style={styles.categoryButton}
              >
                <View style={styles.categoryContent}>
                  <Image source={{ uri: item.image }} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
              </LinearGradient>
            )}
          />
        </View>

        {/* Travel Places Section */}
        <View style={styles.travelPlacesHeader}>
          <Text style={styles.sectionTitle}>Top Places</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={[1, 2, 3]} // Replace this array with actual travel places data
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={styles.placesContainer}
            renderItem={({ item }) => (
              <View style={styles.placeCard}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.placeImage} />
                <Text style={styles.placeTitle}>Place Name</Text>
                <Text style={styles.placeSubtitle}>Location, Country</Text>
              </View>
            )}
          />
        </View>

        {/* Top Guides Section */}
        <View style={styles.travelPlacesHeader}>
          <Text style={styles.sectionTitle}>Top Guides</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={guides}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.guidesContainer}
            renderItem={({ item }) => (
              <View style={styles.guideCard}>
                <Image source={{ uri: 'https://avatar.iran.liara.run/public/boy' }} style={styles.guideImage} />
                <View style={styles.guideInfo}>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', flexShrink: 1 }}>
                  <ThemedText style={styles.guideName}>{item.name}</ThemedText>
                  <MaterialIcons name="verified" size={14} color="green" />
</View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', flexShrink: 1 }}>
  <ThemedText style={styles.guideRating}>{item.rating} </ThemedText>
  <Ionicons name="star" size={12} color="gold" />
</View>
                  <ThemedText style={styles.guidePrice}>{item.price}</ThemedText>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 90,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 28,
    marginVertical: 20,
  },
  textUzbekistan: {
    fontWeight: 'bold',
    fontSize: 45,
    fontStyle: 'italic',
    color: '#FF7F50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  searchIconContainer: {
    backgroundColor: '#FF7F50',
    padding: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    marginVertical: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    minWidth: 140,
    height: 60,
    borderWidth: 1,
    borderColor: '#FF7F50',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  travelPlacesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#FF7F50',
  },
  placesContainer: {
    paddingVertical: 10,
  },
  placeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 150,
  },
  placeImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  placeTitle: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  placeSubtitle: {
    color: 'gray',
  },
  guidesContainer: {
    paddingVertical: 10,
  },
  guideCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  guideImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  guideInfo: {
    flex: 1,
  },
  guideName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 5,
  },
  guideRating: {
    color: 'gray',
    fontSize: 14,
    marginRight: 2,
  },
  verifiedBadge: {
    backgroundColor: '#4CAF50',
    color: 'white',
    paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 12,
    marginTop: 2,
  },
  guidePrice: {
    color: '#FF7F50',
    fontWeight: '900',
    fontSize: 13,
  },
});
