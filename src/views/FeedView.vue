<template>
    <h1 class="font-bold">Feed</h1>
    <ReviewCard
        v-for="review in reviews"
        :key="review.id"
        :title="review.title"
        :subtitle="review.subtitle"
        :content="review.content"
    />
</template>

<script>
import ReviewCard from '../components/ReviewCard.vue'
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../main"
import { getAuth } from "firebase/auth"
export default{
    components:{
        ReviewCard 
    },
    data(){
        console.log(this.grabData())
        return{
            reviews: this.grabData()
        }
    },
    methods: {
        async grabData(){
            const userID = getAuth().currentUser.uid
            const q = query(collection(db, "reviews"), where("userID", "==", userID));
            const querySnapshot = await getDocs(q);
                let reviews = []
                querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                const review = {
                    id: doc.id,
                    title: doc.data().title,
                    subtitle: doc.data().subtitle,
                    content: doc.data().content

                }
                reviews.push(review)
                return reviews
            })
            return querySnapshot
        }
    }
}
</script>