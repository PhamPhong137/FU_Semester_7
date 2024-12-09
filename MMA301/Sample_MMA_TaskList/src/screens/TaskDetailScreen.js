import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function TaskDetailScreen() {
  const [task, setTask] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId } = route.params;

  useEffect(() => {
    loadTask(taskId);
  }, [taskId]);

  const loadTask = async (id) => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = JSON.parse(storedTasks);
      const task = tasks.find(t => t.id === id);
      setTask(task);
    } catch (error) {
      Alert.alert('Error', 'Failed to load task');
    }
  };

  const deleteTask = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = JSON.parse(storedTasks);
      const updatedTasks = tasks.filter(t => t.id !== taskId);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  if (!task) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{task.name}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{task.description}</Text>

      <Text style={styles.label}>Due Date:</Text>
      <Text style={styles.value}>{task.dueDate}</Text>

      <Text style={styles.label}>Priority:</Text>
      <Text style={styles.value}>{task.priority}</Text>

      {task.images && task.images.length > 0 && (
        <>
          <Text style={styles.label}>Attached Images:</Text>
          <ScrollView horizontal style={styles.imageContainer}>
            {task.images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.imagePreview} />
            ))}
          </ScrollView>
        </>
      )}

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}
      >
        <Text style={styles.buttonText}>Edit Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={deleteTask}>
        <Text style={styles.buttonText}>Delete Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
