<template>
<!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->
    <div class="bg-main-color h-screen">
        <!--Email-->
        <form
            class="shadow-lg py-8 px-7 bg-white md:max-w-md md:container rounded text-dark-color border-solid border-2 border-main-color">
            <h1 class="text-center font-headings text-xl font-bold">Logga in på Matbolaget</h1>
            <!--Skriver ut felmeddelande om inloggning misslyckas-->
            <div v-if="errorMessage">
                <p class="text-error text-center mt-3 text-base font-bold font-conent">
                    {{errorMessage}}
                </p>
            </div>
            <div class="mt-7">
                <label for="email" class="text-dark-color text-base">Email</label><br>
                <input v-model="email" type="email" name="mail" id="email"
                    class="w-full shadow-sm py-1.5 px-1 border-solid border-2 border-light-color rounded"><br>
                <!--Skriver ut meddelande om inte email är ifyllt-->
                <div v-if="emptyEmail">
                    <p class="text-error mt-3 text-sm font-content">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        {{emptyEmail}}
                    </p>
                </div>
            </div>

            <!--Lösenord-->
            <div class="mt-9">
                <label for="email" class="text-dark-color text-base">Lösenord</label><br>
                <input type="password" v-model="password" name="password" id="password"
                    class="w-full shadow-sm py-1.5 px-1 border-solid border-2 border-light-color rounded">
                <!--Skriver ut meddelande om lösenord inte är ifyllt-->
                <div v-if="emptyPassword">
                    <p class="text-error mt-3 text-sm font-content">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        {{emptyPassword}}
                    </p>
                </div>
            </div>
            <!--Logga in-knapp-->
            <div>
                <button @click.prevent="logIn()"
                    class="w-full md:w-3/5 m-auto block shadow-lg shadow-blue-500/40 bg-medium-color text-white mt-10 font-bold py-2 px-4 rounded hover:bg-light-color">Logga
                    in </button>
            </div>
        </form>
    </div>
</template>

<script>
//JS för inloggning
export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
            emptyEmail: "",
            emptyPassword: "",
            token: ""
        }
    },
    methods: {
        //Lägger til podcast
        async logIn() {
            if (this.email && this.password != "") {
                let loginBody = {
                    email: this.email,
                    password: this.password
                };
                //Fetch-anrop med metoden POST
                const resp = await fetch("http://localhost:8000/api/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(loginBody)
                }
                );
                const data = await resp.json();
                //Sparar token
                this.token = data.token;

                if (this.token != undefined) {
                    //Sparar i localstorage
                    localStorage.setItem('token', this.token);
                    this.$router.push("/");
                }


                //Sparar meddelandet i variabeln message
                let message = data.message;
                //Hämtar meddelande från api och sparar det i errorMessage
                this.errorMessage = message;
                //Gör felmeddelandena tomma ifall något fylls i
                this.emptyEmail = "";
                this.emptyPassword = "";
            } else {
                //Gör felmeddelandena tomma by default
                this.emptyEmail = "";
                this.emptyPassword = "";

                //Felmeddelande om fälten är tomma
                if (this.email == "" || null) {
                    this.emptyEmail = "Fyll i din mailadress";
                }
                //Felmeddelande om fälten är tomma
                if (this.password == "" | null) {
                    this.emptyPassword = "Fyll i ditt lösenord";
                }
            }
        }
    }
}

</script>

<style scoped>
form {
    position: absolute;
    left: 35%;
    top: 15%;
}
</style>