import * as React from 'react';
import * as CSSModules from 'react-css-modules';

import { Input } from '_client/components/input/Input';

declare var $: any;

const styles = require('./_NewDeviceFormModal.scss');
@CSSModules(styles)
export class NewDeviceFormModal extends React.Component<any, any> {
  constructor(props?: any) {
    super(props);

    this.state = {
      serialNumber: '',
      deviceName: '',
    };

    this.handleCancelBtnClick = this.handleCancelBtnClick.bind(this);
    this.handleCreateBtnClick = this.handleCreateBtnClick.bind(this);
    this.handleInputSerialNumber = this.handleInputSerialNumber.bind(this);
    this.handleInputDeviceName = this.handleInputDeviceName.bind(this);
  }

  public render() {
    return (
      <div className='modal' id='newDeviceFormModal' styleName='container'>
        <Input value={this.state.serialNumber} placeholder='Serial Number' password={false} onInputChange={this.handleInputSerialNumber}/>
        <Input value={this.state.deviceName} placeholder='Enter a Device Name...' password={false} onInputChange={this.handleInputDeviceName}/>
        <button className='red' styleName='cancel-btn' onClick={this.handleCancelBtnClick}>Cancel</button>
        <button className='green' styleName='create-btn' onClick={this.handleCreateBtnClick}>Create</button>
      </div>
    );
  }

  private handleInputSerialNumber(event: any) {
    this.setState({
      serialNumber: event.target.value
    });
  }

  private handleInputDeviceName(event: any) {
    this.setState({
      deviceName: event.target.value
    });
  }

  private handleCancelBtnClick() {
    $('#newDeviceFormModal').modal('close');
    this.setState({
      serialNumber: '',
      deviceName: ''
    });
  }

  private handleCreateBtnClick() {
    this.props.createDevice(this.state.serialNumber, this.state.deviceName);
    this.setState({
      serialNumber: '',
      deviceName: ''
    });
    // $('#newDeviceFormModal').modal('close');
    // this.setState({
    //   serialNumber: '',
    //   deviceName: ''
    // });
  }
}
