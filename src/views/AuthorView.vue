<template>
    <h1 class="font-bold mb-5">|</h1>
    <div class="container">
        <div class="row d-flex justify-content-center text-center">
            <div class="col">
                <div class="card">
                    <div class="card-body mx-auto mt-2">
                        <form>
                            <h1 class="display-5">Write a Review</h1>
                            <div class="form-group">
                                <label class="mt-3" for="exampleFormControlInput1">Movie Title</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="title" maxlength="25" v-model="title">
                            </div>
                            <div class="form-group">
                                <label class="mt-3" for="exampleFormControlInput1">Review Subtitle</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="subtitle" maxlength="25" v-model="subtitle">
                            </div>
                            <div class="form-group">
                                <label class="mt-3" for="exampleFormControlTextarea1">Review Content</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="content" maxlength="50" v-model="content"></textarea>
                            </div>
                        </form>
                        <p><button class="btn-standard mt-4" @click="sendReview">Submit Review!</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
    import { getAuth } from "firebase/auth";
    import { db } from "../main"
    import { collection, addDoc } from "firebase/firestore"
    import { ref } from "vue";
    import { useRouter } from 'vue-router'
    const title = ref("");
    const subtitle = ref("");
    const content = ref("");
    const router = useRouter()
    const auth = getAuth()
    const user = auth.currentUser
    const sendReview = () =>{
        if(title.value == '' || subtitle.value == '' || content.value == ''){
            alert("Make sure all fields are filled!")
        }else{
            try {
                const docRef = addDoc(collection(db, "reviews"), {
                    title: title.value,
                    subtitle: subtitle.value,
                    content: content.value,
                    userID: user.uid
                });
                title.value = ""
                subtitle.value = ""
                content.value = ""
                router.push("/feed");
                console.log("Document written with ID: ", docRef.id);
            }catch(e){
                console.error("Error adding document: ", e);
            }
        }
    }
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