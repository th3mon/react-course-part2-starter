import "./App.css";
import PostList from "./react-query/PostList";
import TodoList from "./react-query/TodoList";

function App() {
  return (
    <>
      <div className="posts">
        <h2>Posts</h2>
        <PostList />
      </div>

      <div className="todos">
        <h2>Todos</h2>
        <TodoList />
      </div>
    </>
  );
}

export default App;
