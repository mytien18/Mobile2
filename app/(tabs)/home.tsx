import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  Alert,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// HomeScreen Component
function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Tìm kiếm..." />
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {/* Banner quảng cáo */}
      <View style={styles.banner}>
        <Image source={{ uri: 'https://dknstore.vn/wp-content/uploads/2022/04/banner-dkn-store-01.jpg'}} style={styles.bannerImage} />
  
      </View>

      {/* Danh mục */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Sản phẩm nổi bật */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Nổi bật</Text>
        <View style={styles.productContainer}>
          {products.map((product, index) => (
            <TouchableOpacity key={index} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}đ</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ProfileScreen Component
function ProfileScreen() {
  return (
    <View style={styles.centeredView}>
      <Text>Trang cá nhân</Text>
    </View>
  );
}
//detail component

const Detail = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: "iPhone 12 Pro Max 128GB",
    description:
      "Mạnh mẽ, siêu nhanh với chip A14, RAM 6GB, mạng 5G tốc độ cao",
    price: 23000000,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_251_1.jpg",
  };

  const addToCart = () => {
    Alert.alert(
      "Đã thêm vào giỏ hàng",
      `Bạn đã thêm ${quantity} sản phẩm vào giỏ hàng.`
    );
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          {product.price.toLocaleString("vi-VN")} VND
        </Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        <View style={styles.quantityContainer}>
          <Ionicons
            name="remove-circle-outline"
            size={25}
            color="black"
        
            onPress={decreaseQuantity}
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <Ionicons
            name="add-circle-outline"
            size={25}
            color="black"
            onPress={increaseQuantity}
          />
        </View>

        <Button title="Thêm vào giỏ hàng" onPress={addToCart} color="#ff33ff" />
      
      </View>
    </ScrollView>
  );
};

// App Component
export default function App() {
  const [selectedScreen, setSelectedScreen] = useState('Home'); 
  
  return (
    <View style={{ flex: 1 }}>
      {/* Hiển thị màn hình dựa trên state */}
      {selectedScreen === "Home" && <HomeScreen />}
      {selectedScreen === "Profile" && <ProfileScreen />}
      {selectedScreen === "Detail" && <Detail />}

      {/* Thanh Tab đơn giản */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setSelectedScreen("Home")}
          style={styles.tabItem}
        >
          <Ionicons name="home-outline" size={25} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedScreen("Detail")}
          style={styles.tabItem}
        >
          <Ionicons name="person-outline" size={25} color="black" />
          <Text>Sản phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedScreen("Profile")}
          style={styles.tabItem}
        >
          <Ionicons name="person-outline" size={25} color="black" />
          <Text>Tôi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Dummy data
const categories = [
  // { name: 'Son', image: require('../assets/images/logo.jpg') }, 
  { name: 'IPHONE', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro_1.png' },
  { name: 'SAMSUNG', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png'},
  { name: 'OPPO', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_4__6_73.png' },
];

const products = [
  { name: 'iPhone 16 Pro Max 256GB', price: '65,000,000 VND', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png' },
  { name: 'iPhone 14 Pro Max 512GB', price: '35,000,000', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro-256gb_1.png' },
  
];

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#FFCCCC",
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor:"#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  banner: {
    marginVertical: 10,
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  categorySection: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
  },
  featuredSection: {
    marginVertical: 10,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 25,
  },
  productInfo: {
    padding: 25,
  },
  productDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 12,
    color: "#FF0000",
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  tabItem: {
    alignItems: "center",
  },
});
