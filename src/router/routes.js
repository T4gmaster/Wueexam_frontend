import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Home from "@/pages/Home.vue";
import Solver from "@/pages/Solver.vue";
import Upload from "@/pages/Upload.vue";
import Pruefungsplan from "@/pages/Pruefungsplan.vue";
import Pruefungszeitraum from "@/pages/Prüfungszeitraum.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Räume from "@/pages/Räume.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: Home
      },
      {
        path: "pruefungsplan",
        name: "pruefungsplan",
        component: Pruefungsplan
      },
      {
        path: "solver",
        name: "solver",
        component: Solver
      },
      {
        path: "upload",
        name: "upload",
        component: Upload
      },
      {
        path: "pruefungszeitraum",
        name: "pruefungszeitraum",
        component: Pruefungszeitraum
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "raeume",
        name: "raeume",
        component: Räume
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
