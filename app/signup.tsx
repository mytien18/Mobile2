import { useNavigate } from "react-router-dom";
import { Button } from "react-native-paper";
import React from "react";
import { StyleSheet, View, TextInput, Image, Alert, Text } from "react-native";
import axios from "axios"; // Import axios nếu bạn sử dụng axios

export default function RegisterScreen() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showSuccess, setShowSuccess] = React.useState(false); // State để kiểm soát việc hiển thị thông báo thành công

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("https://fakestoreapi.com/users", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setShowSuccess(true); // Hiển thị thông báo thành công
        // setTimeout(() => {
        //   navigate("/home"); // Chuyển hướng đến trang home sau 2 giây
        // }, 2000);
      } else {
        Alert.alert("Đăng ký thất bại. Hãy thử lại.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Đã xảy ra lỗi. Hãy thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.Logo}
        source={require("../assets/images/logo.jpg")}
      />

      <Text style={styles.title}>Đăng ký</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />

      <Button
        mode="contained"
        style={styles.registerButton}
        onPress={handleRegister} // Gọi handleRegister khi ấn nút Đăng ký
      >
        Đăng ký
      </Button>

      <Text style={styles.loginText} onPress={() => navigate("/login")}>
        Đăng nhập
      </Text>

      {/* Hiển thị thông báo đăng ký thành công */}
      {showSuccess && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Đăng ký thành công!</Text>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFCCCC",
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "#FF3366",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 8,
  },
  registerButton: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    backgroundColor: "#FF3366",
    borderRadius: 8,
    marginTop: 20,
  },
  loginText: {
    marginBottom: 10,
    marginRight: 20,
    color: "#FF3366",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  Logo: {
    width: 66,
    height: 58,
    marginBottom: 20,
  },
  successContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#d4edda", // Màu nền xanh nhạt để hiển thị thành công
    borderColor: "#FF3366", // Màu viền xanh nhạt
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center", // Căn giữa nội dung
  },
  successText: {
    color: "#FF3366", // Màu chữ xanh đậm
    fontSize: 18,
    fontWeight: "bold",
  },
});