import { APIKeyController } from 'api/controller/apiKey.controller';
import { IUserInput } from 'api/graphql/user.graphql';
import { Scope } from 'api/scope';
import { generatePassword } from 'libs/authentication/authentication';
import { UserModel } from 'models/user.model';

export class UserController {
  public async createInstance(scope: Scope, args: IUserInput) {
    const saltedPassword = await generatePassword(args.password);

    const foundUser = await UserModel.findOne({
      email: args.email
    });

    if (foundUser) {
      throw new Error('The email is already in use');
    }

    const user = new UserModel({
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      password: saltedPassword
    });

    const savedUser = await user.save();

    const apiKeyController = new APIKeyController();
    await apiKeyController.createInstance(scope, { userId: savedUser.id });

    return savedUser;
  }
}
