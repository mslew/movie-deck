<template>
    <h1 class="poggers">Create an Account</h1>
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
    signInWithPopup,
    onAuthStateChanged} from "firebase/auth";
import { db } from "../main"
import { collection, addDoc, getDocs} from "firebase/firestore"
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const first = ref("");
const last = ref("");
const router = useRouter()
let auth
const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            try {
                const docRef = addDoc(collection(db, "users"), {
                    name: first.value + last.value,
                    id: user.uid
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
            console.error("Error adding document: ", e);
            }
    });
        console.log("Registered")
        router.push('/feed')
    })
    .catch((error) => {
        console.log(error.code);
    })
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        const auth = getAuth()
        const user = auth.currentUser
        try {
            const docRef = addDoc(collection(db, "users"), {
                name: user.displayName,
                id: user.uid
            }, {merge: true});
            console.log("Document written with ID: ", docRef.id);
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