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
	actualizar(){}
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