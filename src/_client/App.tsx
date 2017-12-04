import { ApolloClient, createNetworkInterface } from 'apollo-client';
import * as React from 'react';
import { ApolloProvider, compose, gql, graphql } from 'react-apollo';
import * as CSSModules from 'react-css-modules';
import * as DOM from 'react-dom';

import { DashboardContainer } from '_client/containers/dashboard/DashboardContainer';
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
  public static authenticateAPIKeyQuery = gql`
    mutation authenticateAPIKey($apiKey: String!) {
      authenticated: authenticateAPIKey(apiKey: $apiKey)
    }
  `;

  constructor(props?: any) {
    super(props);

    this.state = {
      authenticated: false,
      loading: true
    };

    this.displayLoginOrApp = this.displayLoginOrApp.bind(this);
  }

  public componentDidMount() {
    this.displayLoginOrApp();
  }

  public render() {
    if (this.state.authenticated) {
      return (
        <div>
          <DashboardContainer/>
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div></div>
      );
    }

    return (
      <div styleName='login'>
        <LoginContainer/>
      </div>
    );
  }

  private async displayLoginOrApp() {
    if (localStorage.getItem('apiKey')) {
      const apiKey = localStorage.getItem('apiKey');

      const res = await this.props.authenticateAPIKeyQuery({
        variables: {
          apiKey: apiKey
        }
      });

      const authenticated = res.data.authenticated;

      this.setState({
        authenticated: authenticated,
        loading: false
      });
    }
    else {
      this.setState({
        authenticated: false,
        loading: false
      });
    }
  }
}

export const AppContainer: any = compose(
  graphql(App.authenticateAPIKeyQuery, { name: 'authenticateAPIKeyQuery' })
)(App);

DOM.render((
  <ApolloProvider client={createClient()}>
    <AppContainer/>
  </ApolloProvider>
), document.getElementById('app-root'));
