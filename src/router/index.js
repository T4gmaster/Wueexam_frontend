import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Upload from "../views/Upload.vue";
import Test from "../views/Test.vue";
import Prüfungsansicht from "../views/Prüfungsansicht.vue";
import Topbar from "../views/Topbar.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  },
  {
    path: "/pruefungsansicht",
    name: "Prüfungsansicht",
    component: Prüfungsansicht
  },
  {
    path: "/topbar",
    name: "Topbar",
    component: Topbar
  },
  // folgende Komponente wird asynchron importiert und somit im Hintergrund geladen -> mit Kommentar in 'component' Zeile kann chunk-name festgelegt werden
  {
    path: "/result",
    name: "Result",
    component: () => import("../views/WueExamResult.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
