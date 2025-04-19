# Next.js GraphQL Application with Python Backend

このプロジェクトは Next.js フロントエンドと Python（FastAPI + Strawberry GraphQL）バックエンドを使用したフルスタックアプリケーションです。

## 技術スタック

### フロントエンド

- Next.js
- TypeScript
- Tailwind CSS
- urql (GraphQL クライアント)

### バックエンド

- Python（Poetry による依存関係管理）
- FastAPI
- Strawberry GraphQL
- SQLAlchemy
- PostgreSQL

## 前提条件

- Node.js と npm
- Poetry（Python の依存関係管理ツール）
  ```bash
  # Poetryのインストール
  curl -sSL https://install.python-poetry.org | python3 -
  ```
- Docker（PostgreSQL コンテナ用）

## セットアップ

### データベースの起動

```bash
npm run dev:docker
```

### Python バックエンドの設定

```bash
# 依存関係のインストール（Poetryを使用）
npm run backend:install

# データベースマイグレーション
npm run backend:migrate

# バックエンドサーバー起動
npm run backend:dev
```

### フロントエンドの設定

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 動作確認

- フロントエンド: http://localhost:3000
- GraphQL API: http://localhost:8000/graphql

## 機能

- 投稿（Post）の一覧表示
- カテゴリ（Category）の作成と管理
- 投稿の作成とカテゴリとの関連付け

## プロジェクト構造

```
.
├── app                     # Next.js App Router
├── backend/                # Pythonバックエンド
│   ├── app/                # FastAPIアプリケーション
│   │   ├── database/       # データベース設定
│   │   ├── graphql/        # GraphQL関連ファイル
│   │   ├── models/         # SQLAlchemyモデル
│   │   └── schemas/        # Strawberryスキーマ
│   ├── migrations/         # Alembicマイグレーション
│   └── pyproject.toml      # Poetry依存関係定義
├── pages/                  # Next.jsページコンポーネント
├── graphql/                # JS GraphQL設定（レガシー）
└── src/                    # ソースコード
    └── graphql/            # GraphQLクエリとミューテーション
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
