import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

export const loadTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
      const resp = await fetch(' http://localhost:3500/todos');
      return await resp.json();
    },
);

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (newTodo) => {
      await fetch(`http://localhost:3500/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      return newTodo;
    },
);

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({id, changes}) => {
      await fetch(`http://localhost:3500/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      });

      return {id, changes};
    },
);


export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id) => {
      await fetch(`http://localhost:3500/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return id;
    },
);

const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState({loading: 'idle', error: null}),
  reducers: {
  },
  extraReducers: {
    [loadTodos.pending]: (state) => {
      state.loading = 'loading';
      state.error = null;
    },
    [loadTodos.fulfilled]: (state, {payload}) => {
      todosAdapter.addMany(state, payload);
      state.loading = 'idle';
      state.error = null;
    },
    [loadTodos.rejected]: (state, {error}) => {
      state.loading = 'idle';
      state.error = error;
    },
    [createTodo.fulfilled]: (state, {payload}) => {
      todosAdapter.addOne(state, payload);
    },
    [updateTodo.fulfilled]: (state, {payload}) => {
      const {id, changes} = payload;
      todosAdapter.updateOne(state, {id, changes});
    },
    [deleteTodo.fulfilled]: (state, {payload}) => {
      todosAdapter.removeOne(state, payload);
    },
  },
});

export const todosSelectors = todosAdapter.getSelectors(
    (state) => state?.todos);

export default todoSlice.reducer;
