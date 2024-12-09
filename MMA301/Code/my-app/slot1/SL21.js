import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class SL21 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Click me",
            dem: 0,
        }
    }

    //dinh nghia ham updateText
    updateText() {
        this.setState((preState) => {
            return {
                dem: preState.dem + 1,
                text: "Ban vua click lan",
            }
        });
    }
    // Cách 2
    // updateText = () => {
    //     this.setState((prevState) => ({
    //         dem: prevState.dem + 1,
    //         text: `Ban vua click lan ${prevState.dem + 1}`,
    //     }));
    // };

    // <Text onPress={this.updateText}>


    render() {
        return (
            <View>
                <Text onPress={() => this.updateText()}>
                    {this.state.text} : {this.state.dem}

                </Text>
            </View>
        )
    }

}