export const initialTodoState = [];

export function todoReducer(state, action) {
  switch (action.type) {
    case 'LOAD_TODOS': {
      return action.payload ?? [];
    }
    case 'ADD_TODO': {
      if (!action.payload || !action.payload.trim()) {
        return state;
      }
      const newTodo = {
        id: Date.now().toString(),
        text: action.payload.trim(),
        completed: false,
      };
      return [newTodo, ...state];
    }
    case 'TOGGLE_TODO': {
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    }
    case 'DELETE_TODO': {
      return state.filter((todo) => todo.id !== action.payload);
    }
    default:
      return state;
  }
}

