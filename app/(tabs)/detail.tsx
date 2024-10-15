// App.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Detail = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: "Son Mistine V6",
    description:
      "Màu son mới cho bộ sưu tập thu đông, mang đến sự cuốn hút và thời thượng.",
    price: 215000,
    image:
      "https://img.ltwebstatic.com/images3_spmp/2024/07/11/c4/17206933248c8e9509bf209617d0edc44397ee269b_thumbnail_750x999.webp", 
  };

  const addToCart = () => {
    Alert.alert(
      "Đã thêm vào giỏ hàng",
      `Bạn đã thêm ${quantity} sản phẩm vào giỏ hàng.`
    );
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
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
          <TouchableOpacity onPress={decreaseQuantity}>
            <Ionicons name="remove-circle-outline" size={30} color="#555" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity}>
            <Ionicons name="add-circle-outline" size={30} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  productImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  productInfo: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productName: {
    fontSize: 26,
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
    color: "#777",
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
});

export default Detail;
