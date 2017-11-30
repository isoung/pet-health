import * as express from 'express';

import { APIKeyModel } from 'models/apiKey.model';
import { IUserModel, UserModel } from 'models/user.model';

export interface IRequestScope extends express.Request {
  scope: Scope;
}

export class Scope {
  private user: IUserModel;

  public async initializeScope(req: express.Request) {
    const apiKeyRequest = req.headers['x-api-key'];

    const apiKey = await APIKeyModel.findOne({
      key: apiKeyRequest
    });

    const mutation = req.body.query.includes('mutation');
    const createUser = req.body.query.includes('createUser');
    const createDataValue = req.body.query.includes('createDataValue');

    if (!apiKey && !mutation && !createUser && !createDataValue) {
      throw new Error('You are not authorized for this request');
    }

    if (apiKey) {
      this.user = await UserModel.findById(apiKey.user);
    }
  }

  public getUser() {
    return this.user;
  }
}
