import { gql } from 'apollo-server-micro';

const CustomPruebaTypes = gql`
  type Prueba {
    id: ID
    nombre: String
  }
  type Query {
    pruebaQuery(id: ID): Prueba
  }
`;

export { CustomPruebaTypes };
