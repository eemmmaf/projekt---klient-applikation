<template>
    <div class="container max-w-screen-md mt-5">
        <ul class="font-content flex mb-5 text-base px-2 md:px-1">
            <li class="hover:underline">
                <router-link to="/products">Alla produkter ></router-link>
            </li>
            <li class="font-bold">Lägg till produkt</li>
        </ul>
    </div>
    <h2 class="font-headings text-xxl text-center md:text-left mb-5 font-bold">Ändra produkt</h2>

    <!--Kontroll om en product hittas. Skriver ut nedan om det hittas-->
    <div class="border-solid border-2 p-5" v-if="product">
        <form class="mt-2" @submit.prevent="updateProduct(product)">
            <div class="flex flex-col justify-between md:flex-row">
                <div>
                    <div class="text-base font-content font-bold text-dark-color" v-if="success">
                        {{success}} <i class="fa-solid fa-circle-check text-green-600"></i>
                    </div>
                    <!--Produktens ID-->
                    <div class="mt-5 md:w-3/5">
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
                        <label class="font-bold font-headings" for="price">Kategori </label><i
                            class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                        <input v-model="product.category_id" type="number" id="category" name="category"
                            class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                        <!-- Kontroll om felmeddelande och skriver ut om fel -->
                        <div class=" text-error font-bold font-content" v-if="categoryError">
                            <span>{{categoryError}}</span>
                        </div>
                    </div>

                    <!--Textarea-->
                    <div class="mt-5 md:w-3/5">
                        <label for="description" class="font-bold font-headings">Produktbeskrivning:</label>
                        <i class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>

                        <textarea id="description" name="description" v-model="product.description" rows="4" cols="70"
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

</template>

<script>
export default {
    data() {
        return {
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
            priceError: ""
        }
    },
    methods: {
        //Lägger til podcast
        async addProduct() {
            if (product.name && product.description && product.price && product.quantity && product.price && product.category_id != "") {
                let createdBody = {
                    name: this.name,
                    description: this.description,
                    quantity: this.quantity,
                    price: this.price,
                    category_id: this.category_id
                };
                //Fetch-anrop med metoden POST
                const resp = await fetch("http://localhost:8000/api/addproduct/", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(createdBody)
                });

            }
        }
    }
}
</script>

<style scoped>

</style>