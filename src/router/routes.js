import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Home from "@/pages/Home.vue";
import Solver from "@/pages/Solver.vue";
import Upload from "@/pages/Upload.vue";
import Pruefungsplan from "@/pages/Pruefungsplan.vue";
import Pruefungsparameter from "@/pages/Prüfungsparameter.vue";

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
        path: "pruefungsparamter",
        name: "pruefungsparamter",
        component: Pruefungsparameter
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
