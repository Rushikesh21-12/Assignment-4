import { destroy, types, getSnapshot, onSnapshot, applySnapshot } from "mobx-state-tree";
import { deleteTodoItem } from "../database/allSchema";

const TodoModel = types
    .model('Todos', {
        id: types.string,
        title: types.string,
        description: types.string,
        startDate: types.string,
        dueDate: types.string,
        status: types.string,
        createdDate: types.string,
        updatedDate: types.string
    })


const UserStore = types
    .model('User', {
        userName: types.string,
        todoList: types.array(TodoModel),
        filter: types.string
    })
    .actions((self) => ({
        setUserName(value){
            self.userName = value
        },

        setTodoList(list){
            self.todoList = list
        },

        setFilter(filter){
            self.filter = filter
        },

        getOneTodoItem(id){
            return self.todoList.find(o => o.id == id)
        }
    }))
    .views((self) => ({
    
    }))

const users = UserStore.create({
    userName: '',
    todoList: [],
    filter: 'all'
})

export default users