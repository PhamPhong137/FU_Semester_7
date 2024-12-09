import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Button, Image, StyleSheet }
    from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ListTask = () => {
    const [tasks, setTasks] = useState([]);
    const isFocused = useIsFocused();
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        if (isFocused) {
            loadTasks(); // Load tasks every time the screen is focused
        }
    }, [isFocused]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveTasks = async (updatedTasks) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        saveTasks(updatedTasks);
    };

    const handleUpdate = (task) => {
        navigation.navigate('TaskEdit', { task }); // Navigate to an update screen
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const filteredTasks = tasks.filter(task =>
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.dueDate.includes(searchQuery)
    );

    const renderTask = ({ item }) => (
        <View style={styles.taskContainer}>
            {item.images && item.images.length > 0 && (
                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.taskImage}
                    resizeMode="cover"
                />
            )}
            <TouchableOpacity
                onPress={() => navigation.navigate('TaskDetail', { task: item })}
                style={styles.taskTextContainer}
            >
                <Text>{item.taskName}</Text>
                <Text>{item.dueDate}</Text>
            </TouchableOpacity>
            <Button title="Update" onPress={() => handleUpdate(item)} />
            <Button style={{ backgroundColor: 'red' }} title="Delete" onPress={() => handleDelete(item.id)} />
        </View>
    );

    return (
        <SafeAreaView style={{ padding: 20 }}>
            <Text>All tasks</Text>
            <TextInput
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Tìm kiếm theo tên hoặc ngày hết hạn"
                style={styles.searchInput}
            />

            {/* Task List */}
            {filteredTasks.length > 0 ? (
                <FlatList
                    data={filteredTasks}
                    renderItem={renderTask}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    No tasks available
                </Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    taskImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5 // Optional: round the corners for a cleaner look
    },
    taskTextContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#000',
        marginVertical: 10,
        padding: 5
    }
});

export default ListTask;
