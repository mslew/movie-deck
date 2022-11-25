<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="first name" v-model="first"/></p>
    <p><input type="text" placeholder="last name" v-model="last"/></p>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" palceholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from "vue";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup } from "firebase/auth";
import { db } from "../main"
import { setDoc, doc } from "firebase/firestore"
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const first = ref("");
const last = ref("");
const router = useRouter()
const register = () => {
    if(email.value == '' || password.value == '' || first.value == '' || last.value == ''){
        alert("Make sure all fields are filled!")
    }
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (result) => {
        const auth = getAuth()
        const user = auth.currentUser
        try {
            await setDoc(doc(db, "users", user.uid), { 
                name: first.value + " " + last.value});
            console.log("Document written with ID: ", user.uid);
        }catch(e){
            console.error("Error adding document: ", e);
        }
        console.log(result.user);
        router.push("/feed");
    })
    .catch((error) => {
        console.log(error)
    }) 
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then(async (result) => {
        const auth = getAuth()
        const user = auth.currentUser
        try {
            await setDoc(doc(db, "users", user.uid), { 
                name: user.displayName});
            console.log("Document written with ID: ", user.uid);
        }catch(e){
            console.error("Error adding document: ", e);
        }
        console.log(result.user);
        router.push("/feed");
    })
    .catch((error) => {
        console.log(error)
    }) 
};

/* eslint-enable no-unused-vars */ 
</script>

<style>
    
</style>