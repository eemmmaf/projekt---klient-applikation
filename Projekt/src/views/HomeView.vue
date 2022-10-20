<template>
    <div class="container max-w-screen-md mt-5">
        <div class="bg-white shadow-sm p-4">
            <div class="flex justify-between">
                <div>
                    <h2 class="font-headings text-xxl text-center md:text-left mb-5 font-bold">Matbolagets
                        administration
                    </h2>
                </div>
                <div class="self-baseline">
                    <!--Dagens datum-->
                    <p class="text-dark-color font-content text-base">{{currentDate()}}</p>
                </div>
            </div>

            <!--Antal varor-->
            <div class="border-solid border-2 border-light-pink p-2 rounded-2xl w-1/4 text-center">
                <h3>Lagrade produkter</h3>
                <p class="font-bold text-xxl">{{result}}</p>
                <h3>Produkter som snart är slut</h3>
                <p class="font-bold text-xxl">{{quantityFive}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Boxes from '../components/Boxes.vue';

export default {
    data() {
        return {
            result: "",
            products: [],
            lessThanFive: [],
            quantity: "",
            quantityFive: []
        }
    },
    components: {
        Boxes
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
            //Räknar hur många produkter som är lagrade
            this.result = this.products.length;
        },
    },
    mounted() {
        this.getProducts();
    }
}
</script>

<style scoped>

</style>