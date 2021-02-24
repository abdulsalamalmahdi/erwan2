import Vue from "vue";
import Router from 'vue-router';
// import AlbumForm from '../components/AlbumForm';
// import AlbumList from "../components/AlbumsList";
import Home from "../components/Home";
import store from '../components/store/Store'

Vue.use(Router);

console.log(store)
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/admin/album_add",
      name: "AlbumList",
      component: () => import(/*webpackChunkName: "AlbumList" */ "../components/AlbumsList"),
      // meta: { requireAuth: true }
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },

    {
      path: "/album/:category/:_id",
      name: "Album",
      component: () => import(/*webpackChunkName: "AlbumList" */ "../components/Album"),
    },

    {
      path: "/admin/album/:category/:_id",
      name: "AlbumForm",
      component: () => import(/*webpackChunkName: "AlbumForm" */ "../components/AlbumForm"),
        meta: { requireAuth: true }
    },
    // {
    //   path: "/album/:category/:_id",
    //   name: "AlbumForm",
    //   component: () => import(/*webpackChunkName: "AlbumForm" */ "../components/AlbumForm"),
    //   meta: { requireAuth: true }
    // },
    {
      path: "/bio",
      name: "Biographie",
      component: () => import(/*webpackChunkName: "AlbumForm" */ "../components/Biographie"),
      // meta: { requireAuth: true }
    },
    {
      path: "/text",
      name: "Text",
      component: () => import(/*webpackChunkName: "AlbumForm" */ "../components/Text"),
      // meta: { requireAuth: true }
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import(/*webpackChunkName: "AlbumForm" */ "../components/Contact"),
      // meta: { requireAuth: true }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import(/*webpackChunkName: "AlbumForm" */ "../components/Auth/Login"),
      // meta: { requireAuth: true }
    },
    
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.loggedIn) {
      next()
     
    }else{
       store.dispatch("logIn_action", { login: true });
     next('/login')
    }
  }
  else {
    next()
  }

})

export default router;