import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { Todo, todoUrl } from "../hooks/useTodos";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const clear = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = "";
    }
  };
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios.post<Todo>(todoUrl, todo).then((response) => response.data),

    onSuccess(savedTodo) {
      const updateTodos = (todos: Todo[]) => [savedTodo, ...(todos || [])];

      queryClient.setQueryData<Todo[]>(["todos"], updateTodos);
      clear(ref);
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
