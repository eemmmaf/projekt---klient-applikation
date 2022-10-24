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
    <div class="pagecontainer">
        <div class="wrapper">
            <Header />
            <Aside />
            <main>
                <RouterView />
            </main>
        </div>
        <Footer />
    </div>
</template>

<script>

</script>

<style scoped>
.pagecontainer {
    position: relative;
    min-height: 100vh;
}

.wrapper{
    padding-bottom: 4rem; 
}
</style>
