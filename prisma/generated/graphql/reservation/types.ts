import { gql } from 'apollo-server-micro';

const ReservationTypes = gql`
  type Reservation {
    id: ID!
    userId: String!
    bookId: String!
    returned: Boolean!
    reservedAt: DateTime!
    user: User!
    book: Book!
  }

  type Query {
    reservations: [Reservation]
    reservation(id: String!): Reservation
  }

  input ReservationCreateInput {
    userId: String!
    bookId: String!
    returned: Boolean!
    reservedAt: DateTime!
  }

  input ReservationWhereUniqueInput {
    id: String!
  }

  input ReservationUpdateInput {
    userId: StringInput
    bookId: StringInput
    returned: BooleanInput
    reservedAt: DateTimeInput
  }

  type Mutation {
    createReservation(data: ReservationCreateInput): Reservation

    updateReservation(
      where: ReservationWhereUniqueInput!
      data: ReservationUpdateInput
    ): Reservation

    deleteReservation(where: ReservationWhereUniqueInput!): Reservation
  }
`;
export { ReservationTypes };
