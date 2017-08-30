import { schema } from 'normalizr';

export const user = new schema.Entity('user', {}, { idAttribute: 'key' });
export const userList = new schema.Array(user);

export const favorite = new schema.Entity(
  'favorite',
  {
    user,
    store,
  },
  { idAttribute: 'key' }
);
export const favoriteList = new schema.Array(favorite);

export const store = new schema.Entity('store', {}, { idAttribute: 'key' });
export const storeList = new schema.Array(store);
