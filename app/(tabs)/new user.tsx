import React, { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const logo = require("../../assets/images/lfsg_icon.png");
import { auth, db } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { loggedIn } from './index';

export default function newUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true);
        setEmail("")
        setPassword("")
        setPhone("")
        setUsername("")
        
        try {
            var response = await createUserWithEmailAndPassword(auth, email, password);
            alert('Sign up successful!');
            await addDoc(collection(db, "users"), {
                email: email,
                phone: phone,
                username: username,
            });
        } catch (error) {
            console.log(error);
            alert('Sign up failed\n' + error);
        } finally {
            setLoading(false);
        }
    };

    const clearInput = (setter) => {
        setter("");
    };
    if(loggedIn){
        return(
            <SafeAreaView style={styles.container1}>
            <Text style={styles.title}>LFSG</Text>
            <Image source={logo} style={styles.image} resizeMode='contain' />
            </SafeAreaView>
          )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                            <TouchableOpacity style={styles.clearButton} onPress={() => clearInput(setEmail)}>
                                <Text style={styles.clearButtonText}>X</Text>
                            </TouchableOpacity>
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
                            <TouchableOpacity style={styles.clearButton} onPress={() => clearInput(setPassword)}>
                                <Text style={styles.clearButtonText}>X</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='USERNAME'
                            value={username}
                            onChangeText={setUsername}
                            autoCorrect={false}
                            autoCapitalize='none'
                            placeholderTextColor={"black"}
                        />
                        {username ? (
                            <TouchableOpacity style={styles.clearButton} onPress={() => clearInput(setUsername)}>
                                <Text style={styles.clearButtonText}>X</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='PHONE'
                            value={phone}
                            onChangeText={setPhone}
                            autoCorrect={false}
                            autoCapitalize='none'
                            placeholderTextColor={"black"}
                        />
                        {phone ? (
                            <TouchableOpacity style={styles.clearButton} onPress={() => clearInput(setPhone)}>
                                <Text style={styles.clearButtonText}>X</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>

                <View style={styles.buttonView}>
                    <Pressable style={styles.button} onPress={submit} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? "Loading..." : "Submit"}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container1: {
        flex: 1,
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center',      // Centers content horizontally
    },
    scrollContainer: {
        alignItems: "center",
        paddingTop: 50,
    },
    image: {
        height: 160,
        width: 170,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 40,
        color: "green",
    },
    inputView: {
        width: "100%",
        paddingHorizontal: 40,
        marginTop: 30,
        marginBottom: 50,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 20,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 7,
    },
    clearButton: {
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    clearButtonText: {
        fontSize: 16,
        color: 'red',
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 50,
        marginBottom: 50,
    },
    button: {
        backgroundColor: "green",
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
