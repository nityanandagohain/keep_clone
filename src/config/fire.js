import firebase from 'firebase';
import configData from  './config'
// Initialize Firebase
const config = {
    apiKey: configData.apiKey,
    authDomain: configData.authDomain,
    databaseURL: configData.databaseURL,
    projectId: configData.projectId,
    storageBucket: configData.storageBucket,
    messagingSenderId: configData.messagingSenderId
};
const fire = firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default fire;