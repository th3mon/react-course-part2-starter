import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const todoUrl = "https://jsonplaceholder.typicode.com/todos";

export const useTodos = () => {
  const fetchTodos = () =>
    axios.get<Todo[]>(todoUrl).then((response) => response.data);

  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
