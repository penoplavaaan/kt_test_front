import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/products",
      name: "products",
      component: () => import("./components/ProductsList")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial")
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("./components/ShowStatistics.vue")
    }
  ]
});
