import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "dd8R38OChnXXqD6haJbkSl75maTpZQEop5HzMhNh",
  databaseURL: "https://apx-dwf6-default-rtdb.firebaseio.com",
  authDomain: "apx-dwf6.firebaseapp.com",
});

const rtdb = firebase.database();

export { rtdb };
