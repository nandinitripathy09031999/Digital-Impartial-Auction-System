import {combineReducers,createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import InvoiceReducer from '../reducers/InvoiceReducer';
import DisableReducer from '../reducers/DisableReducer';
const middleWare = [logger];
const rootReducer = combineReducers({
    invoices:InvoiceReducer,
    disabled:DisableReducer
})

export const store = createStore(rootReducer,applyMiddleware(...middleWare))