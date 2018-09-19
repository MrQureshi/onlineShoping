import { combineReducers } from 'redux'

import user from './reducer_user';
import categoryList from './reducer_Category'

export default combineReducers({
    user,
    categoryList
})