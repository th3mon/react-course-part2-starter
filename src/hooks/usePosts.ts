import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

export const usePosts = (query: PostQuery) => {
  const fetchPosts = ({ pageParam = 1 }) =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((response) => response.data);
  const getNextPageParam = (lastPage: Post[], allPages: Post[][]) =>
    lastPage.length > 0 ? allPages.length + 1 : null;

  const oneMinuteInMs = 60 * 1000;

  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    getNextPageParam,
    staleTime: oneMinuteInMs,
    keepPreviousData: true,
  });
};
