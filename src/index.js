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
  uri: "https://positivecovide-stagmotor-8899.hasurakarta.app/v1/graphql",
  headers: {
    'x-hasura-admin-secret': 'WnwYePisangI5fo0e4MTNq03Ro9yMwCBrCg6Y5IdTerigurvLS7Z0WGVQHoLMFjlFs3Js4K19I'
  },
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider >,
  document.getElementById('root')
);
