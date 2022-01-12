import Realm from "realm";

export const UserSchema = {
    name: 'Users',
    primaryKey: 'userName',
    properties: {
        userId: 'string',
        userName: 'string',
        lastLoggedinDate: 'string',
        todoList: { type: 'list', objectType: 'Todo'}
    }
}

export const TodoSchema = {
    name: 'Todo',
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: 'string',
        description: 'string',
        startDate: 'string',
        dueDate: 'string',
        status: 'string',
        createdDate: 'string',
        updatedDate: 'string'
    }
}

const databaseOptions = {
    path: 'todo.realm',
    schema: [UserSchema, TodoSchema]
}

export const insertUser = newUser => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create('Users', newUser)
            resolve(newUser)
        })
    }).catch(error => reject(error))
})

export const getAllUsers = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allObjects = realm.objects('Users')
            let allUsers = []
            for (let i = 0; i < allObjects.length; i++) {
                allUsers.push(allObjects[i].userName)
            }
            resolve(allUsers)
        })
    }).catch(error => reject(error))
})

export const insertTodoItem = (userName, newTodoItem) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            const user = realm.objectForPrimaryKey('Users', userName)
            user.todoList.push(newTodoItem)
            resolve()
        })
    }).catch(error => reject(error))
})

export const getAllTodosOfUser = userName => new Promise((resolve,reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            const userObject = realm.objectForPrimaryKey('Users', userName)
            let allTodosOfUser = userObject.todoList
            resolve(allTodosOfUser)
        })
    }).catch(error => reject(error))
})

export const deleteTodoItem = todoItemId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            const todoItemToDelete = realm.objectForPrimaryKey('Todo', todoItemId)
            realm.delete(todoItemToDelete)
            resolve()
        })
    }).catch(error => reject(error))
})

export const deleteAllTodos = (userName, filter) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            const user = realm.objectForPrimaryKey('Users', userName)
            let todoList = user.todoList
            if(filter == 'all')
                realm.delete(todoList)
            else if(filter == 'completed'){
                let todosToDelete = todoList.filter(o => o.status == 'Completed')
                realm.delete(todosToDelete)
            }else if(filter == 'pending') {
                let todosToDelete = todoList.filter(o => o.status == 'Pending')
                realm.delete(todosToDelete)
            }
            resolve()
        })
    }).catch(error => reject(error))
})

export const updateTodoItem = (todoItem, status) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let todoItemToUpdate = realm.objectForPrimaryKey('Todo', todoItem.id)
            console.log(status)
            if(status !== 'false')
                todoItemToUpdate.status == 'Completed' ? todoItemToUpdate.status = 'Pending' : todoItemToUpdate.status = 'Completed'
            else{
                todoItemToUpdate.title = todoItem.title
                todoItemToUpdate.description = todoItem.description
                todoItemToUpdate.startDate = todoItem.startDate
                todoItemToUpdate.dueDate = todoItem.dueDate
                todoItemToUpdate.updatedDate = todoItem.updatedDate
            }
            resolve()
        })
    }).catch(error => reject(error))
})

export default new Realm(databaseOptions)