import { IDeviceInput } from 'api/graphql/device.graphql';
import { Scope } from 'api/scope';
import { DeviceModel } from 'models/device.model';

export class DeviceController {
  public async createInstance(scope: Scope, args: IDeviceInput) {
    const user = scope.getUser();
    console.log(user);

    const foundDevice = await DeviceModel.findOne({
      serialNumber: args.serialNumber
    });

    if (foundDevice) {
      throw new Error('There was already a device with that serial number');
    }

    const device = new DeviceModel({
      serialNumber: args.serialNumber,
      user: user,
      active: true
    });

    const savedDevice = await device.save();
    return savedDevice;
  }

  public async readUserDevices(scope: Scope) {
    const user = scope.getUser();

    const allDevices = await DeviceModel.find({
      user: user
    });

    return allDevices;
  }
}
