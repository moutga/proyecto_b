import md5 from "@/funciones/md5.js";

class Auth {

	getUsuarios() {

		const promesa = new Promise(function (resolve, reject) {

			setTimeout(() => {

				let usuarios = JSON.parse(localStorage.getItem('usuarios'));

				if (usuarios) {

					usuarios = usuarios.map(function (u) {
						delete u.contrasena
						return u
					});
					resolve(usuarios);

				} else {
					reject('No hay usuarios registrados')
				}

			}, 2000);

		})

		return promesa

	}

	login(usuario, pass) {
		let elUser;

		const promesa = new Promise(function (resolve, reject) {

			// no puedo usar getUsuarios() porque no devuelve contraseña
			let usuarios = JSON.parse(localStorage.getItem('usuarios'));
			if (usuarios) {

				elUser = usuarios.find(function (u) {
					return (u.usuario.toLowerCase() == usuario) && (u.contrasena == md5(pass));
				});

				if (elUser) {
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

	guardar(usuData) {

		let userExiste = false;
		let rolCorrecto = (usuData.rol == 'USUARIO' || usuData.rol == 'ADMINISTRADOR') ? true : false;
		let todosDatos = (usuData.nombre && usuData.usuario && usuData.rol && usuData.contrasena) ? true : false;
		//console.log(rolCorrecto);

		const promesa = new Promise(function (resolve, reject) {

			if (!rolCorrecto) {
				reject('Rol incorrecto');
				return
			}
			if (!todosDatos) {
				reject('Faltan datos para crear la cuenta');
				return
			}

			let nuevoNombreUsuario = usuData.usuario.toLowerCase();

			let nuevoUsuario = {};
			let usuarios = [];

			usuarios = JSON.parse(localStorage.getItem('usuarios'));
			//usuarios = Auth.getUsuarios();

			if (usuarios) {

				userExiste = usuarios.find(function (u) {
					return (u.usuario == nuevoNombreUsuario);
				});
				if (userExiste) {
					reject('Ese nombre de usuario no está disponible');
					return
				}

				nuevoUsuario = {
					id: usuarios[usuarios.length - 1].id + 1,
					nombre: usuData.nombre,
					usuario: nuevoNombreUsuario,
					rol: usuData.rol,
					contrasena: md5(usuData.contrasena)
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

			usuarios = [...usuarios, nuevoUsuario];
			localStorage.setItem('usuarios', JSON.stringify(usuarios));

			delete nuevoUsuario.contrasena;
			resolve(nuevoUsuario);

		});

		return promesa;

	}

	actualizar(usuData) {

		// Inicio de variables
		let rolCorrecto = (usuData.rol == 'USUARIO' || usuData.rol == 'ADMINISTRADOR') ? true : false;
		let hayId = (usuData.id) ? true : false;
		let idValido = false;
		let indexUsuario = null;

		// anónima y asíncrona para poder usar await getUsuarios()
		return new Promise(function (resolve, reject) {

			// Verifico condiciones y comunico error si no se cumplen
			if (!hayId) { reject('Hace falta ID de usuario'); return; }
			if (usuData.rol && !rolCorrecto) { reject('Rol incorrecto'); return; }

			// Recupero lista de usuarios y trabajo si existe
			// no puedo usar getUsuarios() porque no devuelve contraseña
			let usuarios = JSON.parse(localStorage.getItem('usuarios'));

			if (usuarios) {

				// Verificación de id válido o error
				idValido = usuarios.find(function (u) {
					return (u.id == usuData.id);
				});
				if (!idValido) { reject('La ID no corresponde a un usuario'); return; }

				// Obtengo índice del usuario que voy a trabajar
				indexUsuario = usuarios.findIndex(function (u) {
					return (u.id == usuData.id);
				});

				// Actualizo los valores del usuario que voy a trabajar directo sobre
				// la lista vía el índice y loa argumentos
				(usuData.usuario) ? (usuarios[indexUsuario].usuario = usuData.usuario) : false;
				(usuData.rol) ? (usuarios[indexUsuario].rol = usuData.rol) : false;
				(usuData.nombre) ? (usuarios[indexUsuario].nombre = usuData.nombre) : false;
				(usuData.contrasena) ? (usuarios[indexUsuario].contrasena = md5(usuData.contrasena)) : false;

				// Actualizao localStorage
				localStorage.setItem('usuarios', JSON.stringify(usuarios));

				// Obtengo usuario con datos actualizados y retiro contraseña
				let usuarioActualizado = usuarios[indexUsuario];
				delete usuarioActualizado.contrasena;

				resolve(usuarioActualizado);

			} else {
				reject('No hay usuarios registrados');
				return;
			}

		});

	}

	borrar(id) {

		let existe = -1;
		let usuarios;

		// anónima y asíncrona para poder usar await getUsuarios()
		return new Promise(async function (resolve, reject) {

			// usa getUsuarios para levantar la lista
			usuarios = await this.getUsuarios();

			existe = usuarios.findIndex(function (u) {
				return u.id == id;
			});

			if (existe >= 0) {

				usuarios.splice(existe, 1);
				localStorage.setItem('usuarios', JSON.stringify(usuarios));
				resolve('Usuario eliminado');

			} else {
				reject('La ID no corresponde a un usuario registrado');
				return;
			}

		});

	}

	getPorId(id) {

		let existe = -1;
		let usuarios;

		// anónima y asíncrona para poder usar await getUsuarios()
		return new Promise(async function (resolve, reject) {

			usuarios = await getUsuarios();

			let existe = usuarios.findIndex(function (u) {
				return u.id == id;
			});

			if (existe >= 0) {

				let elUser = usuarios[existe];
				delete elUser.contrasena;

				resolve(elUser);

			} else {
				reject('Usuario no encontrado');
				return;
			}

		});

	}

	// getPerfil() {}
}

export default new Auth();
