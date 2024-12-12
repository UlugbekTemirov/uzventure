import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<any>([]);
  const [guides, setGuides] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);

  const fetchGuides = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "guides"));
      const guides = [] as any;
      querySnapshot.forEach((doc) => {
        guides.push({ id: doc.id, ...doc.data() });
      });
      return guides;
    } catch (error) {
      console.error("Error fetching guides:", error);
      return [];
    }
  };

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

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categories = [] as any;
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      return categories;
    } catch (error) {
      console.error("Error fetching guides:", error);
      return [];
    }
  };

  useEffect(() => {
    async function loadLocations() {
      setLoading(true);
      const data = await fetchLocations();
      setLocations(data);
      setLoading(false);
    }
    async function loadGuides() {
      setLoading(true);
      const data = await fetchGuides();
      setGuides(data);
      setLoading(false);
    }
    async function loadCategories() {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    }
    loadLocations();
    loadGuides();
    loadCategories();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Main Header */}
        <Text style={styles.headerText}>
          Explore the beauty of{" "}
          <Text style={styles.textUzbekistan}>Uzbekistan </Text>
        </Text>

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
                colors={["#fff", "#fff"]}
                style={styles.categoryButton}
              >
                <View style={styles.categoryContent}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.categoryImage}
                  />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
              </LinearGradient>
            )}
          />
        </View>

        {/* Travel Places Section */}
        <View style={styles.travelPlacesHeader}>
          <Text style={styles.sectionTitle}>Top Places</Text>
          <TouchableOpacity onPress={() => router.push("/locations")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          {loading ? (
            <View
              style={{
                width: 150,
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#FF7F50" />
            </View>
          ) : (
            <FlatList
              data={locations.slice(0, 4)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.placesContainer}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push(`/location/${item.id}`)}
                  style={styles.placeCard}
                >
                  <Image
                    source={{
                      uri: item?.image || "https://via.placeholder.com/150",
                    }}
                    style={styles.placeImage}
                  />
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.placeTitle}>
                    {item?.name} | {item?.region?.name}
                  </Text>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={styles.placeSubtitle}>
                    {item?.info}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Top Guides Section */}
        <View style={styles.travelPlacesHeader}>
          <Text style={styles.sectionTitle}>Top Guides</Text>
          <TouchableOpacity onPress={() => router.push("/guides")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={guides.slice(0, 4)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.guidesContainer}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => router.push(`/guides/${item.id}`)} style={styles.guideCard}>
                <Image
                  source={{
                    uri:
                      item.avatar || "https://avatar.iran.liara.run/public/boy",
                  }}
                  style={styles.guideImage}
                />
                <View style={styles.guideInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      alignSelf: "flex-start",
                      flexShrink: 1,
                    }}
                  >
                    <ThemedText style={styles.guideName}>
                      {item.name}
                    </ThemedText>
                    <MaterialIcons name="verified" size={14} color="green" />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      alignSelf: "flex-start",
                      flexShrink: 1,
                    }}
                  >
                    <ThemedText style={styles.guideRating}>
                      {String(item.rating)}
                    </ThemedText>
                    <Ionicons name="star" size={12} color="gold" />
                  </View>
                  <ThemedText style={styles.guidePrice}>
                    ${item.price} / hour
                  </ThemedText>
                </View>
              </TouchableOpacity>
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
    backgroundColor: "#F5F5F5",
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
    fontWeight: "bold",
    fontSize: 45,
    fontStyle: "italic",
    color: "#FF7F50",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
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
    backgroundColor: "#FF7F50",
    padding: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    marginVertical: 15,
  },
  categoriesContainer: {
    flexDirection: "row",
  },
  categoryButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    minWidth: 140,
    height: 60,
    borderWidth: 1,
    borderColor: "#FF7F50",
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  travelPlacesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAllText: {
    color: "#FF7F50",
  },
  placesContainer: {
    paddingVertical: 10,
  },
  placeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 150,
  },
  placeImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
  },
  placeTitle: {
    fontWeight: "bold",
    marginTop: 5,
  },
  placeSubtitle: {
    color: "gray",
  },
  guidesContainer: {
    paddingVertical: 10,
  },
  guideCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 240,
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 5,
  },
  guideRating: {
    color: "gray",
    fontSize: 14,
    marginRight: 2,
  },
  verifiedBadge: {
    backgroundColor: "#4CAF50",
    color: "white",
    paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 12,
    marginTop: 2,
  },
  guidePrice: {
    color: "#FF7F50",
    fontWeight: "900",
    fontSize: 13,
  },
});
