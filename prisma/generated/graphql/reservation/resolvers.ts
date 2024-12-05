import prisma from 'config/prisma';

const ReservationResolvers = {
  Reservation: {
    user: async (parent: any, _: any) => {
      return await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
    },
    book: async (parent: any, _: any) => {
      return await prisma.book.findUnique({
        where: {
          id: parent.bookId,
        },
      });
    },
  },
  Query: {
    reservations: async () => {
      return await prisma.reservation.findMany({});
    },
    reservation: async (_: any, args: any) => {
      return await prisma.reservation.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createReservation: async (_: any, args: any) => {
      return await prisma.reservation.create({
        data: {
          ...args.data,
          reservedAt: new Date(args.data.reservedAt).toISOString(),
        },
      });
    },
    updateReservation: async (_: any, args: any) => {
      return await prisma.reservation.update({
        where: {
          id: args.where.id,
        },
        data: {
          ...args.data,
          ...(args.data.reservedAt && {
            reservedAt: new Date(args.data.reservedAt).toISOString(),
          }),
        },
      });
    },
    deleteReservation: async (_: any, args: any) => {
      return await prisma.reservation.delete({
        where: {
          id: args.where.id,
        },
      });
    },
  },
};

export { ReservationResolvers };
