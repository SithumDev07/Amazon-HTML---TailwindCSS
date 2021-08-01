
  var firebaseConfig = {
    apiKey: "AIzaSyDwZblGxFmw5A578JLjtnhmlE3C8YpjejE",
    authDomain: "fir-2e949.firebaseapp.com",
    projectId: "fir-2e949",
    storageBucket: "fir-2e949.appspot.com",
    messagingSenderId: "259363328026",
    appId: "1:259363328026:web:e98fed0a8bf5a3d63ac1a3",
    measurementId: "G-3STQCVFZFR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();