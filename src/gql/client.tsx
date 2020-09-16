import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client'

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

interface Headers {
  headers: object,
}

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: Headers) => ({
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      ...headers,
    },
  }));
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache()
})

export default client
