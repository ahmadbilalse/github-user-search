import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

export const GITHUB_USER_DATA = gql`
  query ($login: String!) {
    user(login: $login) {
      avatarUrl
      bio
      name
      login
      createdAt
      followers {
        totalCount
      }
      location
      twitterUsername
      repositories {
        totalCount
      }
      websiteUrl
      company
    }
  }
`;
