<script>
import { RouterLink, RouterView } from "vue-router";
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Aside from './components/Aside.vue';


export default {
    components: {
        Header,
        RouterView,
        Footer,
        Aside
    }
}

</script>

<template>
        <Header />
        <Aside />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>

<script>

</script>

<style scoped>

</style>
