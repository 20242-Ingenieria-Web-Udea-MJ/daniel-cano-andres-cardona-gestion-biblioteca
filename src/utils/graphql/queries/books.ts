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
