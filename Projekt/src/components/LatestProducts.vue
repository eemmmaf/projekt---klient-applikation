<!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->

<!--Komponent för utskrift av de 5 senaste produkterna-->

<template>
    <ul>
        <li class="font-content text-base mt-2 text-center md:text-left">
            <!--Länk till enskild produkt-->
            <Router-link class="text-dark-color underline hover:text-medium-color"
                :to="{name: 'singleproduct', params: { id: product.id } }">{{product.name}}</Router-link>
        </li>
    </ul>

</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>

<style scoped>

</style>