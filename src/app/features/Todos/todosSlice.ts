import type { Todo } from "@/Types/Types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface IProps {
  todos: Todo[];
  allTodos: Todo[];
  filter: string;
  skip: number;
  limit: number;
  total: number;
}
const initialState: IProps = {
  todos: [],
  allTodos: [],
  filter: "all",
  skip: 0,
  limit: 5,
  total: 0,
};
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.allTodos = [...state.todos];
      return state;
    },
    setFilteredTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    editTodos: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo: Todo) =>
        todo.userId === action.payload.userId
          ? { ...todo, ...action.payload }
          : todo
      );
      state.allTodos = [...state.todos];
      return state;
    },
    addNewTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [action.payload, ...state.todos];
      state.allTodos = [...state.todos];
      return state;
    },
    delTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter(
        (s: Todo) => s.userId != action.payload.userId
      );
      state.allTodos = [...state.todos];
      return state;
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "pending" | "completed">
    ) => {
      state.filter = action.payload;
      if (action.payload === "completed") {
        state.todos = state.allTodos.filter((t) => t.completed);
      } else if (action.payload === "pending") {
        state.todos = state.allTodos.filter((t) => !t.completed);
      } else {
        state.todos = [...state.allTodos];
      }
    },
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
      return state;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      return state;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
      return state;
    },
  },
});

export const {
  setTodos,
  editTodos,
  addNewTodo,
  delTodo,
  setFilter,
  setLimit,
  setSkip,
  setTotal,
  setFilteredTodos,
} = todosSlice.actions;
export default todosSlice.reducer;
