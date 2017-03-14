/**
 * Created by wushuyi on 2017/3/13.
 */
import {combineReducers} from 'redux'
import {data} from './data'
import {ufile} from './ufile'
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux'

export const rootReducer = combineReducers({
    data,
    ufile
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

