import { CART, UPDATE } from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case CART:
            var { cartItem } = action;
            // console.log("reducer", categoryList)
            return cartItem;
        case UPDATE:
            var { cartItem } = action;
            // console.log("reducer", categoryList)
            return cartItem;
        default:
            return state;
    }
}