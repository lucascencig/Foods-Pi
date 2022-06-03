import { createStore, applyMiddleware, compose } from 'redux';
import { reducerroot } from './reducer';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducerroot, composeEnhancer(applyMiddleware(thunk)));

export default store;
