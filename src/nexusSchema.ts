import { makeSchema } from '@nexus/schema';
import * as types from './types';
import { paljs } from '@paljs/nexus';
import * as path from 'path';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';

export const schema = makeSchema({
  types,
  plugins: [
    paljs(),
    nexusSchemaPrisma({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    // typegen: __dirname + '/generated/nexus.ts',
    typegen: path.join(
      __dirname,
      '../node_modules/@types/nexus-typegen/index.d.ts'
    ),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
});
