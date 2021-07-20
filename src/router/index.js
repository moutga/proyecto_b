import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import vistaAgenda from "../views/vistaAgenda.vue";
import Login from "../views/Login.vue";
import UsuariosList from "../views/UsuariosList.vue";
import UsuarioEdit from "../views/UsuarioEdit.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/usuarios",
		name: "Usuarios",
		component: UsuariosList
	},
	//* ruta/parametro, qué componente forma la vista y nombre de la vista para invocarla
	{ path: '/usuarios/:id', component: UsuarioEdit, name: 'usuario' },
	{
		path: "/agenda",
		name: "Agenda",
		component: vistaAgenda
	},
	{
		path: "/login",
		name: "Login",
		component: Login
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
