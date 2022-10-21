<template>
        <form class="border-solid border-2 border-light-pink shadow-sm rounded-lg mt-4 w-64 mb-3">
            <label class="text-sm mr-1 font-headings bg-main-color p-1 rounded-lg" for="search">Sök</label>
            <input type="text" name="search" id="search" placeholder="Sök efter produkt" v-model="name" class="">
            <i class="fa-xl fa-solid fa-magnifying-glass hover:text-medium-color"></i>
            <ul class="bg-white p-3 absolute top-26 w-64 shadow-md" v-if="name.length > 0 && name != ''">
                <li class="mt-4 mb-3" v-for="results in result.slice(0,10)" :key="results.id">
                    <Router-link
                        class="text-dark-color border-solid border-b-2 border-medium-color hover:text-medium-color"
                        :to="{name: 'singleproduct', params: { id: results.id }}">
                        {{results.name}}
                    </Router-link>
                </li>
            </ul>
        </form>
</template>

<script>
export default {
    props: {
        props: ['name']
    },
    data() {
        return {
            name: "",
            currentUrl: "",
            token: "",
            result: []
        }
    },
    watch: {
        name(after, before) {
            this.searchResult();
        }
    },
    methods: {
        //Hämtar specifik product utifrån dess id och anropar getCategories
        async searchResult() {
            this.token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:8000/api/products/search/" + this.name, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });
            const data = await resp.json();
            this.result = data;

        },
        //Hämtar specifik product utifrån dess id och anropar getCategories
        async getProductById() {
            this.token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:8000/api/getproductbyid/" + this.id, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });
            const data = await resp.json();
            this.product = data;
        }
    }
}
</script>

<style scoped>
@media only screen and (min-width: 920px) {

}
</style>