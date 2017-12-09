import { DeviceController } from 'api/controller/device.controller';
import { IRequestScope } from 'api/scope';

export interface IDeviceInput {
  serialNumber: string;
  name: string;
}

export interface IDeviceQuery {
  id: string;
  deviceCreate: IDeviceInput;
}

export const schema = `
  type Device {
    id: String,
    serialNumber: String,
    user: User,
    name: String
  },
  input DeviceCreate {
    serialNumber: String!,
    name: String!
  }
`;

export const mutations = `
  createDevice(deviceCreate: DeviceCreate!): Device
`;

export const rootQuery = `
  devices: [Device]
`;

export const resolvers = {
  RootQuery: {
    async devices(parent: {}, args: IDeviceQuery, context: IRequestScope) {
      const deviceController = new DeviceController();
      const devices = deviceController.readUserDevices(context.scope);

      return devices;
    }
  },
  Mutations: {
    async createDevice(parent: {}, args: IDeviceQuery, context: IRequestScope) {
      const deviceController = new DeviceController();
      const device = deviceController.createInstance(context.scope, args.deviceCreate);

      return device;
    }
  }
};
