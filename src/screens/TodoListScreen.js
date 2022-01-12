import React, {useEffect, useLayoutEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import TodoItem from '../components/TodoItem'
import store from '../../mstStore/index'
import { useIsFocused } from '@react-navigation/native'
import { deleteAllTodos, deleteTodoItem, getAllTodosOfUser, updateTodoItem } from '../../database/allSchema'
import { observer } from 'mobx-react-lite'

const TodoListScreen = ({navigation}) => {

    const [filterTodos, setFilterTodos] = useState([])
    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused)
            reloadData()
    }, [isFocused])

    const reloadData = () => {
        getAllTodosOfUser(store.userName).then(todos => {
            onchangeFilter(todos, store.filter)
            store.setTodoList(JSON.parse(JSON.stringify(todos)))
        }).catch(error => console.log(error))
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress = {() => {
                    navigation.navigate('AddnewTododScreen')
                    store.setFilter('all')
                }}>
                    <Ionicons name = "add-circle" size = {24} color = "black" />
                </TouchableOpacity>
            ),

            headerLeft: () => (
                <Text>{store.userName}</Text>
            )
        })
    })

    const onDelete = todoItemId => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => {
                    deleteTodoItem(todoItemId).then().catch(error => console.log(error))
                    reloadData()
                }}
            ]
        );     
    }

    const deleteAll = () => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this all todos?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => {
                    deleteAllTodos(store.userName, store.filter).then().catch(error => console.log(error)) 
                    reloadData()
                }}
            ]
        );      
    }

    const onChangeStatus = (todoItem, status) => {
        updateTodoItem(todoItem, status).then().catch(error => console.log(error))
        reloadData()
    }

    const onchangeFilter = (todos, value) => {
        store.setFilter(value)
        switch(value){
            case 'all':
                setFilterTodos(todos)
                break

            case 'completed':
                setFilterTodos(todos.filter(item => item.status == 'Completed'))
                break

            case 'pending':
                setFilterTodos(todos.filter(item => item.status == 'Pending'))
                break

            default:
                break
        }
    }

    return (
        <View style = {styles.container}>
            {
                store.todoList.length == 0
                ? <Text>Your list is empty</Text>
                :<View style = {{flex: 1}}>
                    <View style = {styles.topBar}>
                        <Button
                            title = 'Delete All'
                            onPress = {() => deleteAll()}
                        />

                        <View style = {styles.pickerView}>
                            <Picker
                                selectedValue = {store.filter}
                                style = {styles.picker}
                                mode = 'dropdown'
                                onValueChange = {(itemValue, itemIndex) =>
                                    onchangeFilter(store.todoList, itemValue)
                            }>
                                <Picker.Item label = "All" value = "all" />
                                <Picker.Item label = "Completed" value = "completed"/>
                                <Picker.Item label = "Pending" value = "pending"/>
                            </Picker>   
                        </View>
                       
                    </View>
                   
                    <FlatList
                        style = {styles.list}
                        data = {filterTodos}
                        renderItem = {({item}) =>   
                            <TodoItem 
                                item = {item} 
                                navigation = {navigation} 
                                onDelete = {onDelete} 
                                onChangeStatus = {onChangeStatus}
                            />
                        }
                    />
                </View>   
            }
           
        </View>
    )
}

export default observer(TodoListScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },

    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30
    },

    modalDropdown: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        width: 100
    },

    pickerView: {
        height: 35, 
        width: 150,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        justifyContent: 'center'
    }

})