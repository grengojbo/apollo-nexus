import { objectType, extendType } from '@nexus/schema';

export const Group = objectType({
  name: 'Group',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.users();
  },
});

export const groupQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.group();
    t.crud.groups({ filtering: true, ordering: true });
  },
});

export const groupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneGroup();
    t.crud.updateOneGroup();
    t.crud.upsertOneGroup();
    t.crud.deleteOneGroup();

    t.crud.updateManyGroup();
    t.crud.deleteManyGroup();
  },
});
