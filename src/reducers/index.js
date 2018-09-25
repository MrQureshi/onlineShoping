import { combineReducers } from 'redux'

import user from './reducer_user';
import categoryList from './reducer_Category'
import cartItem from './reducer_Cart'

export default combineReducers({
    user,
    categoryList,
    cartItem
})