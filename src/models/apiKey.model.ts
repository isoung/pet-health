import * as mongoose from 'mongoose';
import * as randomString from 'randomstring';

import { BaseModel } from 'models/base.model';
import { createModel } from 'models/createModel';
import { IUserModel } from 'models/user.model';

class APIKey extends BaseModel {
  public static schema: mongoose.SchemaDefinition = {
    key: {
      type: String,
      required: true,
      default: randomString.generate()
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  };

  public key: string;
  public user: IUserModel;

  public toAPIFormat() {
    return {
      key: this.key
    };
  }
}

export interface IAPIKey extends mongoose.Document, APIKey {}

export const APIKeyModel = createModel<IAPIKey>(new mongoose.Schema(APIKey.schema), APIKey, 'apiKey');
