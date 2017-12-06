import { schema } from 'normalizr';

export const user = new schema.Entity('users', {}, { idAttribute: 'id' });

export const store = new schema.Entity('stores', {}, { idAttribute: 'id' });

export const menu = new schema.Entity('menus', {}, { idAttribute: 'id' });

export const menuGroup = new schema.Entity(
  'menuGroups',
  {
    // storeId: store,
    // menus: menuList,
    // favoriteUsers: userList,
  },
  { idAttribute: 'id' }
);

export const suggestion = new schema.Entity(
  'suggestions',
  {},
  { idAttribute: 'id' }
);

export const schemas = {
  user,
  store,
  menu,
  menuGroup,
  suggestion,
};
