import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const buttons = ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "C", "0", "=", "/"];
    const handlePress = (value) => {
        if (value === "=") {
            try {
                setResult(eval(input));
            } catch (e) {
                setResult("Error");
            }
        } else if (value === "C") {
            setInput("0");
            setResult("");

        } else if (result != "") {
            if (value === "+" || value === "-" || value === "*" || value === "/") {
                setInput(result + value);
                setResult("");
            } else {
                setInput(value);
                setResult("");
            }
        }
        else {
            if (input === "0") {
                setInput(value);
            } else {
                setInput(input + value);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Calculator</Text>
            <View style={styles.display}>
                <Text style={styles.inputText}>{input}</Text>
                <Text style={styles.resultText}>{result}</Text>
            </View>
            <View style={styles.buttons}>
                {buttons.map((value) => (
                    <TouchableHighlight key={value} style={styles.button} onPress={() => handlePress(value)}>
                        <Text style={styles.buttonText}>{value}</Text>
                    </TouchableHighlight>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    display: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#d1d1d1',
        borderRadius: 10,
    },
    inputText: {
        fontSize: 36,
        color: '#000',
    },
    resultText: {
        fontSize: 24,
        color: '#888',
    },
    buttons: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        width: '22%',
        padding: 20,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000088',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
    },
});

export default Calculator;
