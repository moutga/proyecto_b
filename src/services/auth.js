import md5 from "@/funciones/md5.js";

class Auth {

	getUsuarios() {

		const promesa = new Promise(function(resolve,reject){

			// Simulo un tiempo de espera
			setTimeout(() => {
				
				// Leo los usuarios desde el localStorage
				let usuarios = JSON.parse(localStorage.getItem('usuarios'));
				
				if(usuarios){
					
					// De los usuarios recolectados elimino campo contrasena
					usuarios = usuarios.map(function(u){
						delete u.contrasena;
						return u;
					});

					// Se resuelve si se obuvieron usuarios
					resolve(usuarios);	
					
				} else {
					reject();
				}	
				
			}, 1200);
	
		});
		
		return promesa;

	}
 
	login(usuario, pass) {
		let elUser;
		
		const promesa = new Promise(function(resolve,reject){
		
			let usuarios = JSON.parse(localStorage.getItem('usuarios'));
			if(usuarios){
			
				elUser = usuarios.find(function(u){
					return (u.usuario.toLowerCase() == usuario) && (u.contrasena == pass);
				});
				
				if(elUser){
					delete elUser.contrasena
					
					resolve(elUser);
				
				} else {
					reject('Usuario o contraseña inválida')
				}
				
			} else {
			
				reject('No se encontraron usuarios registrados')
				
			}
		
		});
		
		return promesa;
	
	}
 
	guardar(usuData){
		
		// Inicio y verifico variables
		let userExiste = false;
		let rolCorrecto = (usuData.rol == 'USUARIO' || usuData.rol == 'ADMINISTRADOR')? true : false;
		let todosDatos = (usuData.nombre && usuData.usuario && usuData.rol && usuData.contrasena)? true : false;
		
		const promesa = new Promise(function(resolve,reject){
		
			// Lanzo error si hubo verificaciones erroneas
			if(!rolCorrecto){
				reject('Rol incorrecto');
				return
			}
			if(!todosDatos){
				reject('Faltan datos para crear la cuenta');
				return
			}
			
			// Paso nombre de usuario a minúsculas para validación
			let nuevoNombreUsuario = usuData.usuario.toLowerCase();
			
			let nuevoUsuario = {};
			let usuarios = [];
			// Recupero usuarios de localStorage y trabajo si se obtuvieron
			usuarios = JSON.parse(localStorage.getItem('usuarios'));
			if(usuarios){
				
				// Chequeo nombre de usuario ya existente
				userExiste = usuarios.find(function(u){
					return (u.usuario == nuevoNombreUsuario);
				});
				if(userExiste){
					reject('Ese nombre de usuario no está disponible');
					return
				}
				
				// Creo el nuevo usuario con parámetros
				nuevoUsuario = {
					id: usuarios[usuarios.length-1].id + 1,
					nombre: usuData.nombre,
					usuario: nuevoNombreUsuario,
					rol: usuData.rol,
					contrasena: md5(usuData.contrasena)
				}
			
			// Creo el primer usuario si no existían previos
			} else {
				
				usuarios = [];
				
				// Creo el nuevo usuario con parámetros
				nuevoUsuario = {
					id: 1,
					nombre: usuData.nombre,
					usuario: nuevoNombreUsuario,
					rol: usuData.rol,
					contrasena: md5(usuData.contrasena)
				}
				
			}
			
			// Agrego nuevo usuario a la lista y la guardo en localStorage
			usuarios = [...usuarios,nuevoUsuario];
			localStorage.setItem('usuarios',JSON.stringify(usuarios));
			
			// Quito contraseña al nuevo usuario y lo retorno
			delete nuevoUsuario.contrasena;
			resolve(nuevoUsuario);
		
		});
			
		return promesa;
	
	}
 
	actualizar(usuData){

		// Inicio de variables
		let rolCorrecto = (usuData.rol == 'USUARIO' || usuData.rol == 'ADMINISTRADOR')? true : false;
		let hayId = (usuData.id)? true : false;
		let idValido = false;
		let rolValido = false;
		let indexUsuario = null;
		
		return new Promise(function(resolve,reject){
		
			// Verifico condiciones y comunico error si no se cumplen
			if(!hayId){ reject('Hace falta ID de usuario'); return; }
			if(!rolCorrecto){ reject('Rol incorrecto'); return; }
		
			// Recupero lista de usuarios y trabajo si existe
			let usuarios = JSON.parse(localStorage.getItem('usuarios'));
			if(usuarios){
			
				// Verificación de id válido o error
				idValido = usuarios.find(function(u){
					return (u.id == usuData.id);	
				});
				if(!idValido){ reject('La ID no corresponde a un usuario'); return; }
				
				// Verificación de rol válido para esa id o error
				rolValido = usuarios.find(function(u){
					return (u.id == usuData.id && u.rol == usuData.rol);
				});
				if(!rolValido){ reject('El rol no corresponde a ul usuario'); return; }
				
				// Obtengo índice del usuario que voy a trabajar
				indexUsuario = usuarios.findIndex(function(u,i){
					return (u.id == usuData.id);
				});
				
				// Actualizo los valores del usuario que voy a trabajar directo sobre
				// la lista vía el índice y loa argumentos
				(usuData.nombre)? (usuarios[indexUsuario].nombre = usuData.nombre):false;
				(usuData.contrasena)? (usuarios[indexUsuario].contrasena = md5(usuData.contrasena)):false;
				
				// Actualizao localStorage
				localStorage.setItem('usuarios',JSON.stringify(usuarios));
				
				// Obtengo usuario con datos actualizados y retiro contraseña
				let usuarioActualizado = usuarios[indexUsuario];
				delete usuarioActualizado.contrasena;
				
				resolve(usuarioActualizado);
			
			} else {
				reject('No hay usuarios');
				return;
			}
		
		});
	
	}
	
	// borrar(id){ }
 
	// getPorId(id) {}
 
	// getPerfil() {}
 }
 
 export default new Auth() 