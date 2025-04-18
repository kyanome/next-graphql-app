import {
  useCreatePostMutation,
  useGetCategoriesQuery,
} from "@/src/graphql/generated";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 自動生成されたフックを使用してカテゴリ取得
  const [{ data: categoriesData }] = useGetCategoriesQuery();

  // 自動生成されたフックを使用して投稿作成
  const [{ fetching }, createPost] = useCreatePostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createPost({
      title,
      content,
      categoryIds: selectedCategories.length ? selectedCategories : undefined,
    });
    if (result.data?.createPost) {
      router.push("/");
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-32"
          />
        </div>
        {categoriesData?.categories && categoriesData.categories.length > 0 && (
          <div>
            <label className="block mb-1">Categories</label>
            <div className="space-y-2">
              {categoriesData?.categories?.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id!)}
                    onChange={() => handleCategoryChange(category.id!)}
                    className="mr-2"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={fetching}
        >
          {fetching ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
