import { ApolloClient, createNetworkInterface } from 'apollo-client';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as DOM from 'react-dom';

const networkInterface = createNetworkInterface({
  uri: '/graphql'
});

const createClient: any = () => {
  return new ApolloClient({
    networkInterface: networkInterface
  });
};

export class App extends React.Component<any, any> {
  public render() {
    return (
      <div>
        Pet Health
      </div>
    );
  }
}

DOM.render((
  <ApolloProvider client={createClient()}>
    <App/>
  </ApolloProvider>
), document.getElementById('app-root'));
