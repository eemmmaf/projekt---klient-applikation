<template>
    <div class="container max-w-screen-md mt-5">
        <div v-if="product">
            <ul class="font-content flex mb-5 text-base px-2 md:px-1">
                <li class="hover:underline">
                    <router-link to="/products">Alla produkter ></router-link>
                </li>
                <li class="font-bold">{{product.name}}</li>
            </ul>
        </div>
        <h2 class="font-headings text-xxl text-center md:text-left mb-5 font-bold">Ändra produkt</h2>
        <!--Kontroll om en product hittas. Skriver ut nedan om det hittas-->
        <div class="border-solid border-2 p-5" v-if="product">
            <form class="mt-2" @submit.prevent="updateProduct(product)">
                <!--Information om tid-->
                <div class="flex justify-between mb-8">
                    <div>
                        <h3 class="font-bold">Skapad</h3>
                        <p class="text-medium-color">{{product.created_at}}</p>
                    </div>
                    <div>
                        <h3 class="font-bold">Senast uppdaterad</h3>
                        <p class="text-medium-color">{{product.updated_at}}</p>
                    </div>
                </div>
                <div class="flex flex-col justify-between md:flex-row">
                    <div>
                        <div class="text-base font-content font-bold text-dark-color" v-if="success">
                            {{success}} <i class="fa-solid fa-circle-check text-green-600"></i>
                        </div>
                        <!--Produktens ID-->
                        <div class="mt-2 md:w-3/5">
                            <h2 class="font-bold font-headings">Artikelnummer</h2>
                            <input v-model="product.id" type="text" id="id" name="id" disabled
                                class="border-solid border shadow-sm w-full read-only:border-slate-200 read-only:bg-slate-50 p-1">
                        </div>

                        <!--Produktens namn-->
                        <div class="mt-5 md:w-3/5">
                            <label class="font-bold font-headings" for="name">Namn </label><i
                                class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                            <input v-model="product.name" type="text" id="namn" name="namn"
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
                            <input v-model="product.shelf" type="text" id="shelf" name="shelf"
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
                            <input v-model="product.price" type="number" id="price" name="price"
                                class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="priceError">
                                <span>{{priceError}}</span>
                            </div>
                        </div>

                        <!--Kategori-->
                        <div class="mt-5 md:w-3/5">
                            <label class="font-bold font-headings" for="category">Kategori </label><i
                                class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>

                            <select v-model="product.category_id" :value="product.category_id"
                                class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                                <option v-for="option in categories" :value="option.id">
                                    {{ option.categoryname }}
                                </option>
                            </select>

                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="categoryError">
                                <span>{{categoryError}}</span>
                            </div>
                        </div>

                        <!--Textarea-->
                        <div class="mt-5 md:w-3/5">
                            <label for="description" class="font-bold font-headings">Produktbeskrivning:</label>
                            <i class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>

                            <textarea id="description" name="description" v-model="product.description" rows="4"
                                cols="70"
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
                            <i @click="decreaseQ(product.quantity)"
                                class="fa-solid fa-circle-minus fa-3x text-dark-color cursor-pointer hover:text-medium-color"></i>
                            <input v-model="product.quantity" type="number" id="price" name="price"
                                class="border-solid border border-slate-400 shadow-sm bg-white w-11 mx-4 text-center">
                            <!--Plus-->
                            <i @click="increaseQ(product.quantity)"
                                class="fa-solid fa-circle-plus fa-3x text-dark-color cursor-pointer hover:text-medium-color"></i>
                        </div>

                        <!--Knapp för att uppdatera till-->
                        <div class="mt-20">
                            <button
                                class="bg-dark-color p-3 font-headings font-bold rounded-md shadow-md text-main-color hover:bg-medium-color"
                                type="submit">Uppdatera
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <!--Om en produkt inte hittas skrivs detta ut istället-->
        <div v-else>
            <h2 class="font-headings text-xxl p-8 text-center m-10">Läser in produkt...</h2>
        </div>

    </div>


</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            products: [],
            product: null,
            name: "",
            description: "",
            price: "",
            quantity: "",
            category_id: "",
            success: "",
            nameError: "",
            categoryError: "",
            descriptionError: "",
            quantityError: "",
            priceError: "",
            categoryname: "",
            categories: [],
            shelf: "",
            shelfError: "",
            token: ""
        }
    },

    methods: {
        //Metod för att öka antal produkter i lager
        increaseQ() {
            this.product.quantity++;
        },
        //Metod för att minska
        decreaseQ() {
            this.product.quantity--;
        },

        //Uppdaterar produkt
        async updateProduct(product) {
            this.token = localStorage.getItem('token');
            if (product.name && product.description && product.price && product.quantity && product.price && product.category_id && product.shelf != "") {
                let updatedBody = {
                    id: this.id,
                    name: product.name,
                    description: product.description,
                    quantity: product.quantity,
                    price: product.price,
                    shelf: product.shelf,
                    category_id: product.category_id,
                    token: ""
                };
                //Fetch-anrop med metoden PUT
                const resp = await fetch("http://localhost:8000/api/updateproduct/" + this.id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + this.token
                    },
                    body: JSON.stringify(updatedBody)
                });
                //Lägger till ett meddelande att producten har uppdaterats
                this.success = "Produkten har uppdaterats";
                //Gör meddelandena tomma by default
                this.nameError = "";
                this.categoryError = "";
                this.descriptionError = "";
                this.priceError = "";
                this.shelfError = "";
            }
            else {
                //Gör meddelandena tomma by default
                this.nameError = "";
                this.categoryError = "";
                this.descriptionError = "";
                this.priceError = "";
                this.success = "";
                this.shelfError = "";

                //Felmeddelande för namn
                if (!product.name) {
                    this.nameError = "Fyll i namn";
                }
                //Felmeddelande för kategori
                if (!product.description) {
                    this.descriptionError = "Fyll i beskrivning";
                }
                //Felmeddelande för antal medlemmar
                if (!product.category_id) {
                    this.categoryError = "Välj kategori";
                }
                //Felmeddelande för antal medlemmar
                if (!product.price) {
                    this.priceError = "Fyll i pris";
                }
                //Felmeddelande för hyllplats
                if (!product.shelf) {
                    this.shelfError = "Fyll i hyllplats";
                }
            }
        },
        //Hämtar alla kategorier
        async getCategories() {
            this.token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:8000/api/getcategories", {
                //Använder metoden GET
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });
            const data = await resp.json();
            this.categories = data;
            console.log(this.categories);
        }
    },
    //Hämtar specifik product utifrån dess id och anropar getCategories
    async mounted() {
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