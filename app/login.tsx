import Ionicons from '@expo/vector-icons/Ionicons';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-native-paper';
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    width: '80%', // Adjusted width for better alignment
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 8,
  },
  loginButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#0000CC',
    borderRadius: 8,
    marginTop: 20,
  },
  registerText: {
    marginBottom: 10,
    marginRight: 20,
    color: '#0000CC',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    marginRight: 20,
  },
  Logo: {
    width: 66,
    height: 58,
    marginBottom: 20,
  },
});

export default function LoginScreen({}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    Alert.alert('Login attempt', `Email: ${email}, Password: ${password}`);
  };
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      {/* Correct image loading */}
      <Image style={styles.Logo} source={require('../assets/images/logo.jpg')} />
      
      <Text style={styles.title}>Login</Text>

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

      {/* Attach onPress event to Button */}
      <Button mode="contained" style={styles.loginButton} onPress={() => navigate('/home')}>
        Login
      </Button>

      <Text style={styles.text}>
        Don't have an account
      </Text>
      
      <Text
        style={styles.registerText}
        onPress={() => navigate('/signup')}
        
      > 
         Sign up
      </Text>
      
    </View>
  );
}
