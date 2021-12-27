
import React, { useState, useRef, useEffect } from 'react'
import TodoList from "./components/TodoList"
import {v4 as uuidv4} from 'uuid'
import { Button } from './components/Button.style'
import { GlobalStyle } from './components/Global.style'
import { Wrapper } from './components/Wrapper.style'
import { ListStyle } from './components/Todolist.style'
import { CheckBox } from './components/Checkbox.style'
import { Left2Do } from './components/LeftToDo.style'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App () {

const [todos, setTodos] = useState([])
const todoNameRef = useRef()
const [completedTodos, setCompletedTodos] = useState(0)

useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if(storedTodos) setTodos(storedTodos)
}, [])

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])

function toggleTodo(id){
  const newTodos = [...todos]
  const Todo = newTodos.find(todo => todo.id === id)
  Todo.complete = !Todo.complete
  setTodos(newTodos)
}

function handleClearTodos(){
  const newTodos = todos.filter(todo => !todo.complete)
  let completedLength = (todos.length - newTodos.length)
  console.log(completedLength)
  console.log(completedTodos + completedLength)
  setCompletedTodos(completedTodos + completedLength)
  setTodos(newTodos)
}

function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
        return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
}
/*Fix completed todos*/
return(
        <>
          <Wrapper>
            <ListStyle>
              <TodoList todos={todos} toggleTodo={toggleTodo}/>
            </ListStyle>
            <div>Hello Git</div>
            <CheckBox ref={todoNameRef} type="text" />
            <Button onClick={handleAddTodo}>Add todo</Button>
            <Button onClick={handleClearTodos}>Clear Complete</Button>
            <Button onClick={() => setCompletedTodos(0)}>Reset Completed Todos</Button>
            <Left2Do>{todos.filter(todo => !todo.complete).length} tasks left to do</Left2Do>
            <Left2Do>{ completedTodos } todos have been completed</Left2Do>
            <GlobalStyle/>
          </Wrapper>  
        </>

  )
}
export default App;