import { gql } from '@apollo/client';

export const GET_ALL_RESERVATIONS = gql`
  query Query {
    reservations {
      user {
        name
        email
      }
      book {
        title
        author
      }
      id
      returned
      reservedAt
    }
  }
`;
