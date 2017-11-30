import * as mongoose from 'mongoose';

export const connectDb = (mongoUrl: string) => {
  (mongoose as any).Promise = global.Promise;
  mongoose.connect(mongoUrl, {
    useMongoClient: true
  });
};
