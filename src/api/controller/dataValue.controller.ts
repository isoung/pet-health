import { IDataValueInput } from 'api/graphql/dataValue.graphql';
import { Scope } from 'api/scope';
import { DataValueModel } from 'models/dataValue.model';
import { DeviceModel } from 'models/device.model';

export class DataValueController {
  public async createInstance(scope: Scope, args: IDataValueInput) {
    const device = await DeviceModel.findOne({
      serialNumber: args.serialNumber,
      active: 1
    });

    if (!device) {
      throw new Error('There was no device associated with that serialNumber');
    }

    const date = new Date(args.publishedDate);

    const dataValue = new DataValueModel({
      value: args.value,
      device: device,
      publishedDate: Math.round(date.getTime() / 1000)
    });

    const savedDataValue = await dataValue.save();
    return savedDataValue;
  }
}