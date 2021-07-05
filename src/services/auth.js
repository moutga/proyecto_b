class Auth {

	getUsuarios() {

		const promesa = new Promise(function(resolve,reject){

			//setTimeout(() => {
				
				let usuarios = JSON.parse(localStorage.getItem('usuarios'));
				
				if(usuarios){
				
					usuarios = usuarios.map(function(u){
						delete u.contrasena;
						return u;
					});
					resolve(usuarios);	
					
				} else {
					reject();
				}	
				
			//}, 2000);
	
		});
		
		return promesa;

	}
 
	// login(usuario, pass) {   }
 
	// guardar(usuData) {   }
 
	// actualizar(usuData) {   }
	
	// borrar(id){ }
 
	// getPorId(id) {}
 
	// getPerfil() {}
 }
 
 export default new Auth() 