<template>
    <!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->

    <!--Komponent för navigeringen som är på sidan-->

    <!--Gömmer om personen inte är inloggad-->
    <div v-if="$route.name!=='login'">
        <!--Meny för desktop-->
        <nav class="max-w-sm font-headings text-base desktop">
            <div
                class="fixed left-0 top-0 flex flex-col items-center w-48 overflow-hidden text-dark-color rounded bg-white border-solid border-2 h-screen">
                <!--Logotypen-->
                <router-link to="/"><img src="../assets/logo.svg" alt=""></router-link>
                <!--Lista med länkar till olika views-->
                <ul class="mt-15">
                    <li class="hover:underline">
                        <router-link to="/"><i class="fa-solid fa-house text-medium-color"></i> Startsida</router-link>
                    </li>
                    <li class="hover:underline">
                        <router-link to="/addproduct"><i class="fa-solid fa-circle-plus text-green-700"></i> Lägg till
                            produkt</router-link>
                    </li>
                    <li class="hover:underline">
                        <router-link to="/products"><i class="fa-solid fa-list text-medium-color"></i> Alla produkter
                        </router-link>
                    </li>
                    <li class="hover:underline">
                        <router-link to="/addcategory"><i class="fa-solid fa-circle-plus text-green-700"></i> Lägg till
                            kategori</router-link>
                    </li>
                    <li class="hover:underline">
                        <router-link to="/categories"><i class="fa-solid fa-list text-medium-color"></i> Alla kategorier
                        </router-link>
                    </li>
                    <li class="hover:underline">
                        <router-link to="/adduser"><i class="fa-solid fa-user-plus"></i> Användare</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <!--Mobil-->
        <nav class="max-w-sm font-headings text-base mobile">
            <!--Visar menyn vid klick för mobil-->
            <button @click='toggle = !toggle' class="btn text-medium-color">
                <i class="fa-solid fa-bars"></i>
            </button>
            <!--Mobilmeny-->
            <div v-show="toggle">
                <div
                    class="fixed left-0 top-0 flex flex-col items-center w-48 overflow-hidden text-dark-color rounded bg-white border-solid border-2 h-screen">
                    <ul class="mt-20">
                        <li>
                            <router-link to="/"><i class="fa-solid fa-house text-medium-color"></i> Startsida
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/addproduct"><i class="fa-solid fa-circle-plus text-green-700"></i> Lägg
                                till
                                produkt</router-link>
                        </li>
                        <li>
                            <router-link to="/products"><i class="fa-solid fa-list text-medium-color"></i> Alla
                                produkter
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/addcategory"><i class="fa-solid fa-circle-plus text-green-700"></i> Lägg
                                till
                                kategori</router-link>
                        </li>
                        <li>
                            <router-link to="/categories"><i class="fa-solid fa-list text-medium-color"></i> Alla
                                kategorier
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/adduser"><i class="fa-solid fa-user-plus"></i> Användare</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
export default {
    data() {
        return {
            toggle: false
        }
    }
}

</script>

<style scoped>
img {
    max-width: 100px;
    margin: 1em auto;
}

li {
    margin-top: 2.5em;
}

.btn {
    font-size: 2em;
    position: absolute;
    top: 0.5%;
    left: 3%;
    z-index: 1;
}


@media only screen and (max-width: 1400px) {
    .desktop {
        display: none;
    }

    .mobile {
        display: block;
    }

}

@media only screen and (min-width: 1400px) {
    .btn {
        display: none;
    }

}
</style>
