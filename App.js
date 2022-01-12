import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import AddnewTododScreen from './src/screens/AddnewTododScreen'
import EditTodoDetails from './src/screens/EditTodoDetails'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import TodoFullDetailsScreen from './src/screens/TodoFullDetailsScreen'
import TodoListScreen from './src/screens/TodoListScreen'

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name = 'LoginScreen'
          component = {LoginScreen}
          options = {{headerShown: false}}
        />

        <Stack.Screen
          name = 'RegisterScreen'
          component = {RegisterScreen}
          options = {{headerShown: false}}
        />

        <Stack.Screen
          name = 'TodoListScreen'
          component = {TodoListScreen}
          options = {{
            title: 'Your Tasks',  
            headerTitleAlign: 'center'
          }}
        />

        <Stack.Screen
          name = 'TodoFullDetailsScreen'
          component = {TodoFullDetailsScreen}
          options = {{headerShown: false}}
        />

        <Stack.Screen
          name = 'EditTodoDetails'
          component = {EditTodoDetails}
          options = {{headerShown: false}}
        />

        <Stack.Screen
          name = 'AddnewTododScreen'
          component = {AddnewTododScreen}
          options = {{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
