import { NavigationActions } from 'react-navigation';

export const navigateModify = ({ path, id, field, dispatch }) => {
  const action = NavigationActions.navigate({
    routeName: 'Store',
    action: NavigationActions.navigate({
      routeName: 'ModifySuggestion',
      params: { path, id, field },
    }),
  });
  dispatch(action);
};

export const navigateCreate = ({ path, dispatch }) => {
  const action = NavigationActions.navigate({
    routeName: 'Store',
    action: NavigationActions.navigate({
      routeName: 'CreateSuggestion',
      params: { path },
    }),
  });
  dispatch(action);
};

export const navigateDelete = ({ path, id, dispatch }) => {
  const action = NavigationActions.navigate({
    routeName: 'Store',
    action: NavigationActions.navigate({
      routeName: 'DeleteSuggestion',
      params: { path, id },
    }),
  });
  dispatch(action);
};
