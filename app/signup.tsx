import Ionicons from '@expo/vector-icons/Ionicons';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-native-paper';
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Alert,
  Text,
} from 'react-native';





export default function RegisterScreen() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = () => {
    Alert.alert('Registration attempt', `Name: ${name}, Email: ${email}, Password: ${password}`);
  };
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <Image style={styles.Logo} source={require('../assets/images/logo.jpg')} />
      
      <Text style={styles.title}>Register</Text>

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

      <Button mode="contained" style={styles.registerButton} onPress={handleRegister}>
        Register
      </Button>

      <Text
        style={styles.loginText}
        onPress={() => navigate('/login')}
        
      > 
         Login
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    input: {
      height: 50,
      width: '80%',
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
      paddingLeft: 10,
      borderRadius: 8,
    },
    registerButton: {
      width: '80%',
      height: 50,
      justifyContent: 'center',
      backgroundColor: '#0000CC',
      borderRadius: 8,
      marginTop: 20,
    },
    loginText: {
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
    Logo: {
      width: 66,
      height: 58,
      marginBottom: 20,
    },
});
