import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app"

const firebaseConfig = {

    apiKey: "AIzaSyCHyiJ8ckaebOPYQbsSf6g8APgvpi9yCYE",
  
    authDomain: "movie-deck-1847e.firebaseapp.com",
  
    projectId: "movie-deck-1847e",
  
    storageBucket: "movie-deck-1847e.appspot.com",
  
    messagingSenderId: "1067001396893",
  
    appId: "1:1067001396893:web:e05b637153b3564d5d5e74",
  
    measurementId: "G-NZZEMEY856"
  
};

initializeApp(firebaseConfig)

createApp(App).use(router).mount('#app')
