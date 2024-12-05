import prisma from 'config/prisma';

const AccountResolvers = {
  Account: {
    user: async (parent: any, _: any) => {
      return await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
    },
  },
  Query: {
    accounts: async () => {
      return await prisma.account.findMany({});
    },
    account: async (_: any, args: any) => {
      return await prisma.account.findUnique({
        where: {
          // @ts-expect-error fix type
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createAccount: async (_: any, args: any) => {
      return await prisma.account.create({
        data: { ...args.data },
      });
    },
    updateAccount: async (_: any, args: any) => {
      return await prisma.account.update({
        where: {
          // @ts-expect-error fix type
          id: args.where.id,
        },
        data: { ...args.data },
      });
    },
    deleteAccount: async (_: any, args: any) => {
      return await prisma.account.delete({
        where: {
          // @ts-expect-error fix type
          id: args.where.id,
        },
      });
    },
  },
};

export { AccountResolvers };
