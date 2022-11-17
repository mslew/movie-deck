<template>
    <h1 class="poggers">Create an Account</h1>
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
    signInWithPopup} from "firebase/auth";
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const router = useRouter()
const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
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
        console.log(result.user);
        router.push("/feed");
    })
    .catch((error) => {

    }) 
};

/* eslint-enable no-unused-vars */ 
</script>