import { ADD_FAVORITE, REMOVE_FAVORITE } from './type';

const addFavorite = ({ key, id }) => ({
  type: ADD_FAVORITE,
  key,
  id,
});

const removeFavorite = ({ key, id }) => ({
  type: REMOVE_FAVORITE,
  key,
  id,
});

export { addFavorite, removeFavorite };
