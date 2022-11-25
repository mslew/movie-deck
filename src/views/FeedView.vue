<template>
    <h1 class="font-bold mb-5">|</h1>
    <h1 class="font-bold mb-3 header">Review Feed</h1>
    <div class="container float-start">
        <div class="row">
            <ReviewCard class="card"
            v-for="(review, index) in reviews"
            :key="review.id"
            :title="review.title"
            :subtitle="review.subtitle"
            :content="review.content"
            v-on:removeFromDatabase="removeFromDatabase(index)"
            v-on:deleteCard="deleteCard(index)"
            />
        </div>
    </div>
</template>

<script>
import ReviewCard from '../components/ReviewCard.vue'
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore"
import { db } from "../main"
import { getAuth } from "firebase/auth"
export default{
    emits: ["deleteCard", "removeFromDatabase"],
    created(){
        this.grabData()
    },  
    components:{
        ReviewCard 
    },
    data(){
        return{
            reviews: [],
        }
    },
    methods: {
        async grabData(){
            const userID = getAuth().currentUser.uid
            const q = query(collection(db, "reviews"), where("userID", "==", userID))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                this.reviews.push({id: doc.id, title: doc.data().title, subtitle: doc.data().subtitle, content: doc.data().content})
            })
        },
        removeFromDatabase: async function(index){
            await deleteDoc(doc(db,"reviews", this.reviews[index].id))
        },
        deleteCard: function(index){
            this.reviews.splice(index, 1)
        }
    }
}
</script>

<style lang="scss">
@import "../scss/custom";
  body{
    background-color: $gray-600;
  }
  .header{
    margin-left: 1rem;
  }
  .card{
    margin-left: 1rem;
  }
</style>