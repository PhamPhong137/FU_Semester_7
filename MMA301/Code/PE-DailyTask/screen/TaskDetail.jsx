import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TaskDetail = ({ route }) => {
  const { task } = route.params;
  const navigation = useNavigation();

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.taskImage} resizeMode="cover" />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back to List</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Task Details</Text>

      <View style={styles.detail}>
        <Text style={styles.label}>Task Name:</Text>
        <Text style={styles.value}>{task.taskName}</Text>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{task.description}</Text>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>Due Date:</Text>
        <Text style={styles.value}>{task.dueDate}</Text>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>Priority:</Text>
        <Text style={styles.value}>{task.priority}</Text>
      </View>

      {task.images && task.images.length > 0 && (
        <FlatList
          data={task.images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal // Set horizontal scrolling
          showsHorizontalScrollIndicator={false} // Optional: hide the scroll indicator
          contentContainerStyle={styles.imageList}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 100,
  },
  value: {
    flex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  imageList: {
    marginTop: 20,
  },
  taskImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5, // Optional: round the corners for a cleaner look
  },
});

export default TaskDetail;
