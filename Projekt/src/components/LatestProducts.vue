<template>
<ul><li class="font-content text-base mt-2 text-center md:text-left"> <Router-link class="text-dark-color underline hover:text-medium-color" :to="{name: 'singleproduct', params: { id: product.id } }">{{product.name}}</Router-link></li></ul>

</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>

<style scoped>

</style>