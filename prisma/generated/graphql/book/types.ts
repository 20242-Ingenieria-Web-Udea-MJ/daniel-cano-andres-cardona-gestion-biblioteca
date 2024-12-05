import { gql } from 'apollo-server-micro';

const BookTypes = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    image: String!
    genre: String!
    copies_available: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    reservations: [Reservation]
  }

  type Query {
    books: [Book]
    book(id: String!): Book
  }

  input BookCreateInput {
    title: String!
    author: String!
    image: String!
    genre: String!
    copies_available: Int!
  }

  input BookWhereUniqueInput {
    id: String!
  }

  input BookUpdateInput {
    title: StringInput
    author: StringInput
    image: StringInput
    genre: StringInput
    copies_available: IntInput
  }

  type Mutation {
    createBook(data: BookCreateInput): Book

    updateBook(where: BookWhereUniqueInput!, data: BookUpdateInput): Book

    deleteBook(where: BookWhereUniqueInput!): Book
  }
`;
export { BookTypes };
