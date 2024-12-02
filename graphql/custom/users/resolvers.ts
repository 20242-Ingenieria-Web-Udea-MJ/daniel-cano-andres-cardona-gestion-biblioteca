import prisma from 'config/prisma';

const UserCustomResolvers = {
  User: {},
  Query: {},
  Mutation: {
    createUserCustom: async (_: any, args: any) => {
      return await prisma.user.create({
        data: args.data,
      });
    },
    deleteUserCustom: async (
      parent: unknown,
      { userId }: { userId: string }
    ) => {
      try {
        await prisma.$transaction(async (prisma) => {
          await prisma.session.deleteMany({
            where: { userId },
          });

          return prisma.user.delete({
            where: { id: userId },
          });
        });

        return 'Usuario eliminado';
      } catch (error) {
        console.error('Error eliminando usuario:', error);
        throw new Error('Hubo un problema al eliminar el usuario.');
      }
    },
  },
};

export { UserCustomResolvers };
