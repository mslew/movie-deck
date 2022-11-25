<template>
    <h1 class="font-bold mb-5">|</h1>
    <div class="container">
        <div class="row d-flex justify-content-center text-center">
            <div class="col">
                <div class="card">
                    <div class="card-body mx-auto mt-2">
                        <h1>Sign In To An Account</h1>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Email </span>
                            </div>
                            <input type="text" class="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" v-model="email">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Password </span>
                            </div>
                            <input type="password" class="form-control" placeholder="password" aria-label="Username" aria-describedby="basic-addon1" v-model="password">
                        </div>
                        <p><button class="btn-standard" @click="signIn">Submit</button></p>
                        <p><button class="btn-standard" @click="signInWithGoogle">Sign In With Google</button></p>
                        <p v-if="errMsg">{{ errMsg }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from "vue";
import { 
    getAuth, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup} from "firebase/auth";
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const errMsg = ref(); 
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

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        console.log(result.user);
        router.push("/feed");
    })
    .catch((error) => {
        console.log(error)
    }) 
};
/* eslint-enable no-unused-vars */ 
</script>

<style lang="scss" scoped>
    @import "../scss/common/buttons";
    @import "../scss/custom";
    body{
        background-color: $gray-600;
    }
    .card{
        background-color: $gray-500;
    }
</style>