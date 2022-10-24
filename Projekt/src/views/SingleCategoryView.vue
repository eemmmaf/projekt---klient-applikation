<template>
<!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->
    <div class="container max-w-screen-md mt-5">
        <h2 class="font-headings text-xxl text-center md:text-left mb-5 font-bold">Ändra kategori
        </h2>
        <!--Kontroll om en kategori hittas. Skriver ut nedan om det hittas-->
        <div class="border-solid border-2 p-5 bg-white shadow-sm" v-if="category">
            <form class="mt-2" @submit.prevent="updateCategory(category)">
                <div class="text-base font-content font-bold text-dark-color" v-if="success">
                    {{success}} <i class="fa-solid fa-circle-check text-green-600"></i>
                </div>

                <!--Skriver ut meddelande om att kategorin har raderats-->
                <div v-if="deleted">
                    <p class="font-bold font-content text-base">{{deleted}}<i
                            class="fa-solid fa-circle-check text-green-600"></i></p>
                </div>

                <!--Kategorins namn-->
                <div class="md:flex">
                    <div>
                        <div class="mt-5 md:w-3/5">
                            <label class="font-bold font-headings" for="name">Kategorins namn </label><i
                                class="fa-solid fa-pencil fa-2xs text-medium-color"></i><br>
                            <input v-model="category.categoryname" type="text" id="name" name="name"
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

                            <textarea id="description" name="description" v-model="category.categorydescription"
                                rows="4" cols="70"
                                class="border-solid border border-slate-400 shadow-sm bg-white p-1"></textarea>
                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="descriptionError">
                                <span>{{descriptionError}}</span>
                            </div>
                        </div>

                        <!--Knapp för att uppdatera till-->
                        <div class="mt-20">
                            <button
                                class="bg-dark-color p-3 font-headings font-bold rounded-md shadow-md text-main-color hover:bg-medium-color"
                                type="submit">Uppdatera
                            </button>
                        </div>
                    </div>

                    <!--Knapp för att ta bort-->
                    <div @click="deleteCategory(id)" class="text-dark-color w-36">
                        <div
                            class="bg-main-color p-2 rounded-md shadow-lg border-solid border-2 border-light-pink font-headings font-bold hover:bg-medium-color cursor-pointer text-center">
                            Ta
                            bort <i class="fa-solid fa-trash cursor-pointer"></i></div>
                        <p>(Alla produkter i kategorin raderas)</p>
                    </div>
                </div>

            </form>

        </div>
        <!--Skriver ut om ingen kategori hittas-->
        <div v-else>
            <h2 class="font-headings text-xxl text-center p-11 font-bold">Läser in kategori....</h2>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            category: null,
            categoryname: "",
            categorydescription: "",
            success: "",
            nameError: "",
            descriptionError: "",
            deleted: "",
            token: ""
        }
    },
    methods: {
        //Uppdaterar produkt
        async updateCategory(category) {
            this.token = localStorage.getItem('token');
            if (category.categoryname && category.categorydescription != "") {
                let updatedBody = {
                    id: this.id,
                    categorydescription: category.categorydescription,
                    categoryname: category.categoryname
                };
                //Fetch-anrop med metoden PUT
                const resp = await fetch("http://localhost:8000/api/updatecategory/" + this.id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + this.token
                    },
                    body: JSON.stringify(updatedBody)
                });

                //Skriver ut felmeddelande
                this.success = "Kategorin har uppdaterats";
                this.nameError = "";
                this.descriptionError = "";
            } else {
                //Gör meddelandena tomma
                this.success = "";
                this.nameError = "";
                this.descriptionError = "";

                //Kontroll om namn fyllts i
                if (!category.categoryname) {
                    this.nameError = "Namn måste fyllas i";
                }
                //Kontroll om kategori fyllts i
                if (!category.categorydescription) {
                    this.descriptionError = "Beskrivning måste fyllas i";
                }
            }
        },
        //Metod för att ta bort produkt
        async deleteCategory(id) {
            this.token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:8000/api/deletecategory/" + this.id, {
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
        }

    },
    //Hämtar specifik product utifrån dess id och anropar getCategories
    async mounted() {
        this.token = localStorage.getItem('token');
        const resp = await fetch("http://localhost:8000/api/getcategory/" + this.id, {
            //Använder metoden DELETE
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.token
            }
        });
        
        const data = await resp.json();
        this.category = data;
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