import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Prüfungsansicht from "../views/Prüfungsansicht.vue";
import Upload from "../views/Upload.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/pruefungsansicht",
    name: "Prüfungsansicht",
    component: Prüfungsansicht
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
