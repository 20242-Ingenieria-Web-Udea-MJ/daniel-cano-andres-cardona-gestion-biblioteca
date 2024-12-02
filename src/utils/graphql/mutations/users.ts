import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation Mutation($where: UserWhereUniqueInput!, $data: UserUpdateInput) {
    updateUser(where: $where, data: $data) {
      id
      name
      email
      role
      image
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUserCustom($data: userCreateInputCustom) {
    createUserCustom(data: $data) {
      name
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUserCustom(userId: $userId)
  }
`;
