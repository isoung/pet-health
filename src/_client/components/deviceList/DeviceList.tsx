// import * as classnames from 'classnames';
import * as React from 'react';
import * as CSSModules from 'react-css-modules';

import { Device } from '_client/components/deviceList/Device';
import { ChartModalContainer } from '_client/containers/chart/ChartModal';
import { NewDeviceFormContainer } from '_client/containers/newDeviceForm/NewDeviceForm';

declare var $: any;

interface IDeviceListComponent {
  devices: [{
    name: string;
    serialNumber: number;
  }];
}

const styles = require('./_DeviceList.scss');
@CSSModules(styles)
export class DeviceList extends React.Component<IDeviceListComponent, any> {
  constructor(props?: any) {
    super(props);

    this.state = {
      serialNumber: ''
    };

    this.generateDeviceList = this.generateDeviceList.bind(this);
    this.handleDeviceContainerClick = this.handleDeviceContainerClick.bind(this);
  }

  public componentDidMount() {
    $(document).ready(function() {
      $('#modal1').modal();
      $('#newDeviceFormModal').modal({
        dismissible: false
      });
    });
  }

  public render() {
    return (
      <div styleName='container'>
        <ul>
          { this.generateDeviceList() }
        </ul>
        <a className='btn-floating btn-large waves-effect waves-light red' styleName='add-button' onClick={this.handleAddDeviceClick}>
          <i className='material-icons'>add</i>
        </a>
        <ChartModalContainer serialNumber={this.state.serialNumber} range={50}/>
        <NewDeviceFormContainer/>
      </div>
    );
  }

  private generateDeviceList() {
    const devices = this.props.devices.map((device, index) => {
      return (
        <li key={index} styleName='device'>
          <Device name={device.name} serialNumber={device.serialNumber} deviceClick={this.handleDeviceContainerClick}/>
        </li>
      );
    });

    return devices;
  }

  private handleDeviceContainerClick(serialNumber: number) {
    $('#modal1').modal('open');

    this.setState({
      serialNumber: serialNumber
    });
  }

  private handleAddDeviceClick() {
    $('#newDeviceFormModal').modal('open');
  }
}
