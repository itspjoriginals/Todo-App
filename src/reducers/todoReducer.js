export function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "TOGGLE":
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE":
      return state.filter(todo => todo.id !== action.payload);

    case "RESTORE":
      return [action.payload, ...state];

    default:
      return state;
  }
}
