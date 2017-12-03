import * as React from 'react';
import * as CSSModules from 'react-css-modules';

import { Input } from '_client/components/input/Input';

interface ILoginFormProps {
  handleAuthentication: any;
}

interface ILoginFormState {
  email: string;
  password: string;
}

const styles = require('./_LoginForm.scss');
@CSSModules(styles)
export class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  constructor(props?: any) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailInputOnChange = this.handleEmailInputOnChange.bind(this);
    this.handlePasswordInputOnChange = this.handlePasswordInputOnChange.bind(this);
    this.handleLoginBtnClick = this.handleLoginBtnClick.bind(this);
  }

  public render() {
    return (
      <div styleName='container'>
        <span>pet health io</span>
        <Input placeholder='Email' styleName='email-input' onInputChange={this.handleEmailInputOnChange}/>
        <Input placeholder='Passsword' password={true} onInputChange={this.handlePasswordInputOnChange}/>
        <button styleName='login-button' onClick={this.handleLoginBtnClick}>Login</button>
      </div>
    );
  }

  private handleEmailInputOnChange(event: any) {
    this.setState({
      email: event.target.value
    });
  }

  private handlePasswordInputOnChange(event: any) {
    this.setState({
      password: event.target.value
    });
  }

  private async handleLoginBtnClick() {
    this.props.handleAuthentication(this.state.email, this.state.password);
  }
}
