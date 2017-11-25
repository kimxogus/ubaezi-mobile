import { schema } from 'normalizr';

export const user = new schema.Entity(
  'user',
  {
    favorites: {
      // stores: storeList,
      // menus: menuList,
      // menuGroup: menuGroupList,
    },
  },
  { idAttribute: 'id' }
);
export const userList = new schema.Array(user);

export const store = new schema.Entity(
  'store',
  {
    // menus: menuList,
    // favoriteUsers: userList,
  },
  { idAttribute: 'id' }
);
export const storeList = new schema.Array(store);

export const menu = new schema.Entity(
  'menu',
  {
    // storeId: store,
    // menuGroupId: menuGroup,
    // favoriteUsers: userList,
  },
  { idAttribute: 'id' }
);
export const menuList = new schema.Array(menu);

export const menuGroup = new schema.Entity(
  'menuGroup',
  {
    // storeId: store,
    // menus: menuList,
    // favoriteUsers: userList,
  },
  { idAttribute: 'id' }
);
export const menuGroupList = new schema.Array(menuGroup);

export const schemas = {
  user,
  userList,
  store,
  storeList,
  menu,
  menuList,
  menuGroup,
  menuGroupList,
};
