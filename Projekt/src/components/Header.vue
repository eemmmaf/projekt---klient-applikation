<template>
    <div v-if="$route.name!=='login'">
        <header class="border-b-2 p-2 shadow-s bg-white">


            <!--Flexcontainer för innehållet i headern-->
            <div class="grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 md:justify-items-center">

                    <div class="ml-20">
                        <router-link to="/">
                            <h1 class="font-headings text-xl font-bold text-dark-color">Matbolaget</h1>
                        </router-link>
                    </div>


                    <!--Sökruta-->
                    <div class="order-last self-center col-span-2 justify-self-center md:col-span-1">
                        <Searchbox />
                    </div>




                <div class="justify-self-end md:order-last">
                    <!--Logga ut-->
                    <button @click="logOut()">Logga ut <i class="fa-solid fa-right-from-bracket"></i></button>
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
            toggle: false,
            result: [],
            products: "",
            token: "",
            username: "",
            show: true
        }
    },
    methods: {
        //Lägger til podcast
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


            localStorage.clear();

            this.$router.push('/login');
        }
    }
}



</script>

<style scoped>
img {
    max-width: 100px;
    margin-top: 0.5em;
}

.circle {
    background-color: #C080E2;
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

@media only screen and (min-width: 1400px) {
    h1 {
        position: absolute;
        left: 13rem;
    }

}
</style>