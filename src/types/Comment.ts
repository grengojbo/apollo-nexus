import { objectType, extendType } from '@nexus/schema';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.model.id();
    t.model.contain();
    t.model.post();
    t.model.postId();
    t.model.author();
    t.model.authorId();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

export const commentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.comment();
    t.crud.comments({ filtering: true, ordering: true });
  },
});

export const commentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneComment();
    t.crud.updateOneComment();
    t.crud.upsertOneComment();
    t.crud.deleteOneComment();

    t.crud.updateManyComment();
    t.crud.deleteManyComment();
  },
});
