// @flow
import { ADD_SUGGESTION } from './type';

import { type Suggestion } from 'redux/sagas/suggestion';

const addSuggestion = (suggestion: Suggestion) => ({
  type: ADD_SUGGESTION,
  ...suggestion,
});

export { addSuggestion };
