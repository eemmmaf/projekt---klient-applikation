import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Categories from "../views/CategoryView.vue";
import Products from "../views/ProductView.vue";
import SingleProduct from "../views/SingleProductView.vue";
import AddProduct from "../views/AddProductView.vue";
import SingleCategory from "../views/SingleCategoryView.vue";
import AddCategory from "../views/AddCategoryView.vue";
import Login from "../views/LoginView.vue";
import AddUser from "../views/AddUserView.vue";
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next()
        } else {
          next('/login');
        }
      }
    },
    {
      path: "/categories",
      name: "categories",
      component: Categories,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next()
        } else {
          next('/login');
        }
      }
    },
    {
      path: "/products",
      name: "products",
      component: Products,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next()
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/product/:id',
      name: 'singleproduct',
      component: SingleProduct,
      props: true,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: "/addproduct",
      name: "addproduct",
      component: AddProduct,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next()
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/category/:id',
      name: 'singlecategory',
      component: SingleCategory,
      props: true,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next()
        } else {
          next('/login');
        }
      }
    },
    {
      path: "/addcategory",
      name: "addcategory",
      component: AddCategory,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next()
        } else {
          next('/login');
        }
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/adduser",
      name: "adduser",
      component: AddUser,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next()
        } else {
          next('/login');
        }
      }
    },
    {
      //404 - Not found-sida
      path: '/:catchAll(.*)',
      name: 'Not found',
      component: NotFound,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next()
        } else {
          next('/login');
        }
      }

    }
  ],
});

export default router;
