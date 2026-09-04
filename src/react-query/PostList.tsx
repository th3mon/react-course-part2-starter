import { useState } from "react";
import { usePosts } from "../hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const firstPage = page === 1;

  const {
    data: posts,
    error,
    isLoading,
  } = usePosts({
    page,
    pageSize,
  });

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading Posts</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>

      <div className="my-3">
        <button
          className="btn btn-primary"
          disabled={firstPage}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button
          className="btn btn-primary ms-1"
          disabled={!Boolean(posts.length)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PostList;
