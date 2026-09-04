import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const usePosts = () => {
  const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.data);

  const oneMinuteInMs = 60 * 1000;

  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: oneMinuteInMs,
  });
};
