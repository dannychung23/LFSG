import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
            <FlatList
                data={studyGroups}
                renderItem={renderGroupItem}
                keyExtractor={(item) => item.id}
            />
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
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 50
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
});
