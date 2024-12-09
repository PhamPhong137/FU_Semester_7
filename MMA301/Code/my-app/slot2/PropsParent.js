import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import PropsChild from "./PropsChild";

// Define props
const UseProps = (props) => {
    return (
        <TextInput
            {...props}
            editable
            maxLength={100}
            style={styles.input}
        />
    );
}

// Define state
const UseState = () => {
    const [value, setValue] = useState('');

    return (
        <View style={styles.container}>
            <UseProps
                onChangeText={text => setValue(text)}
                value={value}
            />
            <Text style={styles.text}>Gia tri moi la {value}</Text>
            <PropsChild name={value} age={10} />
        </View>
    );
}

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        paddingLeft: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
});

export default UseState;
