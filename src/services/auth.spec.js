//import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Auth from '@/services/auth.js'
import md5 from 'blueimp-md5';
import '@/localStorage.js'
//import Vuex from 'vuex'

describe("Testeo de métodos de Auth", function(){
  
    xit("Test de getUsuarios()", async function(){

		const usuarios = [
			{
				id: 1,
				nombre:"Administrador",
				usuario:"admin",
				contrasena:"1234",
				rol:"ADMINISTRADOR"
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

		if(p[0].id && p[0].nombre && p[0].usuario && p[0].rol){
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

	xit("Test de login()", async function(){

		const usuarios = [
			{
				id: 1,
				nombre:"Administrador",
				usuario:"admin",
				contrasena:"1234",
				rol:"ADMINISTRADOR"
			},
			{
				id: 1,
				nombre:"Gabriel",
				usuario:"gabriel",
				contrasena:"1234",
				rol:"USUARIO"
			}
		];
		localStorage.setItem('usuarios', JSON.stringify(usuarios));

		const nombre = 'Gabriel';
		const rol = 'USUARIO';
		const usuario = 'gabriel';
		const pass = '1234';

		const user = await Auth.login(usuario,pass);
		const promesa = Auth.login(usuario,pass);
		//console.log(user);
		
		let cumpleNombre = false;
		let cumpleRol = false;
		let esPromesa = false;
		let noContrasena = false;

		if(nombre == user.nombre){
			cumpleNombre = true;
		}
		if(rol == user.rol){
			cumpleRol = true;
		}
		if( promesa && Object.prototype.toString.call(promesa) === "[object Promise]" ){
			esPromesa = true;
		}
		if( !user.contrasena ){
			noContrasena = true;
		}

		//const x = true;
		//Análisis de lo que se espera
        expect(cumpleNombre && cumpleRol && esPromesa && noContrasena).toBe(true)

	});

	it("Test de guardar()", async function(){

		const usuarios = [
			{
				id: 1,
				nombre:"Administrador",
				usuario:"admin",
				contrasena:"1234",
				rol:"ADMINISTRADOR"
			},
			{
				id: 1,
				nombre:"Gabriel",
				usuario:"gabriel",
				contrasena:"1234",
				rol:"USUARIO"
			}
		];
		localStorage.setItem('usuarios', JSON.stringify(usuarios));

		const nombre = 'Gabriel';
		const rol = 'USUARIO';
		const usuario = 'gabriel';
		const pass = '1234';

		//const x = true;
		//Análisis de lo que se espera
        expect(x).toBe(true)
	})

});