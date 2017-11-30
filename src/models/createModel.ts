import * as mongoose from 'mongoose';
import loadClass = require('mongoose-class-wrapper');

export function createModel<T extends mongoose.Document>(schema: mongoose.Schema, target: object, modelName: string) {
  schema.plugin(loadClass, { target: target });

  return mongoose.model<T>(modelName + 's', schema, modelName);
}
