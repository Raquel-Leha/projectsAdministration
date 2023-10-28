import {gql} from 'graphql-tag'


export const typeDefs = gql`
  type Query {
    posts: [Post]
    post(_id: ID!): Post
    comments: [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    createPost(image: String, title: String, body: String): Post
    createComment(comment: String, postId: ID): Comment
    deletePost(_id: ID!): Post
    deleteComment(_id: ID!): Comment
    updatePost(_id: ID!, image: String, title: String!, body: String): Post
    updateComment(_id: ID!, comment: String!, postId: ID!): Comment
  }

  type Post {
    _id: ID
    image: String
    title: String
    body: String
    createAt: String
    updateAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    comment: String
    post: Post
    createAt: String
    updateAt: String
  }
`