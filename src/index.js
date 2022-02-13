import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://positive-stag-88.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'WnwYePI5fo0e4MTNq03Ro9yMwCBrCg6Y5IdTrvLS7Z0WGVQHoLMFjlFs3Js4K19I'
  },
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider >,
  document.getElementById('root')
);
