import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../react-query/constants";

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
    queryKey: CACHE_KEY_TODOS,
    queryFn: fetchTodos,
  });
};
