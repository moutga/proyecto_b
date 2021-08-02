class Api {

	getTodosContactos() {

		return new Promise(function (resolve, reject) {

			(async function () {
				const contactos = await JSON.parse(localStorage.getItem('contactos'));

				if (contactos) {
					resolve(contactos);
				} else {
					reject('No hay contactos')
				}

			})();

		});

	}
	//-----------------------------
	async filtrarContactos(valor) {
		const contactos = await self.getTodosContactos();

		//* Las claves donde buscar el dato
		let keys = ['nombre', 'domicilio'];
		let keysCompuestas = ['emails.email', 'telefonos.telefono'];

		return new Promise(function (resolve, reject) {

			//* Un filtro a la lista de contactos
			let filtrado = contactos.filter(function (c) { //contacto
				let b = [];

				//* Busco para todas las keys de cada contacto la coincidencia
				//* con el valor de búsqueda y lo meto en el array b[]
				keys.forEach(function (k) {

					if (k && c[k].toLowerCase().includes(valor.toLowerCase())) {
						b.push(c);
					}

				});

				//* Busco para todas las keys compuestas de cada contacto la coincidencia
				keysCompuestas.forEach(function (k) { //emails.email

					let key = k.split('.')[0]; //emails
					let subKey = k.split('.')[1]; //email

					c[key].forEach(function (kk) { //contacto.emails

						if (kk[subKey].toLowerCase().includes(valor.toLowerCase())) { //contacto.emails.email
							b.push(c)
						}

					});

				})

				//* Retorno los items del array b[] que incluyan el
				//* contacto actual filtrado
				return (b.includes(c)) ? c : false;

			});

			if (filtrado.length > 0) {
				resolve(filtrado);
			} else {
				reject('Sin resultados')
			}

		});

	}
	//-----------------------------
	async guardar(nuevo) {

		//* Verifico info básica
		let nombre = nuevo.nombre || false;
		let email = nuevo.emails || false;
		let telefono = nuevo.telefonos || false;

		let contactos = await this.getTodosContactos() || [];

		return new Promise( function(resolve,reject){

			//* rejects para casos de información incompleta
			if(!nombre){ reject('El nombre es obligatorio'); return; }
			if(!email && !telefono){ reject('El contacto debe tener un email o un teléfono'); return; }
			if(!email[0].email && !telefono[0].telefono){ reject('El contacto debe tener un email o un teléfono'); return; }

			nuevo.id = contactos[contactos.length - 1].id + 1;

			(telefono)? nuevo.telefonos[0].id = 1 : false;
			(email)? nuevo.emails[0].id = 1 : false;

			contactos = [...contactos,nuevo];
			localStorage.setItem('contactos',JSON.stringify(contactos));

			resolve(nuevo)
			console.log(contactos);

		});

	}
	//-----------------------------
	async actualizar(conData){

		//* Inicio de variables
		let idxContacto = null;

		let contactos = await this.getTodosContactos();

		return new Promise(function(resolve,reject){

			if(!contactos){ reject('No hay contactos'); return; }

			idxContacto = contactos.findIndex(function(c){
				return c.id === conData.id;
			});

			if(!idxContacto){ reject('La ID no corresponde a un contacto'); return; }

			//* Cambiar la info sobre el contacto de la lista
			(conData.nombre) ? (contactos[idxContacto].nombre = conData.nombre) : false;
			(conData.domicilio) ? (contactos[idxContacto].domicilio = conData.domicilio) : false;
			(conData.etiquetas) ? (contactos[idxContacto].etiquetas = conData.etiquetas) : false;

			//* Verificar formato correcto de hora
			if(conData.fecha_nac){

				let isFecha = Date.parse(conData.fecha_nac);
				isFecha = new Date(isFecha);
				if (isFecha instanceof Date) {
					reject('Formato de fecha incorrecto');
				} else {
					contactos[idxContacto].fecha_nac = conData.fecha_nac
				}

			}

			//* Actualizar los parámetros compuestos
			//@ Teléfono entrada: [{telefono: '###', tipo: 'xxx'}]
			if(conData.telefonos){
				let listaTelefonos = contactos[idxContacto].telefonos || [];
				let newTelefonoId = listaTelefonos[ listaTelefonos.length - 1 ].id + 1;
				if(listaTelefonos.length - 1 < 0){ newTelefonoId = 1; }

				conData.telefonos.id = newTelefonoId;
				
				contactos[idxContacto].telefonos.push(conData.telefonos);
			}

			//@ Email entrada: [{email: '###', tipo: 'xxx'}]
			if(conData.emails){
				let listaEmails = contactos[idxContacto].emails || [];
				let newEmailId = listaEmails[ listaEmails.length - 1 ].id + 1;
				if(listaEmails.length - 1 < 0){ newEmailId = 1; }

				conData.emails.id = newEmailId;
				
				contactos[idxContacto].emails.push(conData.emails);
			}


			//* Actualizo localStorage
			localStorage.setItem('contactos', JSON.stringify(contactos));

			//* Obtengo usuario con datos actualizados y retiro contraseña
			let contactoActualizado = contactos[idxContacto];

			resolve(contactoActualizado);

		});

	}
	//-----------------------------
	async borrar(id) {

		let contactos = await this.getTodosContactos();

		return await new Promise(function (resolve, reject) {

			let existe = contactos.findIndex(function (c) {
				return c.id == id;
			});

			if (existe >= 0) {

				contactos.splice(existe, 1);
				localStorage.setItem('contactos', JSON.stringify(contactos));
				resolve('Contacto eliminado');

			} else {
				reject('La ID no corresponde a un contacto');
				return;
			}

		})

	}

}

export default new Api();