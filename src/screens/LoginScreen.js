import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { observer } from 'mobx-react-lite'
import { getAllUsers } from '../../database/allSchema'
import store from '../../mstStore/index'
import { useIsFocused } from '@react-navigation/native'

const LoginScreen = ({navigation}) => {

    const isFocused = useIsFocused()
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(isFocused){
            getAllUsers().then(users => {
                setUsers(users)
            }).catch(error => console.log(error))
            store.setUserName('')
        }     
    }, [isFocused])

    const onLogin = () => {
        if(!users.includes(store.userName))
            alert('User not exist')
        else
            navigation.navigate('TodoListScreen')  
    }

    return (
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        <View style = {styles.container}>
            <View style = {styles.topContainer}>

                <Text style = {styles.loginText}>Todo Login</Text>

                <TextInput
                    value = {store.userName}
                    style = {styles.input}
                    placeholder = 'Enter user name to login...'
                    keyboardType = 'visible-password'
                    onChangeText = {value => store.setUserName(value)}
                />

                <Button
                    title = 'Login'
                    onPress = {() => onLogin()}
                />
            </View>

            <View style = {styles.bottomContainer}>
                <TouchableOpacity onPress = {() => navigation.navigate('RegisterScreen')}>
                    
                    <Text style = {styles.lastText}>Dont have an account? <Text style = {styles.endtext}>Register</Text></Text>
               
                </TouchableOpacity>
            </View>

        </View>
        </TouchableWithoutFeedback>
    )
}

export default observer(LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    topContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30
    },

    loginText: {
        fontSize: 40,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        bottom: 150
    },

    input: {
        borderBottomWidth: 1,
        marginBottom: 30
    },

    bottomContainer: {
        height: 50,
        borderTopWidth: 1,
        justifyContent: 'center'
    },

    lastText: {
        fontSize: 16,
        textAlign: 'center'
    },

    endtext: {
        color: '#090b82',
    }
})