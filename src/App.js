import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const READ_TODOS = gql`
  query todos{
    todos {
      id
      task
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation($task: String!) {
    insert_todos_one(
      object: { 
        task: $task,
        completed: true
       }) {
      id
      task
      completed
    }
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!) {
    updateTodo(id: $id)
  }
`;

function App() {
  let input;
  const { data, loading, error } = useQuery(READ_TODOS);

  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(REMOVE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div className="App">
      <h3>Create New Todo</h3>

      <form onSubmit={e => {
        e.preventDefault();
        createTodo({ variables: { task: input.value } });
        input.value = '';
      }}>
        <input className="form-control" type="text" placeholder="Enter todo" ref={node => { input = node; }}></input>
        <button className="btn btn-primary px-5 my-2" type="submit">Submit</button>
      </form>

      <ul>
      {data.todos.map((todo) =>
          <li key={todo.id} className="w-100">
            <span className={todo.completed ? "done" : "pending"}>{todo.task}</span>
            <button className="btn btn-sm btn-danger rounded-circle float-right" onClick={() => {
              deleteTodo({ variables: { id: todo.id } });
            }}>X</button>
            <button className={`btn btn-sm float-right ${todo.completed ? "btn-success" : "btn-info"}`} onClick={() => {
              updateTodo({ variables: { id: todo.id } });
            }}>{todo.completed ? <span>Completed</span> : <span>Not completed</span>}</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
