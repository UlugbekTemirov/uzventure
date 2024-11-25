import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

// const guides = Array.from({ length: 10 }, (_, index) => ({
//   id: index.toString(),
//   name: `Ulugbek Temirov`,
//   avatar: `https://randomuser.me/api/portraits/men/${index}.jpg`,
//   isOnline: index % 2 === 0,
//   isVerified: index % 3 === 0,
//   rating: (index + 1) / 2,
//   location: `Bukhara, Uzbekistan`,
//   languages: ["English", "Spanish", "German"],
//   price: `$${(index + 1) * 10}`,
//   reviews: index,
// }));

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

const GuidesPage = () => {
const router = useRouter()

const [guides, setGuides] = useState<any>([]);
const [loading, setLoading] = useState(false)

useEffect(() => {
  async function loadGuides() {
    setLoading(true)
    const data = await fetchGuides();
    setGuides(data);
    setLoading(false)
  }
  loadGuides();
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
      <ThemedText style={styles.header}>Guides</ThemedText>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#fff" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {loading ? 'loading' : <FlatList
      contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}
        data={guides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/guides/${item.id}` as any)} activeOpacity={0.8} style={styles.card}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              {item.isOnline && <View style={styles.onlineBadge} />}
            </View>

            <View style={styles.infoContainer}>
                <View>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.isVerified && (
                      <MaterialIcons name="verified" size={16} color="green" />
                    )}
                  </View>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={16} color="black" />
                    <Text style={styles.details}> {item.location}</Text>
                  </View>
                </View>

              
              <View style={styles.languagesRow}>
                <Ionicons name="language" size={16} color="black" />
                {item.languages.map((language: any, index: number) => (
                  <Text key={index} style={styles.languages}>
                    {language.name}
                  </Text>
                ))}
              </View>

              <View style={styles.languagesRow}>
                <Ionicons name="cash-outline" size={16} color="black" />
                <ThemedText style={styles.languages}>
                   ${item.price} / hour
                </ThemedText>
              </View>
            </View>

            <View style={styles.ratingRow}>
                  <Ionicons name="star" size={16} color="gold" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
          </TouchableOpacity>
        )}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  languagesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  filterButton: {
    backgroundColor: "#FF7F50",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
  },
  filterText: {
    color: "#fff",
    marginLeft: 5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 15,
    height: 60,
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  onlineBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  details: {
    fontSize: 14,
    color: "#333",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  languages: {
    marginLeft: 3,
    fontSize: 14,
    color: "#333",
    // line clamp 1
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default GuidesPage;
