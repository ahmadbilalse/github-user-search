import { ApolloServer, gql } from 'apollo-server-micro'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const typeDefs = gql`
  type Query {
    user(login: String): User
  }
  type User {
    avatarUrl: String
    bio: String
    name: String
    login: String
    createdAt: String
    followers: Followers
    following: Following
    location: String
    twitterUsername: String
    repositories: Repositories
    websiteUrl: String
    company: String
  }

  type Followers {
    totalCount: Int
  }

  type Following {
    totalCount: Int
  }

  type Repositories {
    totalCount: Int
  }
`

const GITHUB_USER_DATA = gql`
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
      following {
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

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.GITHUB_KEY}`,
  }
});

const resolvers = {
  Query: {
    user: async (_: any, args: any) => {
      const data = await client
        .query({
          query: GITHUB_USER_DATA,
          variables: {
            login: args.login,
          },
        })
        .then(result => {
          return result.data.user;
        });
      return data;
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const startServer = apolloServer.start()

export default async function handler(req: MicroRequest, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
