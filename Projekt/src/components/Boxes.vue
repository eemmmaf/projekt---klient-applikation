<template>
    <div class="flex-item flex flex-row center p-8 mt-5 justify-evenly bg-medium-color flex-wrap">
        <div class="border-solid border-2 border-blue-900 rounded px-8 bg-main-color shadow-lg mt-3">
            <div class="font-headings p-10 text-center rounded-lg w-72">
                <i class="fa-solid fa-circle-plus fa-5x"></i><br><br>
                <router-link to="/addproduct">
                    <h2 class="font-headings text-xl">Lägg till produkt</h2>
                </router-link>
            </div>
        </div>
        <div class="border-solid border-2 border-blue-900 rounded px-8 bg-main-color shadow-lg mt-3">
            <div class="font-headings p-10 text-center rounded-lg w-72">
                <i class="fa-solid fa-wrench fa-4x"></i><br><br>
                <router-link to="/products">
                    <h2 class="font-headings text-xl">Alla produkter</h2>
                </router-link>
            </div>
        </div>
        <div class="border-solid border-2 border-blue-900 rounded px-8 bg-main-color text-center shadow-lg mt-3">
            <div class="font-headings p-10 rounded-lg w-72">
                <i class="fa-solid fa-list fa-5x"></i><br><br>
                <router-link to="/categories">
                    <h2 class="font-headings text-xl">Kategorier</h2>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
i{
    color:#1e004e;
}
</style>