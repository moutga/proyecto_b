import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		sesion: {
			id: "",
			nombre: "",
			usuario: "",
			rol: ""
		},
	},
	mutations: {
		setSesion: function(state, usuario) {
			state.sesion.id = usuario.id;
			state.sesion.nombre = usuario.nombre;
			state.sesion.usuario = usuario.usuario;
			state.sesion.rol = usuario.rol;
		},
	},
	getters: {
		getSesion: function(state){
			return state.sesion
		}
	},
	actions: {},
	modules: {},
});
