import BookCustomResolvers from './books/resolvers';
import { PruebaResolvers } from './prueba/resolvers';
import { UserCustomResolvers } from './users/resolvers';

const customResolvers = [
  PruebaResolvers,
  UserCustomResolvers,
  BookCustomResolvers,
];

export { customResolvers };
