import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";


const routes = [
  {
    path: "/index",
    name: "Škole",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tabela",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },

];
export default routes;
