import React, { useEffect, useState } from 'react'
import { Context } from "./Context";
import TodoList from './TodoList'

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState('');

  const addTodo = (e, todo) => {
    if (inputTodo !== '' && e.key === 'Enter') {
      setTodos([todo, ...todos]);
      setInputTodo('');
    }
  }

  useEffect(function getFromLocalStorage() {
    const localTodos = localStorage.getItem('todos') || [];
    setTodos(JSON.parse(localTodos))
  }, []);

  useEffect(function addToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodoCompleted = (id) => {
    const todosChanged = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    });
    setTodos([...todosChanged]);
  }
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  const value = { toggleTodoCompleted, removeTodo };

  return (
    <Context.Provider value={value}>
      <div className="container">
        <h1>Todo app</h1>

        <div className="input-field">
          <input type="text" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)}
                 onKeyDown={(e) => addTodo(e, { id: +new Date(), title: inputTodo, completed: false })}/>
          <label>Todo name</label>
        </div>

        <TodoList todos={todos}/>
      </div>
    </Context.Provider>
  );
}