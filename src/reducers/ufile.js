/**
 * Created by wushuyi on 2017/3/13.
 */
import * as UFileTypes from '../constants/UfileTypes'

const initialState = {
    files: {},
    nowPath: "/",
};

export function ufile(state = initialState, action) {
    switch (action.type) {
        case UFileTypes.ADDFILE:
            state.files._items.push(action.data)
            return Object.assign({}, state, {
                files: {
                    _items: state.files._items
                }
            });
        case UFileTypes.SWITCHDIR:
            return Object.assign({}, state,
                {
                    files: action.files,
                    nowPath: action.nowPath
                });
        default:
            return state;
    }
}