import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { loggedIn } from './index';

interface StudyGroup {
    id: string;
    name: string;
    description: string;
}

const studyGroups = [
    { id: '1', name: 'Coding Help', description: 'Boost your coding skills with us! When: Tues & Thurs, 6 PM Where: Room 203, Engineering Building'},
    { id: '2', name: 'Chemistry Study Buddies', description: 'Get help with chemistry problems and labs. When: Fridays, 2 PM Where: Science Hall, Room 410' },
    { id: '3', name: 'Calculus Study Group', description: 'Master calculus concepts and prep for exams. When: Mondays, 4 PM Where: Library, Study Room B' },
  ];

export default function post() {
    //alert(loggedIn);
    if(loggedIn){
    const renderGroupItem = ({ item }: { item: StudyGroup }) => (
        <View style={styles.groupItem}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupDescription}>{item.description}</Text>
        </View>
        );        
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Post a Study Group Ad</Text>
        <FlatList
          data={studyGroups}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item.id}
        />
      </View> 
    );
    }
    return <Text style={styles.alert}>Please login to create a study group.</Text>
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
      marginTop: 30
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
  