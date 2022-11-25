<template>
    <div class="card mb-3" style="width: 18rem;">
        <div class="card-body">
            <h3 class="card-title">{{ title }}</h3>
            <h6 class="card-subtitle mb-2 mt-2 text-muted">{{ subtitle }}</h6>
            <p class="card-text">{{ content }}</p>
        </div>
        <button class="mx-auto dlt-btn" @click="$emit('removeFromDatabase'), $emit('deleteCard')">Delete Review</button>
    </div>
</template>

<script>
export default{
    props: [
        'id',
        'title',
        'subtitle',
        'content'
    ]
}
</script>

<style lang="scss" scoped>
@import "../scss/custom";
    .card{
        background-color: $gray-500;
    }

    .dlt-btn{
        margin-bottom: 1rem;
        display: inline-block;
        padding: .75rem 1.25rem;
        border-radius: 10rem;
        color: #fff;
        text-transform: uppercase;
        font-size: .75rem;
        letter-spacing: .15rem;
        transition: all .3s;
        position: relative;
        overflow: hidden;
        z-index: 1;
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: $main-color;
            border-radius: 10rem;
            z-index: -2;
        }
        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0%;
            height: 100%;
            background-color: darken($accent-color, 15%);
            transition: all .3s;
            border-radius: 10rem;
            z-index: -1;
        }
        &:hover {
            color: #fff;
            &:before {
            width: 100%;
            }
    }
}
</style>