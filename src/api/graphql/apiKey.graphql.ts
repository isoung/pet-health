import { APIKeyController } from 'api/controller/apiKey.controller';
import { IRequestScope } from 'api/scope';

export const schema = ``;

export const mutations = `
  authenticateAPIKey(apiKey: String!): Boolean
`;

export const rootQuery = ``;

export const resolvers = {
  RootQuery: {

  },
  Mutations: {
    async authenticateAPIKey(parent: {}, args: any, scope: IRequestScope) {
      const apiKeyController = new APIKeyController();

      return apiKeyController.authenticateAPIKey(args.apiKey);
    }
  }
};
