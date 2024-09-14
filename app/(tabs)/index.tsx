import React, { useState, useEffect } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
const logo = require("../../assets/images/lfsg_icon.png")
import {auth} from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
export default function HomeScreen() {
  
  const [click,setClick] = useState(false);
  const [email,setEmail]=  useState("");
  const [password,setPassword]=  useState("");
  const [loading,setLoading]= useState(false);
  const firebaseAuth = auth;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
      alert('Sign in successful!')
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Sign in failed\n' + error);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      console.log(response);
      alert('Check your email');
    } catch (error) {
      console.log(error);
      alert('Sign up failed\n' + error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>LFSG</Text>
    <Image source={logo} style={styles.image} resizeMode='contain' />
    <View style={styles.inputView}>
        <TextInput style={styles.input} placeholder='EMAIL' value={email} onChangeText={setEmail} autoCorrect={false}
    autoCapitalize='none' placeholderTextColor={"black"}/>
        <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
    autoCapitalize='none' placeholderTextColor={"black"}/>
    </View>
    <View style={styles.rememberView}>
        <View style={styles.switch}>
            <Switch  value={click} onValueChange={setClick} trackColor={{true : "green" , false : "gray"}} />
            <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <View>
            <Pressable onPress={() => Alert.alert("Forget Password!")}>
                <Text style={styles.forgetText}>Forgot Password?</Text>
            </Pressable>
        </View>
    </View>

    <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>

    </View>

    <Text style={styles.footerText}>Don't Have Account?
      <Pressable onPress={signUp}>
        <Text style={styles.signup}>  Sign Up</Text>
      </Pressable>
    </Text>

    
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    paddingTop: 70,
  },
  image : {
    height : 160,
    width : 170
  },
  title : {
    fontSize : 30,
    fontWeight : "bold",
    textTransform : "uppercase",
    textAlign: "center",
    paddingVertical : 40,
    color : "green"
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginTop : 50,
    marginBottom  :50
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "green",
    borderWidth : 1,
    borderRadius: 7
  },
  rememberView : {
    width : "100%",
    paddingHorizontal : 50,
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "row",
    marginBottom : 50
  },
  switch :{
    flexDirection : "row",
    gap : 1,
    justifyContent : "center",
    alignItems : "center"
    
  },
  rememberText : {
    fontSize: 13
  },
  forgetText : {
    fontSize : 11,
    color : "blue"
  },
  button : {
    backgroundColor : "green",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center"
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  }, 
  buttonView :{
    width : "100%",
    paddingHorizontal : 50,
    marginBottom : 50
  },
  footerText : {
    textAlign: "center",
    color : "gray",
  },
  signup : {
    color : "blue",
    fontSize : 13
  }
})