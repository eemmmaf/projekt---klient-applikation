<template>
        <header class="border-b-2 shadow-s">
            <div class="flex justify-between">
                <div class="flex">
                    <div class="p-3 absolute left-40 mt-2">
                        <router-link to="/">
                            <h1 class="font-headings text-xl p-1 font-bold ml-10 text-dark-color">Matbolaget</h1>
                        </router-link>
                    </div>
                </div>
                <div class="flex border-l-2">
                    <div class="m-8 cursor-pointer text-dark-color">
                        <!--Sökruta-->
                        <Searchbox />
                    </div>

                    <!--Cirkel istället för bild-->
                    <div class="self-center border-l-2 p-3 text-dark-color">
                        <div class="circle">
                        </div>
                        <!--Inloggades namn-->
                        <p class="font-content font-bold">Emma Forslund</p>
                    </div>

                    <!--Logga ut-->
                    <div class="bg-medium-color text-white p-5 self-center">
                        <button @click="logOut()">Logga ut</button>
                    </div>
                </div>
            </div>
        </header>

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
    margin-left: 2rem;
}
</style>