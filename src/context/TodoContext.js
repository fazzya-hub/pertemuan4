import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialTodoState, todoReducer } from './TodoReducer';

export const TodoContext = createContext();

const STORAGE_KEY = '@todos';

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodoState);

  useEffect(() => {
    async function loadTodos() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch({ type: 'LOAD_TODOS', payload: parsed });
        }
      } catch (e) {
        // ignore for now
      }
    }
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch(() => {});
  }, [todos]);

  const value = { todos, dispatch };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

