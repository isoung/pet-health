import * as mongoose from 'mongoose';

import { BaseModel } from 'models/base.model';
import { createModel } from 'models/createModel';
import { IDeviceModel } from 'models/device.model';

class DataValue extends BaseModel {
  public static schema: mongoose.SchemaDefinition = {
    value: { type: Number, required: true },
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true
    },
    publishedDate: { type: Number, required: true }
  };

  public value: number;
  public device: IDeviceModel;
  public publishedDate: number;
}

export interface IDataValueModel extends mongoose.Document, DataValue {}

export const DataValueModel = createModel<IDataValueModel>(new mongoose.Schema(DataValue.schema), DataValue, 'dataValue');
