import { useState } from "react";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "@/src/graphql/generated";

export default function Categories() {
  const [name, setName] = useState("");

  // 自動生成されたフックを使用してカテゴリを取得
  const [{ data, fetching, error }, reexecuteQuery] = useGetCategoriesQuery();

  // 自動生成されたフックを使用してカテゴリを作成
  const [{ fetching: creating }, createCategory] = useCreateCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const result = await createCategory({ name });
    if (result.data?.createCategory) {
      setName("");
      // カテゴリリストを更新
      reexecuteQuery({ requestPolicy: "network-only" });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create New Category</h2>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={creating}
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Categories</h2>
        {fetching ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : data?.categories?.length ? (
          <ul className="space-y-2">
            {data.categories.map((category) => (
              <li key={category.id} className="border p-3 rounded">
                {category.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
}
