import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, FlatList, TouchableOpacity, Alert } from 'react-native';
import { loggedIn } from './index';
import { doc, setDoc, deleteDoc, onSnapshot, collection } from "firebase/firestore"; 
import { db } from '../../FirebaseConfig';
import { getDocs } from "firebase/firestore";

async function getGroupCount() {
  try {
      const querySnapshot = await getDocs(collection(db, "groups"));
      const count = querySnapshot.size;
      return count + 1;
  } catch (err) {
      console.error("Error fetching document count: ", err);
      return 0;
  }
}

export default function Post() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [studyGroups, setStudyGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
            const groupsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description
            }));
            setStudyGroups(groupsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const postGroup = async () => {
        try {
            const id = (await getGroupCount()).toString();
            await setDoc(doc(db, "groups", id), {
                name: name,
                description: description,
            });
            alert('Posted Study Group!');
        } catch (error) {
            console.log(error);
            alert('Post failed\n' + error);
        }
    };

    const deleteGroup = async (groupId) => {
        try {
            await deleteDoc(doc(db, "groups", groupId));
            alert("Group deleted successfully!");
        } catch (error) {
            console.log("Error deleting group:", error);
            alert("Failed to delete group.");
        }
    };

    const confirmDelete = (groupId) => {
        Alert.alert(
            "Delete Group",
            "Are you sure you want to delete this group?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteGroup(groupId) }
            ]
        );
    };

    const renderGroupItem = ({ item }) => (
        <View style={styles.groupItem}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupDescription}>{item.description}</Text>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(item.id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const clearInput = (setter) => {
        setter("");
    };

    if (!loggedIn) {
        return <Text style={styles.alert}>Please login to create a study group.</Text>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Post a Study Group</Text>
        <View style={styles.inputView}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Name of group'
              value={name}
              onChangeText={setName}
              autoCorrect={false}
              autoCapitalize='none'
              placeholderTextColor={"black"}
            />
            {name ? (
              <TouchableOpacity style={styles.clearButton} onPress={() => clearInput(setName)}>
                <Text style={styles.clearButtonText}>X</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Description (with time & place)'
              value={description}
              onChangeText={setDescription}
              autoCorrect={false}
              autoCapitalize='none'
              placeholderTextColor={"black"}
            />
            {description ? (
              <TouchableOpacity style={styles.clearButton} onPress={() => clearInput(setDescription)}>
                <Text style={styles.clearButtonText}>X</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={postGroup}>
              <Text style={styles.buttonText}>POST</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>Study Groups</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={studyGroups}
            renderItem={renderGroupItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
}

// Styles for the component
const styles = StyleSheet.create({
  alert: {
    marginTop: 50
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginTop: 20,
    marginBottom: 30,
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
    marginLeft: 10,
    padding: 10,
  },
  clearButtonText: {
    fontSize: 16,
    color: 'red',
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginBottom: 30,
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
  groupItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ff5c5c',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
