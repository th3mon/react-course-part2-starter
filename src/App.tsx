import "./App.css";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";

function App() {
  return (
    <>
      <TodoForm />
      <div className="todos">
        <h2>Todos</h2>
        <TodoList />
      </div>
    </>
  );
}

export default App;
