<template>
    <!--Email-->
    <form class="shadow-lg py-8 px-7 bg-main-color md:max-w-md md:container mt-20 rounded" @submit.prevent="logIn()">
        <h1 class="text-center text-white text-xl font-bold">Logga in på MellisProffsen</h1>
        <!--Skriver ut felmeddelande om inloggning misslyckas-->
        <div v-if="errorMessage">
            <p class="text-white text-center mt-3 text-base font-bold">
                {{errorMessage}}
            </p>
        </div>
        <div class="mt-7">
            <label for="email" class="text-white text-base">Email</label><br>
            <input v-model="email" type="email" name="mail" id="email" class="w-full shadow-sm py-1.5 px-1"><br>
            <!--Skriver ut meddelande om inte email är ifyllt-->
            <div v-if="emptyEmail">
                <p class="text-white mt-3 text-sm font-content">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    {{emptyEmail}}
                </p>
            </div>
        </div>

        <!--Lösenord-->
        <div class="mt-9">
            <label for="email" class="text-white text-base">Lösenord</label><br>
            <input type="password" v-model="password" name="password" id="password"
                class="w-full shadow-sm py-1.5 px-1">
            <!--Skriver ut meddelande om lösenord inte är ifyllt-->
            <div v-if="emptyPassword">
                <p class="text-white mt-3 text-sm font-content">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    {{emptyPassword}}
                </p>
            </div>
        </div>
        <!--Logga in-knapp-->
        <div>
            <button @click="$router.push('/')"
                class="w-full md:w-3/5 m-auto block shadow-lg shadow-blue-500/40 bg-white mt-10 font-bold py-2 px-4 rounded hover:bg-light-color">Logga
                in </button>
        </div>
    </form>
</template>

<script>
//JS för inloggning
export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
            token: "",
            emptyEmail: "",
            emptyPassword: ""
        }
    },
    methods: {
        //Lägger til podcast
        async logIn() {
            if (this.email && this.password != "") {
                let favoriteBody = {
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
                    body: JSON.stringify(favoriteBody)
                }
                );
                const data = await resp.json();

                //Sparar token
                this.token = data.token;
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

</style>