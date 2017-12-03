import * as React from 'react';
import { compose, gql, graphql } from 'react-apollo';

import { IMaterialize } from '_client/_common/materialize';
import { LoginForm } from '_client/components/loginForm/LoginForm';

declare var Materialize: IMaterialize;

class LoginContainerComponent extends React.Component<any, any> {
  public static authenticateQuery = gql`
    mutation authenticateUser($email: String!, $password: String!) {
      apiKey: authenticateUser(email: $email, password: $password)
    }
  `;

  constructor(props?: any) {
    super(props);

    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  public render() {
    return (
      <LoginForm handleAuthentication={this.handleAuthentication}/>
    );
  }

  private async handleAuthentication(email: string, password: string) {
    try {
      const res = await this.props.authenticateQuery({
        variables: {
          email: email,
          password: password
        }
      });

      if (!res) {
        throw new Error();
      }

      window.localStorage.setItem('apiKey', res.data.apiKey);
      location.reload();
    }
    catch (err) {
      console.log(err);
      Materialize.toast('You username and/or password is incorrect', 2000, 'red');
    }
  }
}

export const LoginContainer: any = compose(
  graphql(LoginContainerComponent.authenticateQuery, { name: 'authenticateQuery' })
)(LoginContainerComponent);
