import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

const Ex_slot1 = () => {
    const [clicked, setClicked] = useState(0);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setClicked(clicked + 1)}>
                <Text style={styles.buttonText}>Click me</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Just clicked {clicked} times</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    text: {
        fontSize: 18,
    }
});

export default Ex_slot1;
