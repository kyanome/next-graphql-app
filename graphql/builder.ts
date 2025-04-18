import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { prisma } from "@/lib/prisma";
import { DateTimeResolver } from "graphql-scalars";
import type { PrismaClient } from "@prisma/client";

// Pothos SchemaBuilderの設定
export const builder = new SchemaBuilder<{
  PrismaTypes: {
    model: {
      Post: PrismaClient["post"];
      Category: PrismaClient["category"];
    };
  };
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

// DateTimeスカラー型の定義 - 修正版
builder.addScalarType("DateTime", DateTimeResolver, {});

// ルートタイプの定義
builder.queryType({});
builder.mutationType({});
