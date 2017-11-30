import * as glob from 'glob';
import { makeExecutableSchema } from 'graphql-tools';
import * as GraphQLJSON from 'graphql-type-json';
import * as _ from 'lodash';
import * as path from 'path';

const constructRootQuery: () => string = () => {
  return glob.sync(path.join(__dirname, '*.graphql.ts')).map((elem) => {
    return require(elem).rootQuery;
  }).join();
};

const constructMutators = () => {
  return glob.sync(path.join(__dirname, '*.graphql.ts')).map((elem) => {
    return require(elem).mutations;
  }).join();
};

const constructResolvers = (rootResolver: {}) => {
  const resolvers = glob.sync(path.join(__dirname, '*.graphql.ts')).map((elem) => {
    return require(elem).resolvers;
  });

  resolvers.push(rootResolver);

  return _.reduce(resolvers, (result, value) => {
    return _.merge(result, value);
  }, {});
};

const constructTypeDefs = (rootSchema: string) => {
  const schemas =  glob.sync(path.join(__dirname, '*.graphql.ts')).map((elem) => {
    return require(elem).schema;
  });

  schemas.unshift(rootSchema);

  return schemas;
};

const schema = `
  scalar JSON

  type RootQuery {
    ${constructRootQuery()}
  }
  type Mutations {
    ${constructMutators()}
  }
  schema {
    query: RootQuery,
    mutation: Mutations
  }
`;

const rootResolvers = {
  JSON: GraphQLJSON,
  RootQuery: {

  }
};

export const GraphQLSchema = makeExecutableSchema({
  typeDefs: constructTypeDefs(schema),
  resolvers: constructResolvers(rootResolvers)
});
