<template>
    <!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->

    <!--View för utskrift av alla produkter-->
    <h2 class="font-headings text-xxl font-bold text-center mt-8">Alla produkter</h2>
    <div class="container max-w-screen-lg">

        <!--Skriver ut ett meddelande om en produkt tas bort-->
        <div v-if="deleted">
            <p class="font-content text-center mt-5 text-base">{{deleted}}</p>
        </div>
        
        <!--Knapp för att visa olika alternativ för sortering-->
        <button @click='toggle = !toggle' class="p-2 border-solid border-2 border-light-pink bg-white font-content mt-3 ml-1">Sortera <i
                class="fa-solid fa-chevron-down"></i></button>

        <!--Sortera efter namn-->
        <div class="flex gap-x-2 mt-3 font-content ml-1 flex-col md:flex-row">
            <button v-show='toggle' @click="sortByName(products)"
                class="p-2 border-solid border-2 border-light-pink shadow-md hover:bg-main-color bg-white">Namn
                A-Ö</button>

            <!--ID-->
            <button v-show='toggle' @click="sortById(products)"
                class="p-2 border-solid border-2 border-light-pink shadow-md hover:bg-main-color bg-white">ID</button>

            <!--Pris-->
            <button v-show='toggle' @click="sortByPrice(products)"
                class="p-2 border-solid border-2 border-light-pink shadow-md hover:bg-main-color bg-white">Pris</button>

            <!--Antal-->
            <button v-show='toggle' @click="sortByQuantity(products)"
                class="p-2 border-solid border-2 border-light-pink shadow-md hover:bg-main-color bg-white">Antal</button>

            <!--Kategori-->
            <button v-show='toggle' @click="sortByCategory(products)"
                class="p-2 border-solid border-2 border-light-pink shadow-md hover:bg-main-color bg-white">Kategori</button>

        </div>

        <!--Tabell där kategorierna skrivs ut-->
        <div class="responsive-table">
            <table
                class="table-auto border-collapse border-solid border-2 border-light-pink mt-5 w-full text-center bg-white shadow-sm mb-7">
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
                    <!--Använder komponenten Product-->
                    <Product @getId="getId(product.id)" @delete="deleteProduct(product.id)" v-for="product in products"
                        :product="product" :key="product.id" />
                </tbody>
            </table>
        </div>

        <p class="font-content text-center text-xl shadow-sm p-2">{{emptyMsg}}</p>
    </div>
</template>

<script>

//Importerar komponenten Product
import Product from '../components/Product.vue';

export default {
    data() {
        return {
            products: [],
            quantity: "",
            deleted: "",
            toggle: false,
            token: "",
            emptyMsg: ""
        }
    },
    components: {
        Product
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


            //Kollar om det finns några produkter sparade och skriver annars ut meddelande
            if (this.products.length === 0) {
                this.emptyMsg = "Det finns inga lagrade produkter."
            };
        },


        //Hämtar klickad produkt
        async getId(id) {
            this.token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:8000/api/getproductbyid/" + id, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });
            const data = await resp.json();
        },



        //Metod för att ta bort produkt
        async deleteProduct(id) {
            this.token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:8000/api/deleteproduct/" + id, {
                //Använder metoden DELETE
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
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

        //Funktion för att sortera kategori
        sortByCategory() {
            this.products.sort(function (a, b) {
                return a.categoryname.localeCompare(b.categoryname);
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

.responsive-table {
    overflow-x: auto
}
</style>
