import AuthAction from "../constants";
import firebase from "firebase"
import { Observable } from "rxjs";

export default class Middleware {

    ////////////////////////////////////
    //////*     Authentication   *//////
    ////////////////////////////////////

    static signup(action$) {
        return action$.ofType(AuthAction.SIGNUP)
            .switchMap((payload) => {
                let { Name, Email, Password } = payload.payload
                return firebase.auth().createUserWithEmailAndPassword(Email, Password)
                    .then((user) => {
                        firebase.database().ref('User').child(user.uid).set({
                            Name, Email, Password, Uid: user.uid
                        }).then(() => {
                            return {
                                type: AuthAction.SIGNUP_SUCCESS,
                                isLoading: false, isLoggedIn: true, isError: false,
                                payload: {
                                    Name, Email, Password, Uid: user.uid
                                }
                            }
                        })
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.SIGNUP_FAILURE,
                            isLoading: false, isError: true, error: error.message
                        }
                    });
            })
    }

    static signin(action$) {
        return action$.ofType(AuthAction.SIGNIN)
            .mergeMap((payload) => {
                let email = payload.payload.Email
                let password = payload.payload.Password
                return firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        return firebase.database().ref('User/' + user.uid).once("value")
                            .then((data) => {
                                if (data.val()) {
                                    return {
                                        type: AuthAction.SIGNIN_SUCCESS,
                                        isLoading: false, isLoggedIn: true, isError: false,
                                        payload: {
                                            Experience: data.val().Experience, Education: data.val().Education,
                                            Catogary: data.val().Catogary, Password: data.val().Password,
                                            Skills: data.val().Skills, Email: data.val().Email,
                                            Name: data.val().Name, Uid: data.val().Uid
                                        }
                                    }
                                } else {
                                    user.delete().then(() => {
                                        alert("Your User Has Been Deleted By The Admin")
                                        return {
                                            type: AuthAction.SIGNIN_FAILURE,
                                            error: "Your User Has Been Deleted By The Admin",
                                            isLoading: false, isError: true,
                                        }
                                    }).catch(
                                        (error) => {
                                            alert(error.message)
                                            return {
                                                type: AuthAction.SIGNIN_FAILURE,
                                                isError: true, isLoading: false, error: error.message
                                            }
                                        }
                                        )
                                }
                            })
                            .catch((error) => {
                                alert(error.message)
                                return {
                                    type: AuthAction.SIGNIN_FAILURE,
                                    isError: true, isLoading: false, error: error.message
                                }
                            })
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.SIGNIN_FAILURE,
                            isError: true, isLoading: false, error: error.message
                        }
                    })
            })
    }

}
