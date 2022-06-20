import {configureStore} from '@reduxjs/toolkit';
import projectReducer from './features/Project/projectSlice';
import todosReducer from './features/Todos/todoSlice';

export default configureStore({
  reducer: {
    todos: todosReducer,
    projects: projectReducer
  }
});

