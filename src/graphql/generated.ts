import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Post>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory?: Maybe<Category>;
  createPost?: Maybe<Post>;
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  categories?: Maybe<Array<Category>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  published?: Maybe<Scalars['Boolean']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Category>>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
};


export type QueryPostArgs = {
  id: Scalars['String']['input'];
};

export type CreatePostMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id?: string | null, title?: string | null, content?: string | null } | null };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: { __typename?: 'Category', id?: string | null, name?: string | null } | null };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id?: string | null, title?: string | null, content?: string | null, published?: boolean | null, categories?: Array<{ __typename?: 'Category', id?: string | null, name?: string | null }> | null }> | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id?: string | null, title?: string | null, content?: string | null, published?: boolean | null, categories?: Array<{ __typename?: 'Category', id?: string | null, name?: string | null }> | null } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id?: string | null, name?: string | null }> | null };


export const CreatePostDocument = gql`
    mutation CreatePost($title: String, $content: String, $categoryIds: [String!]) {
  createPost(title: $title, content: $content, categoryIds: $categoryIds) {
    id
    title
    content
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!) {
  createCategory(name: $name) {
    id
    name
  }
}
    `;

export function useCreateCategoryMutation() {
  return Urql.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument);
};
export const GetPostsDocument = gql`
    query GetPosts {
  posts {
    id
    title
    content
    published
    categories {
      id
      name
    }
  }
}
    `;

export function useGetPostsQuery(options?: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPostsQuery, GetPostsQueryVariables>({ query: GetPostsDocument, ...options });
};
export const GetPostDocument = gql`
    query GetPost($id: String!) {
  post(id: $id) {
    id
    title
    content
    published
    categories {
      id
      name
    }
  }
}
    `;

export function useGetPostQuery(options: Omit<Urql.UseQueryArgs<GetPostQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPostQuery, GetPostQueryVariables>({ query: GetPostDocument, ...options });
};
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    id
    name
  }
}
    `;

export function useGetCategoriesQuery(options?: Omit<Urql.UseQueryArgs<GetCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>({ query: GetCategoriesDocument, ...options });
};