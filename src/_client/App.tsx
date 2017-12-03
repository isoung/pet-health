import { ApolloClient, createNetworkInterface } from 'apollo-client';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as CSSModules from 'react-css-modules';
import * as DOM from 'react-dom';

import { LoginContainer } from '_client/containers/login/LoginContainer';

const networkInterface = createNetworkInterface({
  uri: '/graphql'
});

const createClient: any = () => {
  return new ApolloClient({
    networkInterface: networkInterface
  });
};

const styles = require('./_App.scss');
@CSSModules(styles, { allowMultiple: true })
export class App extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <LoginContainer/>
      </div>
    );
  }
}

DOM.render((
  <ApolloProvider client={createClient()}>
    <App/>
  </ApolloProvider>
), document.getElementById('app-root'));
