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

export default{
    components:{
        ReviewCard 
    },
    data(){
        return{
            reviews: [
                {id: 1, title: "There Will Be Blood", subtitle:"This is the best bro", content: "I love daniel day lewis"},
                {id: 1, title: "La La Land", subtitle:"Best love story", content: "California is a cool place to live :)"},
                {id: 1, title: "Whiplash", subtitle:"Best ending", content: "J.K. Simmons can be a pretty mean dude"}
            ]
        }
    }
}
</script>