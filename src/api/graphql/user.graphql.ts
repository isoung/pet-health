import { UserController } from 'api/controller/user.controller';
import { IRequestScope } from 'api/scope';
import { UserModel } from 'models/user.model';

export interface IUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUserQuery {
  id: string;
  userCreate: IUserInput;
  userUpdate: IUserInput;
}

export const schema = `
  type User {
    id: String,
    email: String,
    firstName: String,
    lastName: String,
  },
  input UserCreate {
    email: String!,
    firstName: String!,
    lastName: String!,
    password: String!,
  },
  input UserUpdate {
    firstName: String,
    lastName: String,
    admin: Boolean,
    active: Boolean
  }
`;

export const mutations = `
  createUser(userCreate: UserCreate!): User,
  updateUser(id: String!, userUpdate: UserUpdate!): User
`;

export const rootQuery = `
  # Returns the current user
  me: User
`;

export const resolvers = {
  RootQuery: {
    async me(parent: {}, args: IUserInput, context: IRequestScope) {
      return UserModel.findById(context.scope.getUser());
    }
  },
  Mutations: {
    async createUser(parent: {}, args: IUserQuery, context: IRequestScope) {
      const userController = new UserController();
      const user = await userController.createInstance(
        context.scope,
        args.userCreate
      );

      return user;
    }
    // async updateUser(parent: {}, args: IUserQuery, context: IContext) {
    //   if (args.userUpdate.admin) {
    //     context.scope.validateScope(Roles.ADMIN);
    //   }
    //   else {
    //     context.scope.validateScope(Roles.USER);
    //   }

    //   return new User(await User.findOneAndUpdate({ _id: args.id }, args.userUpdate));
    // }
  },
  User: {
    // organization(parent: any, args: any, context: IContext) {
    //   return Organization.findById(context.scope.getOrganizationId());
    // }
  }
};
