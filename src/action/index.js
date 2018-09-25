import { SIGNED_IN, CATEGORY, PRODUCTS, CART, UPDATE} from '../constants';

export function logUser(Email , Username, userType, profilePic, key  ){
    const action ={
        type: SIGNED_IN,
        Email , Username, userType, profilePic, key 
    }
    return action;
}

export function fnCategory(categoryList){
    // console.log("action", categoryList)
    const action ={
        type: CATEGORY,
        categoryList
    }
    return action;
}

export function fnProduct(productList){
    // console.log("action", categoryList)
    const action ={
        type: PRODUCTS,
        productList
    }
    return action;
}
export function fnCart(cartItem){
    // console.log("action", categoryList)
    const action ={
        type: CART,
        cartItem
    }
    return action;
}
export function fnUpdate(cartItem){
    // console.log("action", categoryList)
    const action ={
        type: UPDATE,
        cartItem
    }
    return action;
}
