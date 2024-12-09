// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import ListView from './screen/ListView';
import TaskDetail from './screen/TaskDetail';
import AddTask from './screen/AddTask';
import TaskEdit from './screen/TaskEdit';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for the ListView and TaskDetail screens
function ListViewStack() {
    return (
        <Stack.Navigator initialRouteName="TaskList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TaskList" component={ListView} />
            <Stack.Screen name="TaskDetail" component={TaskDetail} />
            <Stack.Screen name="TaskEdit" component={TaskEdit} />
        </Stack.Navigator>
    );
}

// Main App with Tab Navigation
function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="TaskListTab" screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="TaskListTab"
                    component={ListViewStack}
                    options={{
                        title: 'Tasks',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="list" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="AddTaskTab"
                    component={AddTask}
                    options={{
                        title: 'Add Task',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="add-circle" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;
