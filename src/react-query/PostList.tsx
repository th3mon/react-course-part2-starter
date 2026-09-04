import { useState } from "react";
import { usePosts } from "../hooks/usePosts";

const PostList = () => {
  const [userId, setUserId] = useState<number | undefined>();
  const { data: posts, error, isLoading } = usePosts(userId);

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading Posts</p>;

  return (
    <>
      <select
        onChange={(event) => setUserId(Number(event.target.value))}
        value={userId}
        className="form-select mb-3"
      >
        <option value="">All Posts</option>
        <option value="1">User 1 Posts</option>
        <option value="2">User 2 Posts</option>
        <option value="3">User 3 Posts</option>
      </select>

      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
