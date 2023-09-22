import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

//Functions

function useTodo(){
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(()=>{
    axios.get("http://localhost:3000/todos").then((response) => {
        setTodos(response.data);
    })}, 1000);
  },[])

  return todos;
}


function App() {

  // fetch all todos from server
  const todos = useTodo();

  const [newTodo, setNewTodo] = useState({title : "", description: ""});

  // Event handler for title input
  const handleTitleChange = (event) => {
    setNewTodo({ ...newTodo, title: event.target.value });
  };

  // Event handler for description input
  const handleDescriptionChange = (event) => {
    setNewTodo({ ...newTodo, description: event.target.value });
  };


  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        <br />
        <h2>Title</h2>
        <input type="text" 
        onChange = {handleTitleChange}/>
        <h3>Description</h3>
        <input type="text"
         onChange = {handleDescriptionChange}/>
        <br/>
        <br/>
        <button onClick={() => {
          axios.post("http://localhost:3000/todos", newTodo);
        }
        }>Create Todo</button>
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
        <button onClick = {() => {
            axios.delete(`http://localhost:3000/todos/${props.id}`);
          }}> DELETE </button>
    </div>
}

export default App