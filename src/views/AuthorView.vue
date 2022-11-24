<template>
    <h1>Poggers</h1>
    <h1 class="display-5">Movie Title</h1>
    <input type="text" placeholder="title" v-model="title"/>
    <h1 class="display-5">Subtitle</h1>
    <input type="text" placeholder="subtitle" v-model="subtitle"/>
    <h1 class="display-5">Review</h1>
    <input type="text" placeholder="review" v-model="content"/>
    <button @click="sendReview">Submit Review!</button>
</template>

<script setup>
/* eslint-disable no-unused-vars */
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { db } from "../main"
    import { collection, addDoc } from "firebase/firestore"
    import { ref } from "vue";
    const title = ref("");
    const subtitle = ref("");
    const content = ref("");
    let auth;
    let globalUser
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        globalUser = user
        console.log(user.uid)
    });

    const sendReview = () =>{
        try {
            const docRef = addDoc(collection(db, "reviews"), {
                title: title.value,
                subtitle: subtitle.value,
                content: content.value,
                userID: globalUser.uid
            });
            title.value = ""
            subtitle.value = ""
            content.value = ""
            console.log("Document written with ID: ", docRef.id);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
/* eslint-enable no-unused-vars */
</script>