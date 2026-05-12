import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faUpload} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation} from "../api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  // 7.2.2 Now, when our app can access apiSlice we can put that "useGetTodosQuery" hook to use here. We're destructuring out of the "useGetTodosQuery" hook here data that's been renamed to todos, then we need isLoading, isSuccess and others. This look a lot like a custom useAxios hook or some other logic you may have seen used in a component before. What is awesome that this hook is being created automatically for us with «RTK Query». ↓
  const {data: todos, isLoading, isSuccess, isError, error} = useGetTodosQuery();

  // 7.6.1 Here we'll add 3 more hooks that we've just created to use them in this component. And we're just getting functions from these hooks, and we don't really need to wait on the isLoading, isSuccess etc., as we did with the query-hook above when we're reading the data. ↓
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Find the highest existing ID
    const maxId = todos.reduce((max, todo) => {
      return todo.id > max ? todo.id : max;
    }, 0);

    // Create next ID
    const newId = maxId + 1;

    // 7.6.2 And here we'll put to work "addTodo" func. It receives a todo object with a userId, title and completed flag inside of it. (We'll just set them all to userId "1" by default, if we need we could change that, create a dropdown menu and provide different user IDs. So the data has userIds prop in it and we can differ ToDos by users as well later.) ↓
    await addTodo({userId: 1, id: newId, title: newTodo, completed: false});

    setNewTodo("");
  };

  const newItemSection =
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(evt) => setNewTodo(evt.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload}/>
      </button>
    </form>;

  let content;
  // 7.2.3 Let's use all of those thing we got from our hook in conditional render.
  // (Go to [src/features/api/apiSlice.js])
  // 7.6.3 Now let's make our ToDo content appearing more nice and add some HTML to it. We'll be mapping though todos and return an "article" out of each of them.
  // (Go to [src/features/api/apiSlice.js])
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    // content = JSON.stringify(todos);
    content = todos.map(todo => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() => updateTodo({...todo, completed: !todo.completed})}/>
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className="trash" onClick={() => deleteTodo(todo.id)}>
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;