<!--/*
 * @Author: Emma Forslund - emfo2102 
 * @Date: 2022-10-24 16:40:13 
 */
-->

<template>
    <!--Koll om användaren är på login-sidan -->
    <div v-if="$route.name !== 'login'">
        <footer class="bg-white mt-11 shadow-md border-solid border-2 border-light-pink text-center">
            <div class="flex flex-row text-dark-color justify-center">
                <p class="text-dark font-content">DT193G - Emma Forslund - emfo2102@student.miun.se</p>
            </div>
        </footer>
    </div>
</template>

<script>
</script>

<style scoped>
footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0.5rem;
}
</style>