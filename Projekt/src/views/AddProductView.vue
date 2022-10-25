<template>
    <!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->

    <!--View för att lägga till produkt-->

    <div class="container max-w-screen-md mt-5 mb-8">
        <h2 class="font-headings text-xxl text-center md:text-left mb-5 font-bold text-dark-color">Lägg till produkt</h2>

        <!--Skriver ut felmeddelande med alla fel -->
        <div class="border-solid border border-error p-4 md:max-w-xs mb-5 bg-white shadow-md" v-if="error.length">
            <h2 class="font-headings font-bold">Följande fel upptäckes:</h2>
            <ul class="list-disc list-inside text-error">
                <!--Loopar igenom fel och skriver ut-->
                <li class="mt-1" v-for="e in error" v-bind:key="e.id">
                    {{e}}</li>
            </ul>
        </div>


        <div class="border-solid border-2 p-5 bg-white shadow-sm">
            <!--Formulär för att lägga till produkt-->
            <form class="mt-2" @submit.prevent="addProduct()">

                <div class="flex flex-col justify-between md:flex-row">
                    <div>
                        <!--Skriver ut meddelande om produkten läggs till-->
                        <div class="text-base font-content font-bold text-dark-color" v-if="success">
                            {{success}} <i class="fa-solid fa-circle-check text-green-600"></i>
                        </div>

                        <!--Produktens namn-->
                        <div class="mt-5 md:w-3/5">
                            <label class="font-bold font-headings" for="name">Namn </label><i
                                class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                            <input v-model="name" type="text" id="namn" name="namn"
                                class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="nameError">
                                <span>{{nameError}}</span>
                            </div>
                        </div>

                        <!--Produktens hyllplats-->
                        <div class="mt-5 md:w-3/5">
                            <label class="font-bold font-headings" for="shelf">Hyllplats </label><i
                                class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                            <input v-model="shelf" type="text" id="shelf" name="shelf"
                                class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="shelfError">
                                <span>{{shelfError}}</span>
                            </div>
                        </div>

                        <!--Pris-->
                        <div class="mt-5 md:w-3/5">
                            <label class="font-bold font-headings mt-5" for="price">Pris(kr) </label><i
                                class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                            <input v-model="price" type="number" id="price" name="price"
                                class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="priceError">
                                <span>{{priceError}}</span>
                            </div>
                        </div>

                        <!--Kategori-->
                        <div class="mt-5 md:w-3/5">
                            <label class="font-bold font-headings" for="price">Kategori </label><i
                                class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                            <!--Select med kategorier-->
                            <select v-model="category_id"
                                class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">7
                                <option value="">Välj kategori</option>
                                <option v-for="option in categories" :value="option.id">
                                    {{ option.categoryname }}
                                </option>
                            </select>

                            <!--Felmeddelande-->
                            <div class=" text-error font-bold font-content" v-if="categoryError">
                                <span>{{categoryError}}</span>
                            </div>
                        </div>

                        <!--Beskrivning-->
                        <div class="mt-5 md:w-3/5">
                            <label for="description" class="font-bold font-headings">Produktbeskrivning:</label>
                            <i class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                            <textarea id="description" name="description" v-model="description" rows="4" cols="70"
                                class="border-solid border border-slate-400 shadow-sm bg-white p-1"></textarea>
                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="descriptionError">
                                <span>{{descriptionError}}</span>
                            </div>
                        </div>
                    </div>

                    <!--Antal i lager-->
                    <div class="text-center md:text-left mt-5">
                        <label class="font-headings font-bold text-xl mx-3" for="price">Antal i lager</label><br>
                        <!--Minus-->
                        <div class="flex justify-center md:justify-between mt-3">
                            <!--Anropar funktionen som minskar antal-->
                            <i @click="decreaseQ(quantity)"
                                class="fa-solid fa-circle-minus fa-3x text-dark-color cursor-pointer hover:text-medium-color"></i>
                            <input v-model="quantity" type="text" id="price" name="price"
                                class="border-solid border border-slate-400 shadow-sm bg-white w-11 mx-4 text-center">
                            <!--Anropar funktionen som ökar antal-->
                            <i @click="increaseQ(quantity)"
                                class="fa-solid fa-circle-plus fa-3x text-dark-color cursor-pointer hover:text-medium-color"></i>
                        </div>
                        <!-- Kontroll om felmeddelande och skriver ut om fel -->
                        <div class=" text-error font-bold font-content mt-3" v-if="quantityError">
                            <span>{{quantityError}}</span>
                        </div>

                        <!--Knapp för att lägga till-->
                        <div class="mt-20">
                            <button
                                class="bg-dark-color p-3 font-headings font-bold rounded-md shadow-md text-main-color hover:bg-medium-color"
                                type="submit">Lägg till
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            name: "",
            description: "",
            price: "",
            quantity: "0",
            category_id: "",
            success: "",
            nameError: "",
            categoryError: "",
            descriptionError: "",
            quantityError: "",
            priceError: "",
            shelfError: "",
            error: [],
            categoryname: "",
            categories: [],
            shelf: "",
            token: ""
        }
    },
    methods: {
        //Lägger till produkt
        async addProduct() {
            this.token = localStorage.getItem('token');
            if (this.name && this.description && this.price && this.price && this.category_id && this.shelf != "") {
                let createdBody = {
                    name: this.name,
                    description: this.description,
                    quantity: this.quantity,
                    price: this.price,
                    shelf: this.shelf,
                    category_id: this.category_id
                };
                //Fetch-anrop med metoden POST
                const resp = await fetch("http://localhost:8000/api/addproduct/", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + this.token
                    },
                    body: JSON.stringify(createdBody)
                });

                //Skriver ut om produkten läggs till
                this.success = "Produkten har lagts till";
                //Tömmer error-arrayen om allt är ifyllt, ifall något fanns där innan
                this.error = [];
                //Gör meddelandena tomma by default
                this.nameError = "";
                this.categoryError = "";
                this.descriptionError = "";
                this.priceError = "";
                this.quantityError = "";
                this.shelfError = "";

            } else {
                //Gör meddelandena tomma by default
                this.nameError = "";
                this.categoryError = "";
                this.descriptionError = "";
                this.priceError = "";
                this.quantityError = "";
                this.shelfError = "";
                this.error = [];
                this.success = "";

                //Felmeddelande för namn
                if (!this.name) {
                    this.error.push("Namn måste fyllas i");
                    this.nameError = "Fyll i namn";
                }
                //Felmeddelande för kategori
                if (!this.description) {
                    this.error.push("Beskrivning måste fyllas i");
                    this.descriptionError = "Fyll i beskrivning";
                }
                //Felmeddelande för antal medlemmar
                if (!this.category_id) {
                    this.error.push("Kategori måste väljas");
                    this.categoryError = "Välj kategori";
                }
                //Felmeddelande för antal medlemmar
                if (!this.price) {
                    this.error.push("Pris måste fyllas i");
                    this.priceError = "Fyll i pris";
                }

                //Felmeddelande för hyllplats
                if (!this.shelf) {
                    this.error.push("Hyllplats måste fyllas i");
                    this.shelfError = "Fyll i hyllplats";
                }
            }

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
        },
        //Metod för att öka antal produkter i lager
        increaseQ() {
            this.quantity++;
        },
        //Metod för att minska
        decreaseQ() {
            this.quantity--;
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>

<style scoped>
button {
    max-width: 200px;
    width: 100%;
}

textarea {
    max-width: 100%;
}
</style>