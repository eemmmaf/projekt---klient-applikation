<template>
    <div class="border-solid border-2 border-light-pink p-8 flex flex-col justify-center shadow-md text-center">
        <div>
            <h2 class="font-headings text-base mb-5 font-bold">Inloggad användare</h2>
            <div class="place-self-center">
                <i class="fa-8x text-medium-color fa-regular fa-user text-center"></i>
            </div>
            <p class="text-dark-color font-content text-base text-center mt-4 font-bold">{{user.name}}</p>
        </div>
    </div>

</template>

<script>

export default {
    data() {
        return {
            name: "",
            user: [],
            token: ""
        }
    },

    methods: {
        //Hämtar inloggad användare
        async getUser() {
            this.token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:8000/api/user", {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this.token
                }
            });

            const data = await resp.json();
            this.user = data;
        }
    },
    mounted() {
        this.getUser();
    }
}

</script>


<style scoped>

</style>