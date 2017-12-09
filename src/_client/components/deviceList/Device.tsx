import * as React from 'react';
import * as CSSModules from 'react-css-modules';

interface IDeviceComponent {
  name: string;
  serialNumber: number;
  deviceClick: (serialNumber: number) => void;
}

const styles = require('./_Device.scss');
@CSSModules(styles)
export class Device extends React.Component<IDeviceComponent, any> {
  constructor(props?: any) {
    super(props);

    this.handleDeviceContainerClick = this.handleDeviceContainerClick.bind(this);
  }

  public render() {
    return (
      <div className='card' styleName='container' onClick={this.handleDeviceContainerClick}>
        <div className='card-title' styleName='name-label'>
          { this.props.name }
        </div>
        <div className='card-image'>
          <i className='fa fa-chart-line fa-2x' styleName='chart-icon'/>
        </div>
      </div>
    );
  }

  private handleDeviceContainerClick() {
    this.props.deviceClick(this.props.serialNumber);
  }
}
