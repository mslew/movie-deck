<template>
    <h1 class="poggers">Sign In To An Account</h1>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" palceholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errrMsg }}</p>
    <p><button @click="signIn">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const errMsg = ref(); //ERROR MESSAGE
const router = useRouter()
const signIn = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("Registered")
        router.push('/feed')
    })
    .catch((error) => {
        console.log(error.code);
        switch(error.code){
            case "auth/invalid-email":
                errMsg.value = "Invalid Email";
                break;
            case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
            case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break;
            default:
                errMsg.value = "Email or password was inorrect";
                break;
        }
    })
};
/* eslint-enable no-unused-vars */ 
</script>