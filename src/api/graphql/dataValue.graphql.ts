import { DataValueController } from 'api/controller/dataValue.controller';
import { IRequestScope } from 'api/scope';
// import { IDeviceModel } from 'models/device.model';

export interface IDataValueInput {
  value: number;
  serialNumber: number;
  publishedDate: string;
  startDate: number;
  endDate: number;
  range: number;
}

export interface IDataValueQuery {
  id: string;
  dataValueCreate: IDataValueInput;
  readDataValue: IDataValueInput;
  readDataValues: IDataValueInput;
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
  },
  input ReadDataValue {
    serialNumber: String!,
    startDate: Int!,
    endDate: Int!
  }
`;

export const mutations = `
  createDataValue(dataValueCreate: DataValueCreate!): DataValue,
  readDataValue(readDataValue: ReadDataValue!): [DataValue]
`;

export const rootQuery = `
  dataValues(serialNumber: String!, range: Int!): [DataValue]
`;

export const resolvers = {
  RootQuery: {
    async dataValues(parent: {}, args: IDataValueInput, context: IRequestScope) {
      const dataValueController = new DataValueController();
      const dataValues = await dataValueController.readInstancesByRange(args.serialNumber, args.range);

      return dataValues;
    }
  },
  Mutations: {
    async createDataValue(parent: {}, args: IDataValueQuery, context: IRequestScope) {
      const dataValueController = new DataValueController();
      const dataValue = await dataValueController.createInstance(context.scope, args.dataValueCreate);

      return dataValue;
    },
    async readDataValue(parent: {}, args: IDataValueQuery, context: IRequestScope) {
      const dataValueController = new DataValueController();
      const dataValues = await dataValueController.readInstancesByDateRange(args.readDataValue);

      return dataValues;
    }
  }
};
