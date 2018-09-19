import { CATEGORY } from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case CATEGORY:
            const { categoryList } = action;
            // console.log("reducer", categoryList)
            return categoryList;
        default:
            return state;
    }
}