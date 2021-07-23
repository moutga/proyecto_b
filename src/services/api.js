class Api {
	self = this;

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
	guardar(){}
	//-----------------------------
	actualizar(){}
	//-----------------------------
	borrar(){}

}

export default new Api();