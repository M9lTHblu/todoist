import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

export const loadProjects = createAsyncThunk(
    'projects/loadProjects',
    async () => {
      const resp = await fetch(' http://localhost:3500/projects');
      return await resp.json();
    },
);

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (newTodo) => {
      await fetch(`http://localhost:3500/projects/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      })

      return newTodo;
    }
)

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async ({id, changes}) => {
      await fetch(`http://localhost:3500/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(changes)
      })

      return {id, changes};
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (id) => {
      await fetch(`http://localhost:3500/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      return id;
    }
)


const projectsAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: projectsAdapter.getInitialState({loading: 'idle', error: null}),
  reducers: {},
  extraReducers: {
    [loadProjects.pending]: (state) => {
      state.loading = 'loading';
      state.error = null;
    },
    [loadProjects.fulfilled]: (state, {payload}) => {
      projectsAdapter.addMany(state, payload);
      state.loading = 'idle';
      state.error = null;
    },
    [loadProjects.rejected]: (state, {error}) => {
      state.loading = 'idle';
      state.error = error;
    },
    [createProject.fulfilled]: (state, {payload}) => {
      projectsAdapter.addOne(state, payload)
    },
    [updateProject.fulfilled]: (state, {payload}) => {
      const {id, changes} = payload
      projectsAdapter.updateOne(state, {id, changes})
    },
    [deleteProject.fulfilled]: (state, {payload}) => {
      projectsAdapter.removeOne(state, payload)
    }
  },
});


export const projectSelectors = projectsAdapter.getSelectors((state) => state.projects);

export default projectsSlice.reducer;
