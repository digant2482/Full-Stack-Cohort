/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor(){
    this.todoArray = [];
  }

  add(todo){
    this.todoArray.push(todo);
  }

  remove(indexOfTodo){
    this.todoArray.splice(indexOfTodo, 1);
  }

  update(index, updatedTodo){
    if (0 <= index && index < this.todoArray.length){
      this.todoArray[index] = updatedTodo;
    }
  }

  getAll(){
    return this.todoArray;
  }

  get(indexOfTodo){
    if (0 <= indexOfTodo && indexOfTodo < this.todoArray.length){
      return this.todoArray[indexOfTodo];
    }
    return null;
  }

  clear(){
    this.todoArray = [];
  }

}

module.exports = Todo;
