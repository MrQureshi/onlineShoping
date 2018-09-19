import { SIGNED_IN, CATEGORY, PRODUCTS} from '../constants';

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
