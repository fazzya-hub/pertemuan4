import React from 'react';
import { TodoProvider } from './src/context/TodoContext';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  return (
    <TodoProvider>
      <TodoScreen />
    </TodoProvider>
  );
}

