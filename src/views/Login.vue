<template>
<div>

	<v-sheet class="pa-1 text-center mb-4 mx-auto max-w-300" color="white" elevation="1">
		
	<v-form @submit.prevent="miSubmit" class="w-75 mx-auto " ref="form" v-if="!isLogueado" >

		<v-sheet class="pa-2 text-center mb-4" color="white" elevation="1"  >Iniciar sesión</v-sheet>

		<v-alert dense outlined type="error" v-if="error">
		Inicio de sesión incorrecto
		</v-alert>

		<v-progress-linear v-if="buscando" color="blue" indeterminate rounded height="6" ></v-progress-linear>

		<!-- //* Campos -->
		<v-text-field v-model="usuario" :rules="reglas" name="usuario" label="Usuario" prepend-inner-icon="mdi-account"></v-text-field>
		<v-text-field v-model="contrasena" ref="contrasena" :rules="reglas" name="contraseña" label="Contraseña" type="password" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>

		<!-- //* Botón -->
		<v-btn  class="my-4 primary" type="submit"  >Ingresar</v-btn>

	</v-form>
	
	<v-container v-else >

		<v-alert dense outlined type="success">
		Bienvenido <strong>{{usuarioLogueado.nombre}}</strong>
		</v-alert>

		<router-link :to="{ name: 'Perfil' }">
			<v-btn  class="my-4 primary" type="submit"  >Perfil</v-btn>
		</router-link>

	</v-container>

	</v-sheet>

</div>
</template>

<script>
import Auth from "@/services/auth.js";
import { mapGetters } from 'vuex'

export default {
	name: 'Login',
	data:function(){
		return {
			usuario: '',
			contrasena: '',
			usuarioLogueado: {},
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
	computed: {
		...mapGetters(['getSesion']),

		isLogueado: function(){
			return (this.$store.state.sesion.id)? true : false;
		}
	},
	methods: {
		miSubmit: async function() {
			if(this.$refs.form.validate()){

				this.buscando = true;

				try{

					this.usuarioLogueado = await Auth.login(this.usuario,this.contrasena);
					this.buscando = false;

					//* Manejo de Store:
					//* commit para llamar a una Mutation
					//* y lectura directa de state y via getters
					this.$store.commit('setSesion',this.usuarioLogueado);
					// console.log(this.$store.state.sesion);
					// console.log(this.$store.getters.getSesion);

				} catch(e){
					this.error = true;
					this.buscando = false;
				}

			}
		}
	},
	mounted: async function(){

		try{

			this.usuarioLogueado = await Auth.getPerfil();
			console.log(this.usuarioLogueado);
			this.$store.commit('setSesion',this.usuarioLogueado);

		} catch(e){
			console.log(e);
			this.usuarioLogueado = {};
			this.$store.commit('setSesion',this.usuarioLogueado);
		}

	}
}
</script>