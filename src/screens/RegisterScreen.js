import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { getAllUsers, insertUser } from '../../database/allSchema'

const hasUpperCase = (str) => {
    return str.toLowerCase() != str;
}

export default function RegisterScreen({navigation}) {

    const [userName, setUserName] = useState('')
    const [users, setUsers] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        getAllUsers().then(users => {
            setUsers(users)
        }).catch(error => console.log(error))
    }, [])

    const onRegister = () => {
        if(userName.length == 0)
            setError('Please enter user name')
        else{
            if(users.includes(userName))
                alert('This user name is already taken by someone else')
            else{
                if(error == undefined){
                    const newUser = {
                        userName: userName,
                        userId: userName + Math.floor(Date.now() / 1000),
                        lastLoggedinDate: new Date().toString(4,15),
                        todoList: []
                    }
                    insertUser(newUser).then().catch(error => console.log('onRegisterError : ', error))
                    Alert.alert(
                        "Successfully Registered",
                        "You can now login with your username",
                        [
                          { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
                        ]
                    )
                }
            }
        }     
    }

    const onChangeTextInput = (value) => {
        setUserName(value)
        if(hasUpperCase(value))
            setError('Upper case letters not allowed')
        else
            setError(undefined)
        
    }

    return (
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        <View style = {styles.container}>
            <View style = {styles.topContainer}>

                <Text style = {styles.loginText}>Todo Register</Text>

                <TextInput
                    style = {styles.input}
                    autoCapitalize = 'none'
                    placeholder = 'Enter user name'
                    onChangeText = {value => onChangeTextInput(value)}
                    keyboardType = 'visible-password'
                />

                {error ? <Text style = {styles.errorStyle}>{error}</Text> : null}

                <View style = {styles.button}>
                    <Button
                        title = 'Register'
                        onPress = {() => onRegister()}
                    />
                </View>
                
            </View>

            <View style = {styles.bottomContainer}>
                <TouchableOpacity onPress = {() => navigation.navigate('LoginScreen')}>
                    
                    <Text style = {styles.lastText}>Already have an account? <Text style = {styles.endtext}>Login</Text></Text>
               
                </TouchableOpacity>
            </View>

        </View>
        </TouchableWithoutFeedback>
    )
}

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
    },

    errorStyle: {
        fontSize: 14,
        color: 'red'
    },

    button: {
        marginTop: 30
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