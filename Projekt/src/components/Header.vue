<!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->

<template>
    <!--Kontroll för att se om användaren inte befinner sig på login-sidan.-->
    <div v-if="$route.name!=='login'">
        <header class="border-b-2 p-2 shadow-s bg-white">


            <!--Flexcontainer för innehållet i headern-->
            <div class="grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 md:justify-items-center">

                <div class="md:ml-20 ml-16 text-center">
                    <router-link to="/">
                        <h1 class="font-headings text-xl font-bold mt-1 text-dark-color">Matbolaget</h1>
                    </router-link>
                </div>

                <!--Sökruta. Använder komponent-->
                <div class="order-last self-center col-span-2 justify-self-center md:col-span-1">
                    <Searchbox />
                </div>

                <!--Logga ut-knapp-->
                <div class="justify-self-end md:order-last font-content md:border-l-2">
                    <button class="mt-5 ml-2" @click="logOut()">Logga ut <i class="fa-solid fa-right-from-bracket"></i></button>
                </div>

            </div>
        </header>
    </div>

</template>


<script>
import Searchbox from '../components/Searchbox.vue';
import { RouterLink } from 'vue-router';


export default {
    components: {
        Searchbox,
        RouterLink
    },
    data() {
        return {
            result: [],
            products: "",
            token: "",
            username: "",
            show: true
        }
    },
    methods: {
        //Funktion för att logga ut. Anropas på knappen logga ut
        async logOut() {
            this.token = localStorage.getItem('token');
            let body = {
                email: this.email,
                password: this.password
            };
            //Fetch-anrop med metoden POST
            const resp = await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                },
                body: JSON.stringify(body)
            }
            );
            const data = await resp.json();


            //Tömmer localstorage
            localStorage.clear();

            //Tar använder till login-sida
            this.$router.push('/login');
        }
    }
}



</script>

<style scoped>
/*Logotypen*/
img {
    max-width: 100px;
    margin-top: 0.5em;
}

@media only screen and (min-width: 1400px) {
    h1 {
        position: absolute;
        left: 13rem;
    }

}
</style>