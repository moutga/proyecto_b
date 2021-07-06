import md5 from "blueimp-md5";

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
	
		let userExiste = false;
		let rolCorrecto = (usuData.rol == 'USUARIO' || usuData.rol == 'ADMINISTRADOR')? true : false;
		let todosDatos = (usuData.nombre && usuData.usuario && usuData.rol && usuData.contrasena)? true : false;
		//console.log(rolCorrecto);
		
		const promesa = new Promise(function(resolve,reject){
		
			if(!rolCorrecto){
				reject('Rol incorrecto');
				return
			}
			if(!todosDatos){
				reject('Faltan datos para crear la cuenta');
				return
			}
			
			let nuevoNombreUsuario = usuData.usuario.toLowerCase();
			
			let nuevoUsuario = {};
			let usuarios = [];
			usuarios = JSON.parse(localStorage.getItem('usuarios'));
			if(usuarios){
			
				userExiste = usuarios.find(function(u){
					return (u.usuario == nuevoNombreUsuario);
				});
				if(userExiste){
					reject('Ese nombre de usuario no está disponible');
					return
				}
				
				nuevoUsuario = {
					id: usuarios[usuarios.length-1].id + 1,
					nombre: usuData.nombre,
					usuario: nuevoNombreUsuario,
					rol: usuData.rol,
					contrasena: md5(usuData.rol)
				}
			
			} else {
				
				usuarios = [];
				
				nuevoUsuario = {
					id: 1,
					nombre: usuData.nombre,
					usuario: nuevoNombreUsuario,
					rol: usuData.rol,
					contrasena: md5(usuData.contrasena)
				}
				
			}
				
			usuarios = [...usuarios,nuevoUsuario];
			localStorage.setItem('usuarios',JSON.stringify(usuarios));
			
			delete nuevoUsuario.contrasena;
			resolve(nuevoUsuario);
		
		});
			
		return promesa;
	
	}
 
	// actualizar(usuData) {   }
	
	// borrar(id){ }
 
	// getPorId(id) {}
 
	// getPerfil() {}
 }
 
 export default new Auth() 