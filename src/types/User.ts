import { objectType, extendType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.email();
    t.model.name();
    t.model.password();
    t.model.language();
    t.model.enabled();
    t.model.posts();
    t.model.group();
    t.model.groupId();
    t.model.comments();
  },
});

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.users({ filtering: true, ordering: true });
  },
});

export const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.crud.upsertOneUser();
    t.crud.deleteOneUser();

    t.crud.updateManyUser();
    t.crud.deleteManyUser();
  },
});
