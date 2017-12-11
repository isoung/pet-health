import * as mongoose from 'mongoose';

import { BaseModel } from 'models/base.model';
import { createModel } from 'models/createModel';

class User extends BaseModel {
  public static schema: mongoose.SchemaDefinition = {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  };

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public phoneNumber: string;
}

export interface IUserModel extends mongoose.Document, User {}

export const UserModel = createModel<IUserModel>(new mongoose.Schema(User.schema), User, 'user');
