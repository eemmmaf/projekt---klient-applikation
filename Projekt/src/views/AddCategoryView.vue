<template>
    <div class="container max-w-screen-md mt-5">
        <h2 class="font-headings text-xxl text-center md:text-left mb-5 font-bold">Lägg till kategori</h2>
        <form class="mt-2" @submit.prevent="addCategory()">
            <div class="border-solid border-2 p-5">
                <div class="text-base font-content font-bold text-dark-color" v-if="success">
                    {{success}} <i class="fa-solid fa-circle-check text-green-600"></i>
                </div>
                <!--Produktens namn-->
                <div class="mt-5 md:w-3/5">
                    <label class="font-bold font-headings" for="name">Namn </label><i
                        class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                    <input v-model="categoryname" type="text" id="namn" name="namn"
                        class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                    <!-- Kontroll om felmeddelande och skriver ut om fel -->
                    <div class=" text-error font-bold font-content" v-if="nameError">
                        <span>{{nameError}}</span>
                    </div>
                </div>

                <!--Textarea-->
                <div class="mt-5 md:w-3/5">
                    <label for="description" class="font-bold font-headings">Beskrivning:</label>
                    <i class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>

                    <textarea id="description" name="description" v-model="categorydescription" rows="4" cols="70"
                        class="border-solid border border-slate-400 shadow-sm bg-white p-1"></textarea>
                    <!-- Kontroll om felmeddelande och skriver ut om fel -->
                    <div class=" text-error font-bold font-content" v-if="descriptionError">
                        <span>{{descriptionError}}</span>
                    </div>
                </div>

                <!--Knapp för att lägga till-->
                <div class="mt-20">
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

                this.success = "Kategorin har lagts till";
                this.descriptionError = "";
                this.nameError = "";
            } else {
                //Gör meddelandena tomma
                this.success = "";
                this.nameError = "";
                this.descriptionError = "";

                //Kontroll om namn fyllts i
                if (!this.categoryname) {
                    this.nameError = "Namn måste fyllas i";
                }
                //Kontroll om kategori fyllts i
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
}

textarea {
    max-width: 100%;
}
</style>