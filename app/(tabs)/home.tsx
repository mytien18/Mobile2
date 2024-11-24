import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
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
import CartScreen from '../CartScreen';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
type Product = {
  id: string;
  name: string;
  price: number;
  image: any; // Dùng kiểu any cho ảnh nếu không xác định cụ thể
};

// HomeScreen Component
function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data); // Cập nhật state sản phẩm
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        setError("Không thể lấy sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Gọi hàm fetch khi component được render
    
  }, []);

  if (loading) {
    return <Text>Đang tải...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  
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
              <Text style={styles.productName}>{product.title}</Text>
              <Text style={styles.productPrice}>{product.price}đ</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {products.map((product, index) => (
  <TouchableOpacity
    key={index}
    style={styles.productCard}
    onPress={() => navigation.navigate('Detail', { productId: product.id })} // Gọi hàm navigate
  >
    <Image source={{ uri: product.image }} style={styles.productImage} />
    <Text style={styles.productName}>{product.title}</Text>
    <Text style={styles.productPrice}>{product.price}đ</Text>
  </TouchableOpacity>
))}
    </ScrollView>
  );
}

// ProfileScreen Component
function ProfileScreen() {
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    profileImage: "https://example.com/profile.jpg", // Thay thế bằng URL ảnh đại diện thực tế
  };
  return (
    <View style={styles.container}>
      {/* Ảnh đại diện */}
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      
      {/* Thông tin người dùng */}
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>

      {/* Các nút chức năng */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Cài đặt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//detail component

const Detail = ({ route }) => {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Text>Đang tải sản phẩm...</Text>;
  }

  // Hiển thị thông tin sản phẩm
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productPrice}>
          {product.price.toLocaleString("vi-VN")} VND
        </Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        {/* Thêm các thành phần khác nếu cần */}
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
      {selectedScreen === "Detail" && <Detail route={undefined} />}
      {selectedScreen === "CartScreen" && <CartScreen />}
      {/* Thanh Tab đơn giản */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setSelectedScreen("Home")}
          style={styles.tabItem}
        >
          <Ionicons name="home-outline" size={25} color="pink" />
          <Text>Home</Text>
        </TouchableOpacity>

      
        <TouchableOpacity
          onPress={() => setSelectedScreen("Detail")}
          style={styles.tabItem}
        >
          <Ionicons name="person-outline" size={25} color="pink" />
          <Text>Sản phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedScreen("CartScreen")}
          style={styles.tabItem}
        >
          <Ionicons name="cart-outline" size={25} color="pink" />
          <Text>Giỏ hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedScreen("Profile")}
          style={styles.tabItem}
        >
          <Ionicons name="person-outline" size={25} color="pink" />
          <Text>Tôi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Dummy data
const categories = [
  // { name: 'Son', image: require('../assets/images/logo.jpg') }, 
  { name: 'IPHONE'},
  { name: 'SAMSUNG'},
  { name: 'OPPO'},
];

const products = [
  { name: 'iPhone 16 Pro Max 256GB', price: '65,000,000 VND', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png' },
  { name: 'iPhone 14 Pro Max 512GB', price: '35,000,000', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro-256gb_1.png' },
  {name: 'Samsung Galaxy S23 Ultra',price: '45,000,000', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s23-ultra.png'},
  {name: 'Samsung Galaxy S23 Ultra',price: '45,000,000', image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s23-ultra.png'},

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
    width: "40%",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
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
  productImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  productInfo: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productName: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  productPrice: {
    fontSize: 22,
    color: "#e74c3c",
    fontWeight: "600",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#500",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quantity: {
    fontSize: 22,
    fontWeight: "500",
    marginHorizontal: 15,
  },
  addToCartButton: {
    backgroundColor: "#ff6347",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  userEmail: {
    fontSize: 18,
    color: '#777',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
  },
});
