import { gql } from "urql";

export const CreatePost = gql(`
  mutation CreatePost($title: String, $content: String, $categoryIds: [String!]) {
    createPost(postInput: {title: $title, content: $content, categoryIds: $categoryIds}) {
      id
      title
      content
      published
      publishedAt
      categories {
        id
        name
      }
    }
  }
`);

export const CreateCategory = gql(`
  mutation CreateCategory($name: String!) {
    createCategory(categoryInput: {name: $name}) {
      id
      name
    }
  }
`);
