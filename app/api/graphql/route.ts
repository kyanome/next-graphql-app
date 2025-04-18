import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";

// GraphQL Yogaサーバーの作成
const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

// App RouterのGET/POSTハンドラとしてエクスポート
export { handleRequest as GET, handleRequest as POST };
