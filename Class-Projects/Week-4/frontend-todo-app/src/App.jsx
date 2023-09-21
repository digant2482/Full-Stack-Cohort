import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = React.useState([{
    title : "Go to gym",
    description : "Go to gym betwenn 5-7",
    id : 1
  },
  {
    title : "Go to class",
    description : "Go to class between 8-10",
    id : 2
  }
])

React.useEffect(() => {
  fetch("http://localhost:3000/todos").then((response) => {
    response.json().then((data) => {
      console.log(data);
      setTodos(data);
    })
  })

}, []);

  return ( 
    <div>
      {todos.map((todo)=>{
        return <div>
          {todo.title}
          {todo.description}
          <button>Delete</button>
          <br />
        </div>
      })
      }
    </div>    
  )
}

export default App
