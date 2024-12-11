import React, { useEffect, useState } from "react";
import { View, Text, Image,  StyleSheet, ActivityIndicator, TouchableOpacity, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "@/config/firebaseConfig";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";


const renderContent = (content: any, index: number) => {
    return <View key={index} style={styles.contentItemContainer}>
        <Text style={styles.contentTitle}>{content.title}</Text>
        <Text style={styles.contentDescription} key={content.text}>{content.description}</Text>
        {content?.quote && <View style={styles.contentQuoteContainer}>
            <Text style={styles.contentQuoteText}>{content.quote.text}</Text>
            <Text style={styles.contentQuoteAuthor}>— {content.quote.author}</Text>
            </View>}

            {content?.features && <View style={styles.contentFeaturesContainer}>
                {content.features.map((feature: any, index: number) =>
                    <Text key={index}> <Text style={{fontWeight: 'bold'}}>• {feature.title}</Text> {feature.text}</Text>
                    )}
                </View>}
    </View>
}

export default function NewsDetailsScreen() {
  const [newsData, setNewsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const router = useRouter();

  const { id: newsID }: any = useLocalSearchParams();


  const fetchNewsByID = async () => {
    const q = query(collection(db, "news"), where("id", "==", newsID));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setNewsData(doc.data());
      });
    } else {
    }
  };

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      await fetchNewsByID();
      setLoading(false);
    }
    loadNews();
  }, []);


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!newsData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>News article not found.</Text>
      </View>
    );
  }

  return (
    <ParallaxScrollView
    headerImage={
      <View
        style={{
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/news")}
          style={styles.goBackButton}
        >
          <Ionicons name="arrow-back" size={18} color="black" />
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
        <Image source={{ uri: newsData.image || 'https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg' }} style={styles.headerImage} />
      </View>
    }
    headerBackgroundColor={{ light: "#F5F5F5", dark: "#000" }}
  >
    <Text style={styles.title}>{newsData.title}</Text>
      <Text style={styles.subtitle}>{newsData.description}</Text>

      <View style={styles.contentContainer}>
        {newsData.content.map((content: any, index: number) => renderContent(content, index))}
      </View>

      <View>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>Looking Ahead 👀</Text>
        {newsData.future_features.map((feature: any, index: number) => <View key={index} style={{marginTop: 10}}>
            <Text style={styles.contentTitle}>{feature.title}</Text>
            <Text style={styles.contentDescription}>{feature.description}</Text>
        </View>)}
      </View>

      <View style={{
        borderTopWidth: 3,
        borderStyle: 'dotted',
        borderColor: Colors.light.tint,
        paddingTop: 10
      }}>
        <Text  style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>{newsData.socials.title} 😊</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
  <TouchableOpacity onPress={() => Linking.openURL(newsData.socials.instagram)} style={{ marginRight: 10 }}>
    <Ionicons name="logo-instagram" size={50} color="#c32aa3" />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => Linking.openURL(newsData.socials.telegram)}>
    <FontAwesome5 name="telegram-plane" size={50} color="#0088cc" />
  </TouchableOpacity>
</View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    goBackButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
      },
      goBackButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
      },
      headerImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
      },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#333",
  },
  quoteContainer: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quoteText: {
    fontStyle: "italic",
    color: "#555",
  },
  quoteAuthor: {
    textAlign: "right",
    color: "#333",
    marginTop: 8,
  },
  socialLink: {
    fontSize: 16,
    color: "#007BFF",
    marginBottom: 4,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "#e74c3c",
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contentDescription: {
    fontSize: 16,
  },
  contentQuoteContainer: {
    marginLeft: 16,
    paddingLeft: 16,
    paddingVertical: 8,
    marginTop: 8,
    borderLeftWidth: 2,
    borderLeftColor: Colors.light.tint,
  },
  contentQuoteText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  contentQuoteAuthor: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '600'
  },
  contentFeaturesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 10
  },
  contentFeaturesItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  contentItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.tint,
    paddingBottom: 12,
    borderStyle: 'dashed',
  }
});
