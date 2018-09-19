import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom'

import history from './history'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { logUser } from './action'
// import { firebaseApp } from './firebase'

import App from './components/App';
import Signin from './components/Signin';
import Signup from './components/Signup';
import User from './components/user';
// import Order from './components/Order'
import firebase from 'firebase';

const store = createStore(reducer);

firebase.auth().onAuthStateChanged(() => {
    if (firebase.auth().currentUser) {
        var userRef = firebase.database().ref().child("user/" + firebase.auth().currentUser.uid);
        userRef.on('value', snap =>{
            // console.log("user has signed in or up");
           let key = firebase.auth().currentUser.uid
        
            let objCurrentuser = snap.val();
            // console.log("objCurrentuser", objCurrentuser)
            const {Email , Username, userType, profilePic} = objCurrentuser;
            store.dispatch(logUser(Email , Username, userType, profilePic, key ))
            // console.log("email", Email)
            // store.dispatch(logUser(email));
                if(Email === "admin@gmail.com"){
                    history.push('/')
                }else{
                    history.push('/user')
                }
        })
    } else {
        // console.log("user has signed out or still needs to sign in.")
        history.push('/signin');
    }
})
ReactDOM.render(
    <Provider store={store} >
        <Router history={history}>
            <Fragment>
                <Route exact={true}  path="/" component={App} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <Route path="/user" component={User} />
            </Fragment>
        </Router>
    </Provider>,
    document.getElementById('root')
)
