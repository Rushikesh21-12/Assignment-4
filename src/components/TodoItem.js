import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Feather  from 'react-native-vector-icons/Feather'
import MaterialIcons   from 'react-native-vector-icons/MaterialIcons'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function TodoItem({navigation, item, onDelete, onChangeStatus}) {

    return (
        <View style = {styles.mainContainer}>
        
            <View style = {styles.container}>
                
                <View style = {styles.leftView}>
                    <Text style = {styles.title}>{item.title}</Text>

                    <Text style = {styles.smallFonts}>Due : {item.dueDate}</Text>

                    <TouchableOpacity onPress = {() => navigation.navigate('TodoFullDetailsScreen', {id: item.id})}>
                        <Text style = {[styles.viewText, styles.smallFonts]}>View full details</Text>
                    </TouchableOpacity>
                </View>
                
                <View style = {styles.rightView}>   
                    <TouchableOpacity onPress = {() => navigation.navigate('EditTodoDetails', {item: item})}>
                        <Feather name = 'edit' size = {24} color = 'black'/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() => onDelete(item.id)}>
                        <MaterialIcons name = 'delete' size = {24} color = 'black'/>
                    </TouchableOpacity> 
                </View>
                
            </View>

            <TouchableOpacity style = {styles.status} onPress = {() => onChangeStatus(item, 'true')}>
                <Text style = {{color: item.status == 'Pending' ? 'red' : 'green'}}>{item.status}</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1
    },

    container: {
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    leftView: {
        width: SCREEN_WIDTH - 140,
    },

    title: {
        fontSize: 18,
        marginBottom: 5,
        textAlign: 'justify'  
    },

    viewText: {
        color: 'blue',
        marginTop: 5
    },

    rightView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 60
    },

    smallFonts: {
        fontSize: 12
    },

    status: {
        position: 'absolute', 
        backgroundColor: 'white', 
        alignSelf: 'flex-end', 
        right: 10
    }
})