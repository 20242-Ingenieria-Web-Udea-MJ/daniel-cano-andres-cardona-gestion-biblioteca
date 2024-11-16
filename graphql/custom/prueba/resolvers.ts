const PruebaResolvers = {
  Query: {
    pruebaQuery: async (_: any, args: any) => {
      return { id: 1, nombre: args.id };
    },
  },
};

export { PruebaResolvers };
