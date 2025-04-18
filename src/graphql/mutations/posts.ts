import { gql } from "urql";

export const CreatePost = gql(`
  mutation CreatePost($title: String, $content: String, $categoryIds: [String!]) {
    createPost(title: $title, content: $content, categoryIds: $categoryIds) {
      id
      title
      content
    }
  }
`);

export const CreateCategory = gql(`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      id
      name
    }
  }
`);
