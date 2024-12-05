import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';

declare global {
  const apolloGlobal: ApolloClient<object>;
}

let client: ApolloClient<object>;

if (process.env.NODE_ENV === 'production') {
  client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: from([
      new HttpLink({
        // eslint-disable-next-line no-nested-ternary
        uri: 'http://localhost:3000/api/graphql',
      }),
    ]),
    connectToDevTools: true,
  });
} else {
  // @ts-expect-error fix type
  if (!global.apolloGlobal) {
    // @ts-expect-error fix type
    global.apolloGlobal = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([
        new HttpLink({
          uri: 'http://localhost:3000/api/graphql',
        }),
      ]),
      connectToDevTools: true,
    });
  }
  // @ts-expect-error fix type
  client = global.apolloGlobal;
}
export { client };
