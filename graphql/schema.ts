import { builder } from "./builder";
import { prisma } from "@/lib/prisma";

// Postタイプの定義
builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    published: t.exposeBoolean("published"),
    publishedAt: t.expose("publishedAt", { type: "DateTime" }),
    categories: t.relation("categories"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

// Categoryタイプの定義
builder.prismaObject("Category", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    posts: t.relation("posts"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

// クエリ定義
builder.queryFields((t) => ({
  posts: t.prismaField({
    type: ["Post"],
    resolve: async (query) => {
      return prisma.post.findMany({
        select: query.select,
        include: query.include,
      });
    },
  }),
  post: t.prismaField({
    type: "Post",
    args: {
      id: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: async (query, _root, args) => {
      return prisma.post.findUnique({
        select: query.select,
        include: query.include,
        where: {
          id: args.id,
        },
      });
    },
  }),
  categories: t.prismaField({
    type: ["Category"],
    resolve: async (query) => {
      return prisma.category.findMany({
        select: query.select,
        include: query.include,
      });
    },
  }),
}));

// ミューテーション定義
builder.mutationFields((t) => ({
  createPost: t.prismaField({
    type: "Post",
    args: {
      title: t.arg.string({ required: false }),
      content: t.arg.string({ required: false }),
      categoryIds: t.arg.stringList({ required: false }),
    },
    resolve: async (query, _root, args) => {
      return prisma.post.create({
        select: query.select,
        include: query.include,
        data: {
          title: args.title || undefined,
          content: args.content || undefined,
          categories: args.categoryIds
            ? {
                connect: args.categoryIds.map((id) => ({ id })),
              }
            : undefined,
        },
      });
    },
  }),
  createCategory: t.prismaField({
    type: "Category",
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args) => {
      return prisma.category.create({
        select: query.select,
        include: query.include,
        data: {
          name: args.name,
        },
      });
    },
  }),
}));

// 最終的なスキーマをエクスポート
export const schema = builder.toSchema();
