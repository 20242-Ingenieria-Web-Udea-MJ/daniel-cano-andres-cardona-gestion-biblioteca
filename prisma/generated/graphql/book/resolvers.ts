import prisma from 'config/prisma';

const BookResolvers = {
  Book: {
    reservations: async (parent: any, _: any) => {
      return await prisma.reservation.findMany({
        where: {
          book: {
            is: {
              id: {
                equals: parent.id,
              },
            },
          },
        },
      });
    },
  },
  Query: {
    books: async () => {
      return await prisma.book.findMany({});
    },
    book: async (_: any, args: any) => {
      return await prisma.book.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createBook: async (_: any, args: any) => {
      return await prisma.book.create({
        data: { ...args.data },
      });
    },
    updateBook: async (_: any, args: any) => {
      return await prisma.book.update({
        where: {
          id: args.where.id,
        },
        data: { ...args.data },
      });
    },
    deleteBook: async (_: any, args: any) => {
      return await prisma.book.delete({
        where: {
          id: args.where.id,
        },
      });
    },
  },
};

export { BookResolvers };
