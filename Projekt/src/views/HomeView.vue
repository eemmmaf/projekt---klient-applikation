<template>
 <!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
-->

    <!--View för startsidan-->

    <div class="container max-w-screen-md mt-5 mb-5">
        <div class="bg-white shadow-sm p-6">
            <h2 class="font-headings text-xxl text-center md:text-left mb-7 font-bold text-dark-color">Matbolagets
                administration
            </h2>

            <div class="flex justify-between flex-col md:flex-row">
                <!--Antal varor-->
                <div class="">
                    <div
                        class="border-solid border-2 border-light-pink p-2 bg-medium-color text-white mb-3 mt-2 rounded-2xl text-center">
                        <h3 class="font-headings">Lagrade produkter</h3>
                        <p class="font-bold text-xxl">{{result}}st</p>
                    </div>

                    <!--Antal kategorier-->
                    <div
                        class="border-solid border-2 border-light-pink p-2 bg-main-color text-dark-color mt-2 mb-3 rounded-2xl text-center">
                        <h3 class="font-headings">Lagrade kategorier</h3>
                        <p class="font-bold text-xxl">{{catResult}}st</p>
                    </div>

                    <!--Skriver ut de 5 senast tillagda produkterna-->
                    <div class="border-solid border-2 border-light-pink p-5 mt-7">
                        <h2 class="font-headings text-xl text-center md:text-left font-bold text-dark-color">5 senaste produkterna
                        </h2>
                        <!--Använder komponenten LatestProducts-->
                        <LatestProducts v-for="product in products.slice(0, 5)" :product="product" :key="product.id" />
                        <p class="font-content text-center text-base shadow-sm p-2">{{emptyMsg}}</p>
                    </div>
                </div>


                <!--Använder komponenten Userinfo-->
                <div class="text-dark-color">
                    <Userinfo />
                </div>

            </div>
        </div>

    </div>
</template>

<script>

//Importerar komponenter 
import Userinfo from '../components/Userinfo.vue';
import LatestProducts from '../components/LatestProducts.vue';

export default {
    data() {
        return {
            result: "",
            products: [],
            categories: [],
            quantity: "",
            catResult: "",
            created_at: "",
            emptyMsg: ""
        }
    },
    components: {
        Userinfo,
        LatestProducts
    },
    methods: {
        //Hämtar alla produkter
        async getProducts() {
            this.token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:8000/api/getproducts", {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });

            const data = await resp.json();
            this.products = data;


            //Sorterar utifrån det nyaste id:et
            this.products.sort(function (a, b) {
                return b.id - a.id;
            });

            //Räknar hur många produkter som är lagrade och lagrar i result
            this.result = this.products.length;
        },
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
            this.catResult = this.categories.length;
        }
    },
    mounted() {
        this.getProducts();
        this.getCategories();
    }
}
</script>

<style scoped>

</style>