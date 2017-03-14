/**
 * Created by wushuyi on 2017/3/13.
 */

import {ADD, SUBTRACT} from '../constants/ActionTypes'

const initialState = {
    num: 1
};

export function data(state = initialState, action) {
    switch (action.type) {
        case ADD:
            return {
                num: state.num + action.num
            };
        case SUBTRACT:
            return {
                num: state.num - action.num
            };
        default:
            return state
    }
}