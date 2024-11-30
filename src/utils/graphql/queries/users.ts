import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      name
      email
      image
      role
      deleted
      enabled
    }
  }
`;

export const GET_USER = gql`
  query User($userId: String!) {
    user(id: $userId) {
      id
      name
      email
      image
      role
      deleted
      enabled
    }
  }
`;
