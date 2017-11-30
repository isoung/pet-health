import { DataValueController } from 'api/controller/dataValue.controller';
import { IRequestScope } from 'api/scope';

export interface IDataValueInput {
  value: number;
  serialNumber: number;
  publishedDate: string;
}

export interface IDataValueQuery {
  id: string;
  dataValueCreate: IDataValueInput;
}

export const schema = `
  type DataValue {
    id: String,
    value: Int,
    device: Device,
    publishedDate: Int
  },
  input DataValueCreate {
    value: Int!,
    serialNumber: String!,
    publishedDate: String!
  }
`;

export const mutations = `
  createDataValue(dataValueCreate: DataValueCreate!): DataValue
`;

export const rootQuery = ``;

export const resolvers = {
  RootQuery: {

  },
  Mutations: {
    async createDataValue(parent: {}, args: IDataValueQuery, context: IRequestScope) {
      const dataValueController = new DataValueController();
      const dataValue = await dataValueController.createInstance(context.scope, args.dataValueCreate);

      return dataValue;
    }
  }
};
