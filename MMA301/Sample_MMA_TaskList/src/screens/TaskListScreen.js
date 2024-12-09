import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CustomRadioButton from '../components/CustomRadioButton'
import CustomSearchBar from '../components/CustomSearchBar'

export default function TaskListScreen() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const [priority, setPrioritys] = useState(["Low", "Medium", "High", "All"]);

  const [selectedPriority, setSelectedPriority] = useState("");

  // Load tasks when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadTasks();


    }, [])
  );

  useEffect(() => {
    console.log("TaskListScreen has rendered");
  });

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  const filterTasks = () => {
    return tasks.filter(task =>
      (task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.dueDate.toLowerCase().includes(searchQuery.toLowerCase())) &&
      task.priority.toLowerCase().includes(selectedPriority.toLowerCase())
    );
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
    >
      <Text style={styles.taskTitle}>{item.name}</Text>
      <Text style={styles.taskDate}>Due: {item.dueDate}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>
      <CustomRadioButton
        options={priority}
        selectedValue={selectedPriority === "" ? "All" : selectedPriority}
        onSelect={(value) => setSelectedPriority(value === "All" ? "" : value)}
      />

      <CustomSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name or due date"
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TaskForm')}>
        <Text style={styles.addButtonText}>+ Add New Task</Text>
      </TouchableOpacity>
      <FlatList
        data={filterTasks()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskList: {
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
