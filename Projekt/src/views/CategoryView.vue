<template>
    <h1 class="font-headings text-xxl font-bold text-center mt-8">Kategorier</h1>

    <!--Container där kategorierna skrivs ut-->
    <div class="container max-w-screen-md">
        <div>
            <Category v-for="category in categories" :category="category" :key="category.id" />
        </div>
    </div>
</template>

<script>
import Category from '../components/Category.vue';

export default {
    data() {
        return {
            categories: []
        }
    },
    components: {
        Category
    },
    methods: {
        //Hämtar alla kategorier
        async getCategories() {
            const resp = await fetch("http://localhost:8000/api/getcategories");
            const data = await resp.json();
            this.categories = data;
            console.log(this.categories);
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>

<style>

</style>