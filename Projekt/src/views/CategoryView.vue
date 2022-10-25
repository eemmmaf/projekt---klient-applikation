<template>
    <!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->

    <!--View där kategorierna skrivs ut-->


    <h2 class="font-headings text-xxl font-bold text-center mt-8">Alla kategorier</h2>

    <!--Container där kategorierna skrivs ut-->
    <div class="container max-w-screen-md">
        <div>
            <Category v-for="category in categories" :category="category" :key="category.id" />
        </div>
        <p class="font-content text-center text-xl shadow-sm p-2">{{emptyMsg}}</p>
    </div>
</template>

<script>

//Importerar komponenten Category
import Category from '../components/Category.vue';

export default {
    data() {
        return {
            categories: [],
            token: "",
            emptyMsg: ""
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

            //Sorterar utifrån namn A-Ö
            this.categories.sort(function (a, b) {
                return a.categoryname.localeCompare(b.categoryname);
            });

            //Kollar om det finns några produkter sparade och skriver annars ut meddelande
            if (this.categories.length === 0) {
                this.emptyMsg = "Det finns inga lagrade kategorier."
            };
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>

<style>

</style>