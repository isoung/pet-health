import { IAPIKeyParameters } from 'api/parameters/apiKey.parameters';
import { Scope } from 'api/scope';
import { APIKeyModel } from 'models/apiKey.model';

export class APIKeyController {
  public async createInstance(scope: Scope, requestBody: IAPIKeyParameters) {
    const newAPIKey = new APIKeyModel({
      user: requestBody.userId
    });

    const savedAPIKey = await newAPIKey.save();
    return savedAPIKey;
  }
}
