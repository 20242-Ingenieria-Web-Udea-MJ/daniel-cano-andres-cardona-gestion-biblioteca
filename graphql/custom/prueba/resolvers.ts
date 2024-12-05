const PruebaResolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pruebaQuery: async (_: any, args: any) => {
      return { id: 1, nombre: args.id };
    },
  },
};

export { PruebaResolvers };
