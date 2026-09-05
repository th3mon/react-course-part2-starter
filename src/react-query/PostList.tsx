import { Fragment } from "react";
import { usePosts } from "../hooks/usePosts";

const PostList = () => {
  const pageSize = 10;

  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePosts({
      pageSize,
    });

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading Posts</p>;

  return (
    <>
      <ul className="list-group">
        {data.pages.map((posts, index) => (
          <Fragment key={index}>
            {posts?.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </Fragment>
        ))}
      </ul>

      <div className="my-3">
        <button
          className="btn btn-primary"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading Posts" : "Load More Posts"}
        </button>
      </div>
    </>
  );
};

export default PostList;
