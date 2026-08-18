import { useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import { Todos } from './components/Todos'
import { useEffect } from 'react'

function App(){
  const [todos,setTodos] = useState([])

  async function getTodos(){
    try {
      const res = await fetch("http://localhost:3000/todos")
      const data = await res.json()
      setTodos(data.todos)
    } catch (error) {
      return error 
    }
  }

  useEffect((()=>{
    getTodos()
  }),[])

  return (
    <>
    <CreateTodo/>
    <Todos todos={todos}/>
    </>
  )
}
 
export default App
