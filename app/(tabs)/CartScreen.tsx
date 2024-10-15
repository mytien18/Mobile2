import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Product = {
  id: string;
  name: string;
  price: number;
  image: any;
};

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: "iPhone 16 Pro Max 256GB",
      price: 65000000,
      image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png',
    },
    {
      id: '2',
    name: 'iPhone 14 Pro Max 512GB',
    price: 35000000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro-256gb_1.png',
    },
    {
      
        id: '3',
        name: 'iPhone 15 Plus 128GB',
        price: 22000000,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png',
    },
  ]);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    "1": 1,
    "2": 1,
    "3": 1,
  });

  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  const handleIncrease = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id: string) => {
    setQuantities((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      }
      return prev;
    });
  };

  const handleRemove = (id: string) => {
    Alert.alert("Xóa sản phẩm", "Bạn có chắc muốn xóa sản phẩm này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          setProducts((prev) => prev.filter((product) => product.id !== id));
          setQuantities((prev) => {
            const newQuantities = { ...prev };
            delete newQuantities[id];
            return newQuantities;
          });
        },
      },
    ]);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      const quantity = quantities[product.id] || 1;
      return total + product.price * quantity;
    }, 0);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleRemove(item.id)}>
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>
          {item.price.toLocaleString()} VND
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleDecrease(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id]}</Text>
          <TouchableOpacity
            onPress={() => handleIncrease(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleCheckboxChange(item.id)}>
        <MaterialIcons
          name={
            selectedProducts[item.id] ? "check-box" : "check-box-outline-blank"
          }
          size={24}
          color="green"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Giỏ hàng trống</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Tổng tiền: {getTotalPrice().toLocaleString()} VND
        </Text>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cart;
