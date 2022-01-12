import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TodoField from '../components/TodoField'
import store from '../../mstStore/index'

export default function TodoFullDetailsScreen({route}) {
    const {id} = route.params

    let oneItem = store.getOneTodoItem(id)

    return (
        <View style = {styles.container}>

            <Text style = {styles.header}>Task Details</Text>
            <TodoField
                header = 'Title'
                body = {oneItem.title}
            />

            <TodoField
                header = 'Description'
                body = {oneItem.description}
            />

            <TodoField
                header = 'Start Date'
                body = {oneItem.startDate}
            />

            <TodoField
                header = 'Due Date'
                body = {oneItem.dueDate}
            />

            <TodoField
                header = 'Status'
                body = {oneItem.status}
            />

            <TodoField
                header = 'Creation Date'
                body = {oneItem.createdDate}
            />

            <TodoField
                header = 'Last Update Date'
                body = {oneItem.updatedDate}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: 'white'
    },

    header: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
    }
})
