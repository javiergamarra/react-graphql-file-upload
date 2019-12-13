import React from 'react';
import './App.css';
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";
import {ApolloProvider} from '@apollo/react-hooks'
import {UploadOneFile} from "./single-file-upload";

function App() {

    // const httpLink = new HttpLink({uri: 'http://localhost:8080/o/graphql'});

    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                authorization: `Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0`
            }
        }
    });

    const {createUploadLink} = require('apollo-upload-client');

    const apolloClient = new ApolloClient({
        // link: authLink.concat(httpLink),
        link: authLink.concat(createUploadLink({uri: 'http://localhost:8080/o/graphql'})),
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={apolloClient}>
            <div className="App">
                <UploadOneFile/>
            </div>
        </ApolloProvider>
    );
}

export default App;
