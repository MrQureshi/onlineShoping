import * as firebase from 'firebase';

// const config = {
//     apiKey: "AIzaSyCjnOnGjin0ax0pvx_aWPwr3rXyrcwJK4k",
//     authDomain: "polling-application-9938a.firebaseapp.com",
//     databaseURL: "https://polling-application-9938a.firebaseio.com",
//     projectId: "polling-application-9938a",
//     storageBucket: "polling-application-9938a.appspot.com",
//     messagingSenderId: "1008180650619"
// };

var config = {
    apiKey: "AIzaSyA6VX8iqsVamQeVFWRJKX3sERML9HveP2o",
    authDomain: "onlineshoping-0.firebaseapp.com",
    databaseURL: "https://onlineshoping-0.firebaseio.com",
    projectId: "onlineshoping-0",
    storageBucket: "onlineshoping-0.appspot.com",
    messagingSenderId: "569537063217"
  };
// export default config
export const firebaseApp = firebase.initializeApp(config);

