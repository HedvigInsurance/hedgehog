import { apolloClient } from 'api/apollo-client'
import { App } from 'App'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import '@babel/polyfill/dist/polyfill.min'

const appElement = document.getElementById('react-root')

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient!}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  appElement,
)
