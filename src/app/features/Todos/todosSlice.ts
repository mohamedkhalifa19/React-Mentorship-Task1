import type { Todo } from "@/Types/Types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const todos: Todo[] = [];
export const todosSlice = createSlice({
  name: "todos",
  initialState: todos,
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => [...action.payload],
    editTodos: (state, action: PayloadAction<Todo>) => {
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
    },
  },
});

export const { setTodos, editTodos } = todosSlice.actions;
export default todosSlice.reducer;
