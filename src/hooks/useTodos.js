import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

export function useTodos(filter = 'all') {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  const { todos, dispatch } = context;

  const addTodo = (text) => dispatch({ type: 'ADD_TODO', payload: text });
  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });
  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: id });

  let filteredTodos = todos;
  if (filter === 'active') {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  const remainingCount = todos.filter((t) => !t.completed).length;

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    remainingCount,
  };
}

