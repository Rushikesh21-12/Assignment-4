import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import InputField from '../components/InputFiedl'
import DateTimePicker from '@react-native-community/datetimepicker'
import { updateTodoItem } from '../../database/allSchema'

export default function EditTodoDetails({navigation, route}) {

    const {item} = route.params

    const [todoItem, setTodoItem] = useState({
        id: item.id,
        title: item.title,
        description: item.description,
        startDate: item.startDate,
        dueDate: item.dueDate,
        status: item.status,
        createdDate: item.createdDate,
        updatedDate: new Date().toString().substring(4, 15)
    })

    const {title, description, startDate, dueDate} = todoItem

    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')

    const [showStart, setShowStart] = useState(false)
    const [showDue, setShowDue] = useState(false)

    const onChangeDate = (event, selectedDate, whichDate) => {
        if(event.type == 'set'){
            const currentDate = selectedDate

            {whichDate == 'start' ? setShowStart(Platform.OS === 'ios') : setShowDue(Platform.OS === 'ios')}

            {whichDate == 'start' 
                ? setTodoItem({...todoItem, startDate: currentDate.toString().substring(4,15)})
                : setTodoItem({...todoItem, dueDate: currentDate.toString().substring(4,15)})
            }
            
        }else{
            {whichDate == 'start' ? setShowStart(false) : setShowDue(false)}
        }
    };

    const onChangeItem = (value, field, setError) => {
        setTodoItem({...todoItem, [field] : value})

        switch(field){
            case 'title':
                value == '' ? setError('Required field !!') : setError('')
                break

            case 'description':
                value == '' ? setError('Required field !!') : setError('')
                break

            default: 
                break
        }
    }

    const onSave = () => {
        updateTodoItem(todoItem, 'false').then().catch(error => console.log(error))
        navigation.goBack()
    }

    return (
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        <View style = {styles.container}>
            <Text style = {styles.text}>Edit Todo Item</Text>

            <InputField
                value = {title}
                onChangeText = {(value) => onChangeItem(value, 'title', setTitleError)}
                errorName = {titleError}
            />

            <InputField
                value = {description}
                onChangeText = {(value) => onChangeItem(value, 'description', setDescriptionError)}
                errorName = {descriptionError}
            />

            <View style = {styles.dateView}>
                <Text>Select start date : </Text>
                {startDate !== undefined ? <Text>{startDate}</Text> : null }
                <TouchableOpacity onPress = {() => {
                    Keyboard.dismiss()
                    setShowStart(true)
                }}>
                    <Text>    Change</Text>
                </TouchableOpacity>
                {showStart && (
                    <DateTimePicker
                        value = {new Date()}
                        mode = 'date'
                        display = "default"
                        onChange = {(event, selectedDate) => onChangeDate(event, selectedDate, 'start')}
                    />
                )}
            </View>

            <View style = {styles.dateView}>
                <Text>Select due date : </Text>
                {dueDate !== undefined ? <Text>{dueDate}</Text> : null}
                <TouchableOpacity onPress = {() => {
                    Keyboard.dismiss()
                    setShowDue(true)
                }}>
                    <Text>    Change</Text>
                </TouchableOpacity>
                {showDue && (
                    <DateTimePicker
                        value = {new Date()}
                        mode = 'date'
                        display = "default"
                        onChange = {(event, selectedDate) => onChangeDate(event, selectedDate, 'due')}
                    />
                )}
            </View>

            <Button
                title = 'Save'
                onPress = {() => onSave()}
            />

        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30
    },

    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 50
    },

    dateView: {
        flexDirection: 'row',
        marginBottom: 20
    },

    error: {
        color: 'red'
    }
})
