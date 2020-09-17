import React from 'react'
import { ApolloProvider } from '@apollo/client'

import client from '../../gql/client'

import Repositories from '../Repositories'

const App = () => (
  <ApolloProvider client={client}>
    <Repositories />
  </ApolloProvider>
)

export default App
