<template>
    <!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 */
-->

    <!--View där användaren kan lägga till kategori-->

    <div class="container max-w-screen-sm mt-5 mb-7">
        <h2 class="font-headings text-xxl text-center md:text-left mb-5 font-bold">Lägg till kategori</h2>

        <!--Formulär. Anropar metoden addCategory-->
        <form class="mt-2" @submit.prevent="addCategory()">
            <div class="border-solid border-2 p-5 bg-white shadow-sm">
                <!--Skriver ut meddelande om det lycks-->
                <div class="text-base font-content font-bold text-dark-color" v-if="success">
                    {{success}} <i class="fa-solid fa-circle-check text-green-600"></i>
                </div>


                <!--Kategorins namn-->
                <div class="mt-5 w-full">
                    <label class="font-bold font-headings" for="name">Namn </label><i
                        class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                    <input v-model="categoryname" type="text" id="namn" name="namn"
                        class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                    <!-- Kontroll om felmeddelande och skriver ut om fel -->
                    <div class=" text-error font-bold font-content" v-if="nameError">
                        <span>{{nameError}}</span>
                    </div>
                </div>

                <!--Kategorins beskrivning-->
                <div class="mt-5 w-full">
                    <label for="description" class="font-bold font-headings">Beskrivning:</label>
                    <i class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                    <textarea id="description" name="description" v-model="categorydescription" rows="4" cols="80"
                        class="border-solid border border-slate-400 shadow-sm bg-white p-1"></textarea>
                    <!-- Kontroll om felmeddelande och skriver ut om fel -->
                    <div class=" text-error font-bold font-content" v-if="descriptionError">
                        <span>{{descriptionError}}</span>
                    </div>
                </div>

                <!--Knapp för att lägga till-->
                <div>
                    <button
                        class="bg-dark-color p-3 font-headings font-bold rounded-md shadow-md text-main-color hover:bg-medium-color"
                        type="submit">Lägg till
                    </button>

                </div>
            </div>

        </form>

    </div>
</template>

<script>

export default {
    data() {
        return {
            categoryname: "",
            categorydescription: "",
            nameError: "",
            descriptionError: "",
            success: "",
            token: ""
        }
    },
    methods: {
        //Metod för att lägga till kategori
        async addCategory() {
            this.token = localStorage.getItem('token');
            if (this.categoryname && this.categorydescription != "") {
                let createdBody = {
                    categorydescription: this.categorydescription,
                    categoryname: this.categoryname
                };
                //Fetch-anrop med metoden POST
                const resp = await fetch("http://localhost:8000/api/addcategory/", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + this.token
                    },
                    body: JSON.stringify(createdBody)
                });

                //Meddelande om kategorin lyckas läggas till
                this.success = "Kategorin har lagts till";

                //Gör felmeddelanden tomma
                this.descriptionError = "";
                this.nameError = "";
            } else {
                //Gör meddelandena tomma
                this.success = "";
                this.nameError = "";
                this.descriptionError = "";

                //Kontroll om namn fyllts i och lägger till felmeddelande
                if (!this.categoryname) {
                    this.nameError = "Namn måste fyllas i";
                }
                //Kontroll om kategori fyllts i och lägger till felmeddelande
                if (!this.categorydescription) {
                    this.descriptionError = "Beskrivning måste fyllas i";
                }
            }

        }
    }
}
</script>

<style scoped>
button {
    max-width: 200px;
    width: 100%;
    margin: 3rem auto;
    display: block;
}

textarea {
    max-width: 100%;
}
</style>