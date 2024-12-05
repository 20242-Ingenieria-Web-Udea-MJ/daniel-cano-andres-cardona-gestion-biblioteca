import { AccountResolvers } from './account/resolvers';
import { SessionResolvers } from './session/resolvers';
import { UserResolvers } from './user/resolvers';
import { BookResolvers } from './book/resolvers';
import { ReservationResolvers } from './reservation/resolvers';
import { VerificationTokenResolvers } from './verificationtoken/resolvers';

export const resolvers = [
  AccountResolvers,
  SessionResolvers,
  UserResolvers,
  BookResolvers,
  ReservationResolvers,
  VerificationTokenResolvers,
];
