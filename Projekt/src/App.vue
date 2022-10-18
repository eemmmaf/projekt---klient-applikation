<script>
import { RouterLink, RouterView } from "vue-router";
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


export default {
    components: {
        Header,
        RouterView,
        Footer
    }
}

</script>

<template>

    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>

<script>
</script>

<style scoped>

</style>
