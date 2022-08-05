import {configureStore} from '@reduxjs/toolkit';
export const ACTION_TYPES = {
    setList: "SET_LIST",
    addPhone: "ADD_PHONE"
}
function phoneListReducer(state = { list: [] }, action) {
    switch (action.type) {
        case ACTION_TYPES.addPhone:
            return { list: [action.payload, ...state.list] }
        case ACTION_TYPES.setList:
            return { list: [...action.payload] }
        default:
            return state
    }
}
let store = configureStore({reducer: phoneListReducer})
export default store;

export const selectList = (state) => state.list
