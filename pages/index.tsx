import { useGetPostsQuery } from "@/src/graphql/generated";

export default function Home() {
  // 自動生成されたフックを使用
  const [{ data, fetching, error }] = useGetPostsQuery();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {data?.posts && data.posts.length > 0 ? (
        <ul className="space-y-4">
          {data.posts.map((post) => (
            <li key={post.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2">{post.content}</p>
              <p className="mt-2 text-sm">
                Published: {post.published ? "Yes" : "No"}
              </p>
              {post.categories && post.categories.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-semibold">Categories:</p>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {post.categories.map((category) => (
                      <li
                        key={category.id}
                        className="bg-gray-200 px-2 py-1 rounded text-xs"
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found. Create some first!</p>
      )}
    </div>
  );
}
