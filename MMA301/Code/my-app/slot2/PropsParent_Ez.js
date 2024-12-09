import React from "react";
import {Text,View} from "react-native";
import SL34Con from "./SL34Con";
function PropsParent_Ez(){
    const username='Nguyen Van A';
    return(
        <View>
        {/* truyen props vao component con */}
        <SL34Con name={username}/>
        </View>
    );
}
export default PropsParent_Ez;