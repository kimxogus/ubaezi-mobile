import { NavigationActions } from 'react-navigation';

export const navigateModify = ({ path, targetId, field, dispatch }) => {
  const action = NavigationActions.navigate({
    routeName: 'Store',
    action: NavigationActions.navigate({
      routeName: 'ModifySuggestion',
      params: { path, targetId, field },
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

export const navigateDelete = ({ path, targtetId, dispatch }) => {
  const action = NavigationActions.navigate({
    routeName: 'Store',
    action: NavigationActions.navigate({
      routeName: 'DeleteSuggestion',
      params: { path, targtetId },
    }),
  });
  dispatch(action);
};
