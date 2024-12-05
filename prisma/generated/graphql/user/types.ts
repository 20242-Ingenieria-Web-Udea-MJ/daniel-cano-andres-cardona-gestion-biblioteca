import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: ID!
    name: String
    role: Enum_RoleName!
    email: String
    emailVerified: DateTime
    image: String
    accounts: [Account]
    sessions: [Session]
    deleted: Boolean!
    enabled: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    reservations: [Reservation]
  }

  type Query {
    users: [User]
    user(id: String!): User
  }

  input UserCreateInput {
    name: String
    role: Enum_RoleName!
    email: String
    emailVerified: DateTime
    image: String
    deleted: Boolean!
    enabled: Boolean!
  }

  input UserWhereUniqueInput {
    id: String!
  }

  input UserUpdateInput {
    name: StringInput
    role: Enum_RoleNameInput
    email: StringInput
    emailVerified: DateTimeInput
    image: StringInput
    deleted: BooleanInput
    enabled: BooleanInput
  }

  type Mutation {
    createUser(data: UserCreateInput): User

    updateUser(where: UserWhereUniqueInput!, data: UserUpdateInput): User

    deleteUser(where: UserWhereUniqueInput!): User
  }
`;
export { UserTypes };
