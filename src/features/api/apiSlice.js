import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const apiSlice = createApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
  endpoints: (builder) =>  ({
    getTodos: builder.query({
      query: () => '/todos'
    }),
    updateTodo: builder.mutation({
      query: ({id, todo}) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: todo
      })
    })
  })
})

export const {
  useUpdateTodoMutation,
  useGetTodosQuery
} = apiSlice;

export const {useGetProjectsQuery} = apiSlice
