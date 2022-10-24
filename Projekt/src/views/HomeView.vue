<template>
<!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->
    <div class="container max-w-screen-md mt-5 mb-5">
        <div class="bg-white shadow-sm p-4">
                <h2 class="font-headings text-xxl text-center md:text-left mb-7 font-bold">Matbolagets
                    administration
                </h2>

            <div class="flex justify-between flex-col md:flex-row">
                <!--Antal varor-->
                <div class="">
                    <div
                        class="border-solid border-2 border-light-pink p-2 bg-medium-color text-white mb-3 mt-2 rounded-2xl text-center">
                        <h3>Lagrade produkter</h3>
                        <p class="font-bold text-xxl">{{result}}st</p>
                    </div>
                    <div
                        class="border-solid border-2 border-light-pink p-2 bg-main-color text-dark-color mt-2 mb-3 rounded-2xl text-center">
                        <h3>Lagrade kategorier</h3>
                        <p class="font-bold text-xxl">{{catResult}}st</p>
                    </div>

                    <div class="border-solid border-2 border-light-pink p-5 mt-4">
                        <h2 class="font-headings text-xl text-center md:text-left font-bold">5 senaste produkterna
                        </h2>
                        <LatestProducts v-for="product in products.slice(0, 5)" :product="product" :key="product.id" />
                    </div>
                </div>


                <div>
                    <Userinfo />
                </div>

            </div>
        </div>

    </div>
</template>

<script>
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
            created_at: ""
        }
    },
    components: {
        Userinfo,
        LatestProducts
    },
    methods: {
        currentDate() {
            const current = new Date();
            const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
            return date;
        },
        //Hämtar alla kategorier
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


            this.products.sort(function (a, b) {
                return b.id - a.id;
            });


            //Räknar hur många produkter som är lagrade
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
        },
    },
    mounted() {
        this.getProducts();
        this.getCategories();
    }
}
</script>

<style scoped>

</style>