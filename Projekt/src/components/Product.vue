<template>
    <!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->

    <!--Komponent för utkrift av produkt i tabell-->

    <tr class="border-solid border-2 border-light-pink font-content hover:bg-slate-100">
        <td>{{product.id}}
        </td>
        <td>{{product.name}}</td>
        <td>{{product.quantity}}
        </td>
        <td>{{product.price}}</td>
        <td>{{product.categoryname}}</td>
        <td>
            <!--Länk till enskild produkt-->
            <Router-link class="text-dark-color" :to="{name: 'singleproduct', params: { id: product.id } }"><i
                    class="fa-xl fa-solid fa-pen"></i></Router-link>
        </td>
        <!--Knapp för att ta bort-->
        <td @click="$emit('delete')"><i class="fa-xl fa-solid fa-trash cursor-pointer text-dark-color"></i></td>
    </tr>
</template>

<script>
export default {
    props: {
        product: Object
    }
}

</script>

<style scoped>
td {
    padding: 1em;
}
</style>