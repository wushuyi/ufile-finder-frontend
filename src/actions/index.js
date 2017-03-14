/**
 * Created by wushuyi on 2017/3/13.
 */

import * as types from '../constants/ActionTypes'

export function add(num) {
    return {type: types.ADD, num}
}

export function subtract(num) {
    return {type: types.SUBTRACT, num}
}

