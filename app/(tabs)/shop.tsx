import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export default function ShoppingPage() {
  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const productsData: any = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product: any) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleProductPress = (product: any) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleContactPress = (number: string) => {
    Linking.openURL(`tel:${number}`).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.nativeEvent.text)}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={20} color="#555" style={styles.searchIcon} />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleProductPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description.slice(0, 20)}...</Text>
            <View style={{
              display: 'flex',
              flexDirection: 'row', justifyContent: 'space-between'
            }}>
            <Text style={styles.productPrice}>${String(item.price) + ".00"}</Text>

            <Text style={styles.productRating}>5.0 ★</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedProduct?.image }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
            <Text style={styles.modalDescription}>{selectedProduct?.description}</Text>
            <Text style={styles.modalPrice}>Price: ${selectedProduct?.price + ".00"}</Text>
            <Text style={styles.modalShopName}>Shop: {selectedProduct?.shopName}</Text>
            <Text style={styles.modalSellerName}>Seller: {selectedProduct?.sellerName}</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => handleContactPress(selectedProduct?.phoneNumber)}
              >
                <Text style={styles.contactText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleContactPress(selectedProduct?.phoneNumber)} style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Buy now</Text>
              </TouchableOpacity>
            </View>

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
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#555",
  },
  searchIcon: {
    marginLeft: 10,
  },
  productList: {
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    margin: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "47%",
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "left",
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#FF7F50",
    fontWeight: "bold",
    textAlign: "left",
  },
  productRating: {
    fontSize: 14,
    color: "#555",
    textAlign: "right",
  },
  productAvailability: {
    fontSize: 12,
    color: "#555",
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 16,
    color: "#FF7F50",
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalShopName: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  modalSellerName: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  contactButton: {
    backgroundColor: "#F0F2F4",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  contactText: {
    fontWeight: "bold",
    color: "#111",
  },
  addToCartButton: {
    backgroundColor: "#FF7F50",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  addToCartText: {
    fontWeight: "bold",
    color: "#FFF",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
