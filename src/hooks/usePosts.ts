import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

export const usePosts = (query: PostQuery) => {
  const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((response) => response.data);

  const oneMinuteInMs = 60 * 1000;

  return useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    staleTime: oneMinuteInMs,
    keepPreviousData: true,
  });
};
