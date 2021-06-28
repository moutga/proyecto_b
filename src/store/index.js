import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		usuarios: [
			{
				nombre: 'Admin',
				contrasena: '1234',
				rol: 'admin',
				id: 'abcde123456'
			},
			{
				nombre: 'gabriel',
				contrasena: '1234',
				rol: 'user',
				id: '484uopaasdf'
			},
			{
				nombre: 'alejandro',
				contrasena: '1234',
				rol: 'user',
				id: 'a4651aega'
			}
		],
		sesionActual: {
			usuario: '',
			rol: ''
		}
  },
  mutations: {
	//   verificar: function(state,{usuario,pass}){

	//   }
  },
  actions: {
  },
  modules: {
  }
})
