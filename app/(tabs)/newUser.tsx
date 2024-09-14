import React, { useState, useEffect } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
const logo = require("../../assets/images/lfsg_icon.png")
import {auth, db} from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import { LogBox } from "react-native";
import { collection, addDoc } from 'firebase/firestore';


export default function newUser()
{
    const [click,setClick] = useState(false);
    const [email,setEmail]=  useState("");
    const [password,setPassword]=  useState("");
    const [phone, setPhone]= useState("");
    const [username, setUsername]= useState("");
    const [loading,setLoading]= useState(false);

    const submit = async () => {
        setLoading(true);
        try {
            var response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            await addDoc( collection(db, "users"), {
                email : email,
                phone : phone,
                username : username,
            });
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
              <TextInput style={styles.input} placeholder='USERNAME' secureTextEntry value={username} onChangeText={setUsername} autoCorrect={false}
          autoCapitalize='none' placeholderTextColor={"black"}/>
              <TextInput style={styles.input} placeholder='PHONE' secureTextEntry value={phone} onChangeText={setPhone} autoCorrect={false}
          autoCapitalize='none' placeholderTextColor={"black"}/>
          </View>
      
          <View style={styles.buttonView}>
              <Pressable style={styles.button} onPress={submit}>
                  <Text style={styles.buttonText}>Submit</Text>
              </Pressable>
      
          </View>
      
          
        </SafeAreaView>
        );
        /*
        return(
          <SafeAreaView style={styles.container1}>
          <Text style={styles.title}>LFSG</Text>
          <Image source={logo} style={styles.image} resizeMode='contain' />
          </SafeAreaView>
        )
        */
      }
      
      const styles = StyleSheet.create({
        container : {
          alignItems : "center",
          paddingTop: 70,
        },
        container1: {
          flex: 1,
          justifyContent: 'center', // Centers content vertically
          alignItems: 'center',      // Centers content horizontally
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
    }
)