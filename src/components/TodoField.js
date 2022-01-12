import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TodoField(props) {

    return (
        <View style = {styles.container}>
            <Text style = {styles.body}>{props.body}</Text>
            <Text style = {styles.header}>{props.header}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },

    body: {
        borderWidth: 1,
        padding: 10
    },

    header: {
        position: 'absolute',
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        bottom: 35,
        left: 10,
        paddingHorizontal: 5
    }
})
