<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h3 class="card-title">{{ title }}</h3>
            <h6 class="card-subtitle mb-2 text-muted">{{ subtitle }}</h6>
            <p class="card-text">{{ content }}</p>
        </div>
        <button @click="$emit('removeFromDatabase'), $emit('deleteCard')">Delete</button>
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
