<template>
    <article class="p-5 mt-8">
        <div class="flex justify-between bg-medium-color rounded-t-lg">
            <div>
                <h2 class="font-headings text-xxl text-white px-2">
                    {{category.categoryname}}</h2>
            </div>
            <div class="p-3 text-white cursor-pointer flex">
                <Router-link class="text-white" :to="{name: 'singlecategory', params: { id: category.id } }"><i
                        class="fa-xl fa-solid fa-pen"></i></Router-link>
                </div>
            </div>
        <p class="font-content text-base px-2 py-3 shadow shadow-gray-400">{{category.categorydescription}}</p>
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