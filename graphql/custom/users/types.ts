import { gql } from 'apollo-server-micro';

const CustomUserTypes = gql`
  type Mutation {
    createUserCustom(data: userCreateInputCustom): User
  }
  type Query {
    userCustomSecure(token: String!): [User]
  }
  input userCreateInputCustom {
    name: String!
    role: Enum_RoleName!
    email: String!
    emailVerified: DateTime
    image: String
    deleted: Boolean
    enabled: Boolean
    accounts: accountInputCustom
  }

  input accountInputCustom {
    create: accountCreateInputCustom
  }
  input accountCreateInputCustom {
    type: String!
    provider: String!
    providerAccountId: String!
    refresh_token: String
    access_token: String
    expires_at: Int
    token_type: String
    scope: String
    id_token: String
    session_state: String
  }
`;

export { CustomUserTypes };
