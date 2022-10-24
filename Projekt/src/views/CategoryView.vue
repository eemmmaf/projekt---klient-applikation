<template>
<!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->
    <h1 class="font-headings text-xxl font-bold text-center mt-8">Alla kategorier</h1>

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
            categories: [],
            token: ""
        }
    },
    components: {
        Category
    },
    methods: {
        //Hämtar alla kategorier
        async getCategories() {
            this.token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:8000/api/getcategories", {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });
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