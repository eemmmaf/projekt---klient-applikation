<!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 * @Last Modified by:   Emma Forslund - emfo2102 
 * @Last Modified time: 2022-10-24 16:40:13 
 */
-->

<template>
    <article class="p-5 mt-8">
        <div class="flex justify-between bg-main-color rounded-t-lg">
            <div>
                <h2 class="font-headings text-xxl text-dark-color px-2">
                    {{category.categoryname}}</h2>
            </div>
            <div class="p-3 text-dark-color cursor-pointer flex">
                <Router-link class="text-dark-color" :to="{name: 'singlecategory', params: { id: category.id } }"><i
                        class="fa-xl fa-solid fa-pen"></i></Router-link>
                </div>
            </div>
        <p class="font-content text-base px-2 py-3 shadow shadow-gray-400 bg-white">{{category.categorydescription}}</p>
    </article>
</template>

<script>
export default {
    props: {
        category: Object
    }
}

</script>

<style scoped>

</style>