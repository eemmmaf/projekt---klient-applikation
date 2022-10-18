<template>
    <h1 class="font-headings text-xxl font-bold text-center mt-8">Alla produkter</h1>
    <div class="container max-w-screen-lg">
        <div v-if="deleted">
            <p class="font-content text-center mt-5 text-base">{{deleted}}</p>
        </div>

        <!--Sortera efter namn-->
        <button @click='toggle = !toggle' class="p-2 border-solid border-2 border-light-pink">Sortera <i class="fa-solid fa-chevron-down"></i></button>
        <div class="flex gap-x-2 mt-3">
            <button v-show='toggle' @click="sortByName(products)" class="p-2 border-solid border-2 border-light-pink">Namn A-Ö</button>

            <!--ID-->
            <button v-show='toggle' @click="sortById(products)" class="p-2 border-solid border-2 border-light-pink">ID</button>

            <!--Pris-->
            <button v-show='toggle' @click="sortByPrice(products)" class="p-2 border-solid border-2 border-light-pink">Pris(stigande)</button>

            <!--antal-->
            <button v-show='toggle' @click="sortByQuantity(products)" class="p-2 border-solid border-2 border-light-pink">Antal</button>

        </div>

        <!--Tabell där kategorierna skrivs ut-->
        <table class="table-auto border-collapse border-solid border-2 border-light-pink mt-5 w-full text-center">
            <thead class="bg-main-color font-headings">
                <tr>
                    <th>ID</th>
                    <th>Namn</th>
                    <th>Antal</th>
                    <th>Pris</th>
                    <th>Kategori</th>
                    <th>Uppdatera</th>
                    <th>Ta bort</th>
                </tr>
            </thead>
            <tbody>
                <Product @getId="getId(product.id)" @delete="deleteProduct(product.id)" v-for="product in products"
                    :product="product" :key="product.id" />
            </tbody>
        </table>
    </div>
</template>

<script>
import Product from '../components/Product.vue';

export default {

    data() {
        return {
            products: [],
            quantity: "",
            deleted: "",
            toggle: false
        }
    },
    components: {
        Product
    },
    methods: {
        //Hämtar alla kategorier
        async getProducts() {
            const resp = await fetch("http://localhost:8000/api/getproducts");
            const data = await resp.json();
            this.products = data;
            console.log(this.products);
        },
        //Hämtar klickad produkt
        async getId(id) {
            const resp = await fetch("http://localhost:8000/api/getproductbyid/" + id);
            const data = await resp.json();
            console.log(data);
        },
        //Metod för att ta bort produkt
        async deleteProduct(id) {
            const resp = await fetch("http://localhost:8000/api/deleteproduct/" + id, {
                //Använder metoden DELETE
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            });
            const data = await resp.json();
            //Sparar meddelande från apiet. Meddelandet om att podcasten har tagits bort
            this.deleted = data[0];
            //Hämtar podcasterna på nytt
            this.getProducts();
        },

        //Funktion för att sortera produktnamn A-Ö
        sortByName() {
            this.products.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
        },

        //Funktion för att sortera efter pris
        sortByPrice() {
            this.products.sort(function (a, b) {
                return a.price - b.price;
            });
        },

        //Funktion för att sortera utifrån ID
        sortById() {
            this.products.sort(function (a, b) {
                return a.id - b.id;
            });
        },
        //Funktion för att sortera utifrån antal produkter
        sortByQuantity() {
            this.products.sort(function (a, b) {
                return a.quantity - b.quantity;
            });
        },
        //Funktion för att sortera utifrån kategori
        sortByCat() {
            this.products.sort(function (a, b) {
                return a.category_id - b.category_id;
            });
        },
    },

    mounted() {
        //Hämtar alla produkter
        this.getProducts();
        //Skriver ut efter ID "by default"
        this.products.sort(function (a, b) {
            return a.id.localeCompare(b.id);
        });
    }
}

</script>

<style scoped>
th {
    padding: 1em;
}
</style>