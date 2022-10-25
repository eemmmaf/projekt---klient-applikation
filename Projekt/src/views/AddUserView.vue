<template>
    <!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->
    <div class="container max-w-screen-md mt-5">
        <h2 class="font-headings text-xxl text-center md:text-left mb-5 font-bold">Lägg till en användare</h2>
        <div class="border-solid border-2 p-5 bg-white shadow-sm">

            <!--Formulär för att lägga till en användare-->
            <form class="mt-2" @submit.prevent="addUser()">
                <!--Meddelande om användare läggs till-->
                <div class="text-center mb-5 text-base font-content font-bold text-dark-color" v-if="success">
                    {{success}} <i class="fa-solid fa-circle-check text-green-600"></i>
                </div>


                <div class="flex flex-col justify-center">
                    <div>
                        <!--Användarens namn-->
                        <div class="mt-5 w-full md:w-3/4">
                            <label class="font-bold font-headings" for="username">Namn </label><br>
                            <input v-model="name" type="text" id="username" name="username"
                                class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="nameError">
                                <span>{{nameError}}</span>
                            </div>
                        </div>

                        <!--Användarens mailadress-->
                        <div class="mt-5 w-full md:w-3/4">
                            <label class="font-bold font-headings" for="email">Mailadress</label><br>
                            <input v-model="email" type="email" id="email" name="email"
                                class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="emailError">
                                <span>{{emailError}}</span>
                            </div>
                        </div>
                        <div>

                            <!--Användarens lösenord-->
                            <div class="mt-5 w-full md:w-3/4">
                                <label class="font-bold font-headings" for="password">Lösenord</label><br>
                                <input v-model="password" type="password" id="password" name="password"
                                    class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">
                                <!-- Kontroll om felmeddelande och skriver ut om fel -->
                                <div class=" text-error font-bold font-content" v-if="passwordError">
                                    <span>{{passwordError}}</span>
                                </div>
                            </div>
                        </div>


                        <!--Upprepa lösenord-->
                        <div class="mt-5 w-full md:w-3/4">
                            <label class="font-bold font-headings" for="verified">Upprepa lösenord</label><br>
                            <input v-model="verifiedPassword" type="password" id="verified" name="verified"
                                class="border-solid border border-slate-400 shadow-sm w-full bg-white p-1">

                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="passwordVerifyError">
                                <span>{{passwordVerifyError}}</span>
                            </div>
                            <!-- Kontroll om felmeddelande och skriver ut om fel -->
                            <div class=" text-error font-bold font-content" v-if="verifiedError">
                                <span>{{verifiedError}}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <!--Knapp för att lägga till-->
                <div class="mt-10">
                    <button
                        class="bg-dark-color p-3 font-headings font-bold rounded-md shadow-md text-main-color hover:bg-medium-color"
                        type="submit">Lägg till
                    </button>
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
            email: "",
            password: "",
            verifiedPassword: "",
            token: "",
            nameError: "",
            passwordError: "",
            verifiedError: "",
            emailError: "",
            success: "",
            passwordVerifyError: ""
        }
    },
    methods: {
        //Metod för att lägga till en användare
        async addUser() {
            this.token = localStorage.getItem('token');
            //Kontroll om lösenorden stämmer överens med 
            if (this.password === this.verifiedPassword) {
                if (this.name && this.email && this.password != "") {
                    let registerBody = {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    };

                    //Fetch-anrop med metoden POST
                    const resp = await fetch("http://localhost:8000/api/register/", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + this.token
                        },
                        body: JSON.stringify(registerBody)
                    });

                    //Lägger til ett meddelande om användaren registreras
                    this.success = "Användare registrerad"


                    //Gör tomma om det lyckas
                    this.nameError = "";
                    this.emailError = "";
                    this.passwordError = "";
                    this.passwordVerifyError = "";
                    this.verifiedError = "";


                } else {


                    //Gör meddelandena tomma
                    this.nameError = "";
                    this.emailError = "";
                    this.passwordError = "";
                    this.passwordVerifyError = "";
                    this.success = "";
                    this.verifiedError = "";

                    //Felmeddelanden
                    if (!this.name) {
                        this.nameError = "Fyll i namn";
                    }
                    if (!this.email) {
                        this.emailError = "Fyll i en giltig mailadress";
                    }
                    if (!this.password) {
                        this.passwordError = "Fyll i ett lösenord";
                    }
                    if (!this.passwordVerifyError) {
                        this.passwordVerifyError = "Lösenordet måste upprepas";
                    }
                }
            } else {
                //Meddelande om lösenorden inte stämmer överens
                this.verifiedError = "Lösenorden matchar inte."
                this.passwordError = "";
                this.passwordVerifyError = "";
            }
        }
    }
}
</script>

<style scoped>
button {
    max-width: 200px;
    display: block;
    width: 100%;
    margin: 2rem auto 1rem auto;
}
</style>