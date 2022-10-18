<template>
        <div class="container max-w-screen-md mt-5">
    <div class="text-center shadow-s py-6">
        <h2 class="font-bold text-xxl font-headings">Sökresultat</h2>
        <Searchbox v-for="product in products" :product="product" :key="product.id" />
        <div class="font-content mt-5 mb-10 text-xl flex justify-center bg-main-color py-2 rounded-lg shadow-md border-solid border-2 border-light-pink cursor-pointer hover:bg-light-color" v-for="item in result">
            <p>{{item.name}} </p>
            <Router-link class="text-dark-color" :to="{name: 'singleproduct', params: { id: item.id } }"><i
                    class="fa-solid fa-arrow-right"></i></Router-link>
        </div>
    </div>
    </div>
</template>

<script>
import Searchbox from '../components/Searchbox.vue';

export default {
    props:
        ['name'],

    components: {
        Searchbox
    },
    data() {
        return {
            result: [],
            products: ""
        }
    },
    //Hämtar specifik product utifrån dess id och anropar getCategories
    async mounted() {
        const resp = await fetch("http://localhost:8000/api/products/search/" + this.name);
        const data = await resp.json();
        this.result = data;
        console.log(this.result)
    }
}
</script>