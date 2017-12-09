import * as React from 'react';
import * as CSSModules from 'react-css-modules';

interface IInputProps {
  placeholder: string;
  styleName?: string;
  className?: any;
  password?: boolean;
  value?: string;
  onInputChange: (event: any) => void;
}

const styles = require('./_Input.scss');
@CSSModules(styles)
export class Input extends React.Component<IInputProps, any> {
  public render() {
    return <input
      value={this.props.value}
      type={this.props.password ? 'password' : 'text'}
      className={this.props.className}
      styleName='input'
      placeholder={this.props.placeholder}
      onChange={(event: any) => this.props.onInputChange(event)}
    />;
  }
}
