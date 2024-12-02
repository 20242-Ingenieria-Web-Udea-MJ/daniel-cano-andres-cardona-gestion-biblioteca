import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
  mutation CreateBook($data: BookCreateInput) {
    createBook(data: $data) {
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
