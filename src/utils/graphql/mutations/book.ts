import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $image: String!
    $genre: String!
    $copies_available: Int!
  ) {
    createBook(
      title: $title
      author: $author
      image: $image
      genre: $genre
      copies_available: $copies_available
    ) {
      id
      title
      author
      image
      genre
      copies_available
    }
  }
`;

export const RESERVE_BOOK = gql`
  mutation Mutation($userId: String!, $bookId: String!) {
    reserveBook(userId: $userId, bookId: $bookId)
  }
`;

export const MARK_AS_RETURNED = gql`
  mutation Mutation($reservationId: String!) {
    markAsReturned(reservationId: $reservationId)
  }
`;

export const UPDATE_BOOK = gql`
  mutation Mutation($where: BookWhereUniqueInput!, $data: BookUpdateInput) {
    updateBook(where: $where, data: $data) {
      id
      image
      title
      genre
      author
      copies_available
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: String!) {
    deleteBookCustom(id: $id) {
      id
      title
      author
    }
  }
`;
