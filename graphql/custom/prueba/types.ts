import { gql } from 'apollo-server-micro';

const CustomPruebaTypes = gql`
  type Prueba {
    id: ID
    nombre: String
  }
  type Query {
    pruebaQuery(id: ID): Prueba
  }

  input Enum_RoleNameInput {
    set: Enum_RoleName
  }

  enum Enum_RoleName {
    USER
    ADMIN
  }
`;

export { CustomPruebaTypes };
