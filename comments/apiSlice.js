// ? 7.1.0 This is the place, where we'll create methods to interact with the API. It essentially replaces something like "axios" library and pulls that code out of our component logic and over here in a separate api slice.
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// 7.1.1 We'll start creating an api-slice with method "createApi" which has an options object inside of it.
export const apiSlice = createApi({
  // 7.1.2 We'll define a default reducer path.
  reducerPath: "api",
  // 7.1.3 Then we have a base query here which calls "fetchBaseQuery" function with "baseUrl" (might be familiar structure for those who were using "axios" before). As we're using "JSON-server" with local dev environment, so the URL will be "localhost" with a specific port here.
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3500"}),
  // 7.7.0 But we still have an issue with our app here. The results get cached, and we're not invalidating the previous cache. So it's not updating to show the new changes whether that's a "delete", an "update or a new todo item is being added. It's not showing any of that, because we're still seeing the cached version of data. What we need to do is assign a tag to the cache and then let it know which mutations invalidate the cache and so then it will automatically refetch that data for us. So the first thing we're going to do after the base query is put in tagTypes. ↓
  tagTypes: ["Todos"],
  // 7.1.4 The "endpoints" here are very similar to "builder cases" inside the "createSlice" method in Redux Toolkit, what we examined in previous lesson. We've an anonymous arrow func here where we're passing in a builder object, and then we're defining a methods to interact with the API.
  endpoints: (builder) => ({
    // 7.1.5 With this one we'll get all the ToDos.
    getTodos: builder.query({
      // 7.1.6 This '/todos' will be attached to the baseUrl and queried as complete URL with HTTP-method "GET". ↓
      query: () => "/todos",
      // 7.8 There’s one more thing: currently, new entries appear at the very bottom of the list, and we’d like to change this behavior so that they appear at the top. Fortunately, just as with the “axios” library or the adapter, we have the option to sort list items here. So we can put in our sort function here at the "getTodos" method.
      transformResponse: response => response.sort((a, b) => b.id - a.id),
      // 7.7.1 Then for the "getTodos" method that we have here we need to put in a provides tags and say it's providing this tag of "Todos". So then we'll need to invalidate the "Todos" cache when we use this mutations below whether we're creating a new todo record, updating or deleting. ↓
      providesTags: ["Todos"],
    }),
    // 7.3.0 Let's create another method for adding a new to-do item. We can instantly notice the difference from the previous method because we use the "mutation" method instead of the "query" method on the "builder" object. And the rest of our methods will be mutations, as we're not just requesting (or querying) data, but changing (mutating) it. But we still have this "query" word inside.
    addTodo: builder.mutation({
      // 7.3.1 A todo will be passed in, because that function needs a new todo.
      query: (todo) => ({
        // 7.3.2 And then we're once again specifying a URL but this time we're saying it's the URL instead of just having a default query like we did above.
        url: "/todos",
        // 7.3.3 Also mentioning what method we're using because there are can be different methods.
        method: "POST",
        // 7.3.4 And as a body of that request we're passing a new todo.
        body: todo,
      }),
      // 7.7.2 So we'll add here the "invalidatesTags" for "Todos" and we'll do that for each one of the "builder mutations" here. ↑
      invalidatesTags: ["Todos"],
    }),
    // 7.4 After the "addTodo" let's also add the "updateTodo". It's very similar to "addTodo" and is also a builder mutation and receives todo, but the URL is different, as we need to specify a specific todo that we're going update with its ID. And we're using method "PATCH" and not "PUT", as we're usually using the "PUT" method, when we're replacing the full record and "PATCH" is typically, when we're just updating a part of the record. And then we also passing the todo as the body of request.
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    // 7.5 For the "deleteTodo" method we need just an ID of the ToDo to find and delete it. So we can destructuring it from todo object. Same as the body will be just an ID of the Todo, as it's only needed to delete the Todo record. ↓
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

// 7.2.0 And one very cool feature about «RTK Query» is it creates custom hooks based on the methods that we provide. It shall start with "use" and end with "Query" in the end (for example, if the method was "getPizzas", then the hook would look like "useGetPizzasQuery").
// (Go to [src/index.js])
// 7.6.0 Now, when we're finished with adding new methods, we can export them as hooks, but with the thought in mind that now we need to write not "Query" in the end of its name, but "Mutation".
// (Go to [src/features/todos/TodoList.js])
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;