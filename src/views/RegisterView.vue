<template>
    <h1 class="font-bold mb-5">|</h1>
    <div class="container">
        <div class="row d-flex justify-content-center text-center">
            <div class="col ">
                <div class="card">
                    <div class="card-body mx-auto mt-2">
                        <h1>Create an Account</h1>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">First Name </span>
                            </div>
                            <input type="text" class="form-control" placeholder="first" aria-label="Username" aria-describedby="basic-addon1" v-model="first">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Last Name </span>
                            </div>
                            <input type="text" class="form-control" placeholder="last" aria-label="Username" aria-describedby="basic-addon1" v-model="last">
                        </div>
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
                        <p><button class="btn-standard" @click="register">Submit</button></p>
                        <p><button class="btn-standard" @click="signInWithGoogle">Sign In With Google</button></p>
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