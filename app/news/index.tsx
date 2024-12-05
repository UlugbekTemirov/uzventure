import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function NewsScreen() {
  const router = useRouter();
  const [news, setNews] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const newsList: any = [];
      querySnapshot.forEach((doc) => {
        newsList.push({ id: doc.id, ...doc.data() });
      });
      return newsList;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  };

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      const data = await fetchNews();
      setNews(data);
      setLoading(false);
    }
    loadNews();
  }, []);

  const renderNewsItems = () =>
    news.map((item: any) => (
      <TouchableOpacity
        key={item.id}
        style={styles.newsItem}
        onPress={() => router.push(`/news/${item.id}`)}
      >
        <Image
          source={{
            uri: item.image || "https://via.placeholder.com/150",
          }}
          style={styles.newsImage}
        />
        <View style={styles.newsTextContainer}>
          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsSubtitle}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    ));

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
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.goBackButton}
          >
            <Ionicons name="arrow-back" size={18} color="black" />
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg",
            }}
            style={styles.headerImage}
          />
        </View>
      }
      headerBackgroundColor={{ light: "#F5F5F5", dark: "#1D1D1D" }}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.newsList}
          showsVerticalScrollIndicator={false}
        >
          {renderNewsItems()}
        </ScrollView>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "relative",
  },
  goBackButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  goBackButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  headerImage: {
    width: "100%",
    height: '100%',
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  newsList: {
    paddingBottom: 16,
  },
  newsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    elevation: 3,
    height: 120,
  },
  newsImage: {
    width: 120,
    height: "100%",
  },
  newsTextContainer: {
    flex: 1,
    padding: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  newsSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});
