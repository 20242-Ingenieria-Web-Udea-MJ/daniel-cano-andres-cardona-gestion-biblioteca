import { gql } from '@apollo/client';

export const GET_ALL_BOOKS = gql`
  query Query {
    books {
      id
      title
      image
      genre
      copies_available
      author
    }
  }
`;

export const GET_BOOK = gql`
  query Query($bookId: String!) {
    book(id: $bookId) {
      id
      title
      author
      genre
      image
      copies_available
    }
  }
`;
