<template>
    <form @submit.prevent="searchResult()">
        <label for="search">Sök</label>
        <input type="text" name="search" id="search" v-model="name" class="border-solid border-2 border-light-pink">
        <button type="submit">
            <i class="fa-2xl fa-solid fa-magnifying-glass hover:text-medium-color"></i>
        </button>
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
            token: ""
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


            this.$router.push({ name: 'search', params: { name: this.name } });
        }
    }
}


</script>