import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Categories from "../views/CategoryView.vue";
import Products from "../views/ProductView.vue";
import SingleProduct from "../views/SingleProductView.vue";
import AddProduct from "../views/AddProductView.vue";
import SingleCategory from "../views/SingleCategoryView.vue";
import AddCategory from "../views/AddCategoryView.vue";
import SearchView from "../views/SearchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/categories",
      name: "categories",
      component: Categories,
    },
    {
      path: "/products",
      name: "products",
      component: Products,
    },
    {
      path: '/product/:id',
      name: 'singleproduct',
      component: SingleProduct,
      props: true
    },
    {
      path: "/addproduct",
      name: "addproduct",
      component: AddProduct,
    },
    {
      path: '/category/:id',
      name: 'singlecategory',
      component: SingleCategory,
      props: true
    },
    {
      path: "/addcategory",
      name: "addcategory",
      component: AddCategory
    },
    {
      path: '/result/:name',
      name: 'search',
      component: SearchView,
      props: true
    },
  ],
});

export default router;
