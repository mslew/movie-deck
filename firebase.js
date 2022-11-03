import firebase from 'firebase'
import { ref, onUmounted } from 'vue' 

const config = {

    apiKey: "AIzaSyCHyiJ8ckaebOPYQbsSf6g8APgvpi9yCYE",
  
    authDomain: "movie-deck-1847e.firebaseapp.com",
  
    projectId: "movie-deck-1847e",
  
    storageBucket: "movie-deck-1847e.appspot.com",
  
    messagingSenderId: "1067001396893",
  
    appId: "1:1067001396893:web:e05b637153b3564d5d5e74",
  
    measurementId: "G-NZZEMEY856"
  
  };


const app = initializeApp(config); 
const db = firebaseApp.fireStore()
const usersCollection = db.collection('users'); 


export const createUser = user => {
}