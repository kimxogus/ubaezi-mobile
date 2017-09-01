import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import appReducer from 'redux/reducer';
import sagas from 'redux/sagas';

const sagaMiddleware = createSagaMiddleware();

export default createStore(appReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);
