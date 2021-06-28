<template>
<div>
	<v-form @submit.prevent="submit" class="w-75 mx-auto " ref="form" >
		<v-sheet class="pa-2 text-center mb-4" color="white" elevation="1"  >Iniciar sesión</v-sheet>
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
			reglas: [
				//v => !!v || 'Dato obligatorio',
				function(x){
					return !!x || 'Dato obligatorio'
				}
			],
			peticion: {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {}
			}
		}
	},
	props: {},
	methods: {
		submit: function submit() {
			if(this.$refs.form.validate()){
				//https://my-json-server.typicode.com/moutga/test/
				console.log(this.usuario, this.contrasena);
				this.peticion.data.nombre = this.usuario;
				this.peticion.data.contrasena = this.contrasena;

				console.log(this.peticion);

				fetch('https://my-json-server.typicode.com/moutga/test/usuarios',this.peticion)
				.then(function(response){
					console.log(response.ok);
					return response.json();
				})
				.then(function(response){

					console.log(response);

				})

			}
		}
	},
	computed: {}
}
</script>

<style scoped>

</style>