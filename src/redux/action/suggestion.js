// @flow
import { ADD_SUGGESTION, REMOVE_SUGGESTION } from './type';

import { type Suggestion } from 'redux/sagas/suggestion';

const addSuggestion = (suggestion: Suggestion) => ({
  type: ADD_SUGGESTION,
  ...suggestion,
});

const removeSuggestion = (id: string) => ({
  type: REMOVE_SUGGESTION,
  id,
});

export { addSuggestion, removeSuggestion };
