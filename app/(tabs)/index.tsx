import React, { useState, useEffect } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
const logo = require("../../assets/images/lfsg_icon.png");
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export var loggedIn = false;

export default function HomeScreen() {
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const firebaseAuth = auth;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
      alert('Sign in successful!');
      console.log(response);
      loggedIn = true;
      
      // Clear email and password fields after successful login
      setEmail("");
      setPassword("");
  
      router.replace('./new user');
      router.replace('./post');
      router.replace('./groups');
    } catch (error) {
      console.log(error);
      alert('Sign in failed\n' + error);
    } finally {
      setLoading(false);
    }
  };  

  const signUp = async () => {
    setLoading(true);
    try {
      router.replace('./new user');
    } catch (error) {
      console.log(error);
      alert('Sign up failed\n' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      loggedIn = false;
      router.replace('./');
      alert('Logged out successfully!');
    } catch (error) {
      console.log(error);
      alert('Sign out failed\n' + error);
    }
  };

  const clearInput = (setter) => {
    setter("");
  };

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>LFSG</Text>
        <Image source={logo} style={styles.image} resizeMode='contain' />
        <View style={styles.inputView}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='EMAIL'
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
              autoCapitalize='none'
              placeholderTextColor={"black"}
            />
            {email ? (
              <Pressable style={styles.clearButton} onPress={() => clearInput(setEmail)}>
                <Text style={styles.clearButtonText}>X</Text>
              </Pressable>
            ) : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='PASSWORD'
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              autoCapitalize='none'
              placeholderTextColor={"black"}
            />
            {password ? (
              <Pressable style={styles.clearButton} onPress={() => clearInput(setPassword)}>
                <Text style={styles.clearButtonText}>X</Text>
              </Pressable>
            ) : null}
          </View>
        </View>

        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
        </View>

        <Text style={styles.footerText}>Don't Have an Account?
          <Pressable onPress={signUp}>
            <Text style={styles.signup}>  Sign Up</Text>
          </Pressable>
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container1}>
      <Text style={styles.title}>LFSG</Text>
      <Image source={logo} style={styles.image} resizeMode='contain' />
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
  },
  container1: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',      // Centers content horizontally
  },
  image: {
    height: 160,
    width: 170
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "green"
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginTop: 50,
    marginBottom: 50
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 7
  },
  clearButton: {
    padding: 10,
  },
  clearButtonText: {
    fontSize: 16,
    color: 'red',
  },
  button: {
    backgroundColor: "green",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginBottom: 50
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  signup: {
    color: "blue",
    fontSize: 13
  }
});
