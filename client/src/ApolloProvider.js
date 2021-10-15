import React from 'react';
import App from './App';
import { InMemoryCache, ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)