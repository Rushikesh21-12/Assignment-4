import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

export default function InputField(props){

    return (
        <View style = {styles.container}>

            <TextInput {...props} style = {styles.input} />
            
            {props.errorName ? <Text style = {styles.errorStyle}>{props.errorName}</Text> : null}

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },

    input: {
        borderBottomWidth: 1
    },

    errorStyle: {
        color: 'red'
    }

});