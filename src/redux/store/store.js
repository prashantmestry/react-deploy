import { createStore, combineReducers, applyMiddleware } from 'redux';
import financeReducer from '../finance/financeReducer';
import ratioReducer from '../ratio/ratioReducer';
import thunk from 'redux-thunk';
import { compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    finance: financeReducer,
    ratio: ratioReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk),
));

export default store;