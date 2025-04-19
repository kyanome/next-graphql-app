import { AppProps } from "next/app";
import {
  Client,
  Provider,
  createClient,
  fetchExchange,
  cacheExchange,
} from "urql";
import Link from "next/link";
import "../app/globals.css";

// GraphQLクライアントの設定を更新
// Python FastAPI + Strawberryバックエンドのエンドポイントに向けます
const client = createClient({
  // Python FastAPIエンドポイント
  url: "http://localhost:8000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-blue-500 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-blue-500 hover:underline">
                  Create Post
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-blue-500 hover:underline"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto py-8 px-4">
          <Component {...pageProps} />
        </main>
      </div>
    </Provider>
  );
}

export default MyApp;
