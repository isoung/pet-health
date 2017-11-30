import * as mongoose from 'mongoose';

import { BaseModel } from 'models/base.model';
import { createModel } from 'models/createModel';
import { IUserModel } from 'models/user.model';

class Device extends BaseModel {
  public static schema: mongoose.SchemaDefinition = {
    serialNumber: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    active: { type: Number, required: true }
  };

  public serialNumber: string;
  public user: IUserModel;
  public active: number;
}

export interface IDeviceModel extends mongoose.Document, Device {}

export const DeviceModel = createModel<IDeviceModel>(new mongoose.Schema(Device.schema), Device, 'device');
