import { SIGNED_IN } from '../constants';

let user = {
    Email: null , 
    Username: null, 
    userType: null, 
    profilePic: null, 
    key : null
}

export default (state = user, action) => {
    switch (action.type) {
        case SIGNED_IN:
            const {Email , Username, userType, profilePic, key    } = action;
            user = {
                Email , Username, userType, profilePic, key 
            }
            return user;
        default:
            return state;
    }
}