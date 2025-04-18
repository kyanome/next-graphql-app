import { gql } from "urql";

export const GetPosts = gql(`
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
`);

export const GetPost = gql(`
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
`);

export const GetCategories = gql(`
  query GetCategories {
    categories {
      id
      name
    }
  }
`);
