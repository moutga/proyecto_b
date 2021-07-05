//import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Auth from '@/services/auth.js'
import '@/localStorage.js'
//import Vuex from 'vuex'

describe("Testeo de métodos de Auth", function(){
  
    it("Test de getUsuarios", async function(){

		const usuarios = [
			{
				id: 1,
				nombre:"Administrador",
				usuario:"admin",
				contrasena:"1234",
				rol:"ADMINISTRADOR",
				token: "asdf654a31sdfa64dfa3sdf121"
			}
		];
		localStorage.setItem('usuarios', JSON.stringify(usuarios));

		const p = await Auth.getUsuarios();
		const promesa = Auth.getUsuarios();
		//console.log(p);
		let retornaArray = Array.isArray(p);
		let camposOk = false;
		let noContrasena = false;
		let esPromesa = false;

		if(p[0].id && p[0].nombre && p[0].usuario && p[0].rol && p[0].token){
			camposOk = true;
		}

		if( !p[0].contrasena ){
			noContrasena = true;
		}

		if( promesa && Object.prototype.toString.call(promesa) === "[object Promise]" ){
			esPromesa = true;
		}

		//console.log(esPromesa);
		// Cumple todos los requsitos
		const cumple = retornaArray && camposOk && noContrasena && esPromesa;
		//console.log(cumple);

		//const x = true;
		//Análisis de lo que se espera
        expect(cumple).toBe(true)

    });

});