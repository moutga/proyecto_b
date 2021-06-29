<template>
<div>

	<v-form @submit.prevent="miSubmit" class="w-75 mx-auto " ref="form" >

		<v-sheet class="pa-2 text-center mb-4" color="white" elevation="1"  >Iniciar sesión</v-sheet>

		<v-alert dense outlined type="error" v-if="error">
		Inicio de sesión incorrecto
		</v-alert>

		<v-progress-linear v-if="buscando" color="blue" indeterminate rounded height="6" ></v-progress-linear>

		<v-text-field v-model="usuario" :rules="reglas" name="usuario" label="Usuario" prepend-inner-icon="mdi-account"></v-text-field>
		<v-text-field v-model="contrasena" ref="contrasena" :rules="reglas" name="contraseña" label="Contraseña" type="password" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
		<v-btn  class="my-4 blue" type="submit"  >Ingresar</v-btn>
	</v-form>

</div>
</template>

<script>
export default {
	name: 'Login',
	data:function(){
		return {
			usuario: '',
			contrasena: '',
			error: false,
			buscando: false,
			reglas: [
				//v => !!v || 'Dato obligatorio',
				function(x){
					return !!x || 'Dato obligatorio'
				}
			]	
		}
	},
	props: {},
	methods: {
		miSubmit: async function() {
			if(this.$refs.form.validate()){
				//https://my-json-server.typicode.com/moutga/test/
				//console.log(this.usuario, this.contrasena);
				let filtrado;

				let peticion = {
					method: 'get',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {}
				};

				// Guardo local de la función usuario y contraseña para usar en el filtro
				// en la peticion guardo para enviarla por POST si fuera autenticacion real
				let u = peticion.data.nombre = this.usuario;
				let c = peticion.data.contrasena = this.contrasena;

				//console.log(peticion);

				//console.log('inicio');
				this.buscando = true;

				await fetch('https://my-json-server.typicode.com/moutga/test/usuarios',peticion)
				.then(function(response){
					//console.log(response.ok);
					return response.json();
				})
				.then(function(response){

					//console.log(response);

					// Filtro en la lista de usuarios obtenida por el que coincida con usuario y contraseña
					filtrado = response.filter(user => {
						return user.nombre === u && user.contrasena === c;
                    });

				});

				//console.log('termino');

				// Acciones si encuentra o no un usuario con las credenciales ingresadas
				if(filtrado[0]){

					//console.log(filtrado[0]);
					this.error = false;

					// Guardo info en local
					localStorage.setItem('agendaUsuario',filtrado[0].nombre);
					localStorage.setItem('agendaToken',filtrado[0].token);

					this.$router.go();

				} else {
					this.error = true;
				}
				
				this.buscando = false;				

			}
		}
	},
	computed: {}
}
</script>

<style scoped>

</style>