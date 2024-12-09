import React from "react";
import { Text, View } from "react-native";

const PropsChild = (props) => {
    return (
        <View>
            <Text>Ten nguoi la: {props.name}</Text>
            <Text>So tuoi la: {props.age}</Text>
        </View>
    );
};

export default PropsChild;
