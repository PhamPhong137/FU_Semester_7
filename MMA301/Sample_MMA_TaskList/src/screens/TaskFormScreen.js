import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function TaskFormScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [images, setImages] = useState([]); // State để lưu danh sách hình ảnh
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId } = route.params || {};

  useEffect(() => {
    if (taskId) loadTask(taskId);
    requestPermission();
  }, [taskId]);

  // Yêu cầu quyền truy cập ảnh trên thiết bị
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access media library is required.');
    }
  };

  const loadTask = async (id) => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = JSON.parse(storedTasks);
      const task = tasks.find(t => t.id === id);
      if (task) {
        setName(task.name);
        setDescription(task.description);
        setDueDate(task.dueDate);
        setPriority(task.priority);
        setImages(task.images || []);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load task');
    }
  };

  const saveTask = async () => {
    if (!name || !dueDate) {
      Alert.alert('Error', 'Please fill out the name and due date fields');
      return;
    }
    try {
      const newTask = { id: taskId || Date.now(), name, description, dueDate, priority, images };
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      if (taskId) {
        const updatedTasks = tasks.map(t => (t.id === taskId ? newTask : t));
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } else {
        await AsyncStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
      }
      navigation.navigate('TaskList');
    } catch (error) {
      Alert.alert('Error', 'Failed to save task');
    }
  };

  const selectImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages(prevImages => [...prevImages, ...selectedImages]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Due Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter due date (e.g., 2023-12-31)"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        {['High', 'Medium', 'Low'].map(level => (
          <TouchableOpacity
            key={level}
            style={[styles.priorityButton, priority === level && styles.selectedPriorityButton]}
            onPress={() => setPriority(level)}
          >
            <Text style={[styles.priorityButtonText, priority === level && styles.selectedPriorityText]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.imageButton} onPress={selectImages}>
        <Text style={styles.imageButtonText}>Select Images</Text>
      </TouchableOpacity>

      <ScrollView horizontal style={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.imagePreview} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 10,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedPriorityButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  priorityButtonText: {
    fontSize: 16,
    color: '#666',
  },
  selectedPriorityText: {
    color: '#fff',
  },
  imageButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imagePreview: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
