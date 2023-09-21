import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

//Functions
function deleteTodo(todoId){
  console.log(todoId);
  axios.delete(`http://localhost:3000/todos/${todoId}`);
}

function App() {

  // fetch all todos from server
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(()=>{
    axios.get("http://localhost:3000/todos").then((response) => {
        setTodos(response.data);
    })}, 1000);
  },[])

  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        <input type="text" />
        <br/>
        {todos.map((item) => {
          return <Todo title = {item.title}
           description = {item.description} 
           id = {item.id}
           ></Todo>;
        })}
      </div>
    </>
  )
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    return <div>
        {props.title}
        {props.description}
        <button onClick = {() => {deleteTodo(props.id)}}> DELETE </button>
    </div>
}

export default App