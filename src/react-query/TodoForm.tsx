import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { Todo, todoUrl } from "../hooks/useTodos";

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const clear = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = "";
    }
  };
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo) =>
      axios.post<Todo>(todoUrl, todo).then((response) => response.data),

    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      clear(ref);

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo)),
      );
    },

    onError: (_error, _newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData(["todos"], context.previousTodos);
    },
  });

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current.value,
              completed: false,
              userId: 1, // INFO: Yes, it is hardcoded
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            Add
            {addTodo.isLoading && (
              <>
                {" "}
                <span className="spinner-border spinner-border-sm"></span>
              </>
            )}
          </button>
        </div>
      </form>{" "}
    </>
  );
};

export default TodoForm;
