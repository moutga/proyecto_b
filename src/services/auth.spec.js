//import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Auth from '@/services/auth.js'
import md5 from "@/funciones/md5.js";
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

		// Vaciar localStorage antes de comenzar
		localStorage.clear();

		const usuarios = [
			{
				id: 1,
				nombre:"Administrador",
				usuario:"admin",
				contrasena:"1234",
				rol:"ADMINISTRADOR"
			},
			{
				id: 2,
				nombre:"Gabriel",
				usuario:"gabriel",
				contrasena:"1234",
				rol:"USUARIO"
			}
		];
		localStorage.setItem('usuarios', JSON.stringify(usuarios));

		const nuevoUsuarioRepetido = {
			usuario: 'gabriel',
			nombre: 'Paco',
			contrasena: '465465',
			rol: 'USUARIO'
		};
		
		const nuevoUsuarioRolMal = {
			usuario: 'minino',
			nombre: 'Paco',
			contrasena: '465465',
			rol: 'USER'
		};
		
		const nuevoUsuarioIncompleto = {
			usuario: 'pollito',
			nombre: 'Paco',
			contrasena: '465465',
		};
		
		const contrasena = '465465';
		const nuevoUsuarioBien = {
			usuario: 'pikachu',
			nombre: 'Alfredo',
			contrasena: contrasena,
			rol: 'ADMINISTRADOR'
		};

		const nuevoUser = await Auth.guardar(nuevoUsuarioBien);
		const todosUsuarios = JSON.parse(localStorage.getItem('usuarios'));

		// console.log(JSON.stringify(todosUsuarios[todosUsuarios.length - 1]));
		// console.log(md5(contrasena));

		let contrasenaMd5 = (md5(contrasena) == todosUsuarios[todosUsuarios.length - 1].contrasena)? true: false;
		// console.log(contrasenaMd5);
		

		let nombreDisponible = true;
		let rolBien = true;
		let datosCompletos = true;

		try{
			await Auth.guardar(nuevoUsuarioRepetido);
		} catch(e){
			nombreDisponible = false;
		}

		try{
			await Auth.guardar(nuevoUsuarioRolMal);
		} catch(e){
			rolBien = false;
		}

		try{
			await Auth.guardar(nuevoUsuarioIncompleto);
		} catch(e){
			datosCompletos = false;
		}

		let cumpleTodo = !nombreDisponible && !rolBien && !datosCompletos && contrasenaMd5;
		//const x = true;
		//Análisis de lo que se espera
        expect(cumpleTodo).toBe(true)
	})

});