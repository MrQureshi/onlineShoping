import { PRODUCTS } from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case CATEGORY:
            const { PRODUCTS } = action;
            // console.log("reducer", categoryList)
            return categoryList;
        default:
            return state;
    }
}