import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Pressable } from 'react-native';
import { loggedIn } from './index';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../FirebaseConfig';

interface StudyGroup {
    id: string;
    name: string;
    description: string;
}

export default function Groups() {
    const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<StudyGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        if (loggedIn) {
            const unsubscribe = onSnapshot(
                collection(db, "groups"),
                (snapshot) => {
                    const groupsData: StudyGroup[] = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                    }));
                    setStudyGroups(groupsData);
                    setFilteredGroups(groupsData); // Initially set filtered groups to all groups
                    setLoading(false);
                },
                (err) => {
                    console.error("Error fetching groups: ", err);
                    setError("Failed to load study groups.");
                    setLoading(false);
                }
            );

            // Clean up the listener when the component is unmounted
            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [loggedIn]);

    useEffect(() => {
        // Filter the study groups based on the search query
        const filtered = studyGroups.filter(group =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGroups(filtered);
    }, [searchQuery, studyGroups]);

    const renderGroupItem = ({ item }: { item: StudyGroup }) => (
        <View style={styles.groupItem}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupDescription}>{item.description}</Text>
        </View>
    );

    if (!loggedIn) {
        return <Text style={styles.alert}>Please login to see the study groups.</Text>;
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.alert}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Study Groups for You</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search groups..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery ? (
                    <Pressable style={styles.clearButton} onPress={() => setSearchQuery('')}>
                        <Text style={styles.clearButtonText}>X</Text>
                    </Pressable>
                ) : null}
            </View>
            <FlatList
                data={filteredGroups}
                renderItem={renderGroupItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.alert}>No groups found</Text>}
            />
        </View>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    alert: {
      marginTop: 50,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 50,
    },
    groupItem: {
      padding: 15,
      marginVertical: 8,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
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
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    clearButton: {
      padding: 10,
      marginLeft: 5,
    },
    clearButtonText: {
      fontSize: 16,
      color: 'red',
    },
});
