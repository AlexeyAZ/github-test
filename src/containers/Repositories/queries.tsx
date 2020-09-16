import { gql } from '@apollo/client'

const GET_REPOSITORIES = gql`
  query SearchResultItemConnection($first: Int, $query: String!, $after: String, $before: String) {
    search(first: $first, type: REPOSITORY, query: $query, after: $after, before: $before) {
      repositoryCount
      pageInfo {
        ... on PageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
      nodes {
        ... on Repository {
          databaseId
          createdAt
          stargazers {
            totalCount
          }
          description
          licenseInfo {
            name
          }
          name
          owner {
            login
            url
          }
          url
        }
      }
    }
  }
`

const GET_LICENSES = gql`
  query GetLicenses {
    licenses {
      name
      key
    }
  }
`

export {
  GET_REPOSITORIES,
  GET_LICENSES,
}
