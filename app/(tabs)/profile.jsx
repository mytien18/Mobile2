export default function Profile() {
    const [user, setUser] = useState(null);
    const router = useRouter();
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userData = await AsyncStorage.getItem("user");
          if (userData) {
            setUser(JSON.parse(userData));
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
        }
      };
  
      fetchUserData();
    }, []);
  
    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem("user");
        router.push("/auth");
      } catch (error) {
        console.error("Failed to logout:", error);
      }
    };
  
    const handleChangePassword = () => {
      router.push("/auth/change-password");
    };
  
    const handleFavorites = () => {
      router.push("/product/favorite-products");
    };
  
    const menuItems = [
      {
        title: "Favorite Products",
        icon: "heart-outline",
        onPress: handleFavorites,
      },
      {
        title: "Change Password",
        icon: "lock-closed-outline",
        onPress: handleChangePassword,
      },
      {
        title: "Logout",
        icon: "log-out-outline",
        onPress: handleLogout,
      },
    ];
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🐾 My Profile 🐾</Text>
        <Image
          source={require("./../../assets/images/logo.jpg")}
          style={styles.image}
        />
  
        {user ? (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Name: <Text style={styles.boldText}>{user.name}</Text>
            </Text>
            <Text style={styles.infoText}>
              Email: <Text style={styles.boldText}>{user.email}</Text>
            </Text>
            <Text style={styles.infoText}>
              Phone: <Text style={styles.boldText}>{user.phone || "N/A"}</Text>
            </Text>
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading user information...</Text>
        )}
  
        <FlatList
          data={menuItems}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={item.onPress} style={styles.menuItem}>
              <Ionicons
                name={item.icon}
                size={24}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.menuContainer}
        />
      </View>
    );
  }