import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import InputField from '../components/InputFiedl'
import store from '../../mstStore/index'
import { insertTodoItem } from '../../database/allSchema'

export default function AddnewTododScreen({navigation}) {

    const [todoItem, setTodoItem] = useState({
        id: new Date().toString(),
        title: undefined,
        description: undefined,
        startDate: undefined,
        dueDate: undefined,
        status: 'Pending',
        createdDate: new Date().toString().substring(4, 15),
        updatedDate: new Date().toString().substring(4, 15)
    })
    const {title, description, startDate, dueDate} = todoItem

    const [titleError, setTitleError] = useState(undefined)
    const [descriptionError, setDescriptionError] = useState(undefined)
    const [startDateError, setStartDateError] = useState(undefined)
    const [dueDateError, setDueDateError] = useState(undefined)
    
    const [showStart, setShowStart] = useState(false)
    const [showDue, setShowDue] = useState(false)
    const [selectOrChangeForStart, setSelectOrChangeForStart] = useState('Select here')
    const [selectOrChangeForDue, setSelectOrChangeForDue] = useState('Select here')

    
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
    
    const onChangeDate = (event, selectedDate, whichDate) => {
        if(event.type == 'set'){
            const currentDate = selectedDate

            {whichDate == 'start' ? setShowStart(Platform.OS === 'ios') : setShowDue(Platform.OS === 'ios')}
            {whichDate == 'start' 
                ? setTodoItem({...todoItem, startDate: currentDate.toString().substring(4,15)})
                : setTodoItem({...todoItem, dueDate: currentDate.toString().substring(4,15)})
            }
            {whichDate == 'start' ?  setSelectOrChangeForStart('    Change') :  setSelectOrChangeForDue('    Change')}
            {whichDate == 'start' ?  setStartDateError('') :  setDueDateError('')}
            
        }else{
            {whichDate == 'start' ? setShowStart(false) : setShowDue(false)}
        }
    };

    const onAddTask = () => {
        title == undefined ? setTitleError('Required field!!') : null
        description == undefined ? setDescriptionError('Required field!!') : null
        startDate == undefined ? setStartDateError('Please select start date!!') : null
        dueDate == undefined ? setDueDateError('Please select due date!!') : null
    
        if(titleError == '' && descriptionError == '' && startDateError == '' && dueDateError == ''){
            insertTodoItem(store.userName, todoItem).then().catch(error => console.log(error))
            alert('Successfully added new task')
            navigation.goBack()
        }
    }

    return (
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        <View style = {styles.container}>
            <Text style = {styles.headerText}>Add New Task</Text>

            <InputField
                placeholder = 'Enter title'
                onChangeText = {(value) => onChangeItem(value, 'title', setTitleError)}
                errorName = {titleError}
            />

            <InputField
                placeholder = 'Enter description'
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
                    <Text>{selectOrChangeForStart}</Text>
                </TouchableOpacity>
                {showStart && (
                    <DateTimePicker
                        value = {new Date()}
                        mode = 'date'
                        display = "default"
                        onChange = {(event, selectedDate) => onChangeDate(event, selectedDate, 'start')}
                    />
                )}
                {startDateError !== '' ? <Text style = {styles.error}>   {startDateError}</Text> : null}
            </View>

            <View style = {styles.dateView}>
                <Text>Select due date : </Text>
                {dueDate !== undefined ? <Text>{dueDate}</Text> : null}
                <TouchableOpacity onPress = {() => {
                    setShowDue(true)
                    Keyboard.dismiss()
                }}>
                    <Text>{selectOrChangeForDue}</Text>
                </TouchableOpacity>
                {showDue && (
                    <DateTimePicker
                        value = {new Date()}
                        mode = 'date'
                        display = "default"
                        onChange = {(event, selectedDate) => onChangeDate(event, selectedDate, 'due')}
                    />
                )}
                {dueDateError !== '' ? <Text style = {styles.error}>   {dueDateError}</Text> : null}
            </View>

            <Button
                title = 'Add'
                onPress = {() => onAddTask()}
            />
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30
    },

    headerText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 30
    },

    dateView: {
        flexDirection: 'row',
        marginBottom: 20
    },

    error: {
        color: 'red'
    }
})