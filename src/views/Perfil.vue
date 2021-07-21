<template>
<div>

	<v-container class="">
	<v-form @submit.prevent="guardar" class="" ref="formulario">

		<!-- //* Campos de texto -->
		<v-text-field :rules="reglas" v-model="usuario.nombre" name="nombre" label="Nombre" prepend-inner-icon="mdi-account"></v-text-field>
		<v-text-field v-model="nuevaPass" name="contrasena" type="password" label="Contraseña" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
		<v-text-field :rules="reglaB" v-model="nuevaPassDos" name="contrasenaDos" type="password" label="Repetir Contraseña" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>

		<!-- //* Botones -->
		<v-btn class="my-4 primary" type="submit" >Guardar</v-btn>

		
	</v-form>
	</v-container>

	<v-dialog v-model="dialog" persistent max-width="310px" >
	<v-container>

		<v-card>
			<v-card-text>
				{{msgDialogo}}
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="dialog = false" >
					Ok
				</v-btn>
			</v-card-actions>
		</v-card>

	</v-container>
	</v-dialog>

</div>
</template>

<script>
import Auth from "@/services/auth.js";
// import { mapGetters } from 'vuex'

export default {
	name: 'Perfil',
	data: function(){return {
		usuario: {},
		nuevaPass: null,
		nuevaPassDos: null,
		reglas: [
			function(x){
				return !!x || 'Dato obligatorio'
			}
		],
		reglasContrasenaDos: [],
		msgDialogo: null,
		dialog: false
	};},
	props: {},
	computed: {
		reglaB: function(){

			let r = [];

			//* Si se ingresa una primera contraseña
			//* el segundo campo se vuelve obligatorio
			if(this.nuevaPass){
				r[0] = function (x){
					return !!x || 'Dato obligatorio'
				}
			}

			return r;

		}
	},
	methods: {
		guardar: async function(){
			if(this.$refs.formulario.validate()){

				if(this.nuevaPass != this.nuevaPassDos){
					this.msgDialogo = "Error: Las contraseñas no coinciden";
					this.dialog = true;
					return;
				} else {

					this.usuario.contrasena = this.nuevaPass;
					
					try{

						this.usuario = await Auth.actualizar(this.usuario);
						console.log(this.usuario);

						// let usuarioLogueado = await Auth.login(this.usuario.usuario,this.nuevaPass);
						this.$store.commit('setSesion',this.usuario);

					} catch(e){
						this.msgDialogo = "Error: " + e;
						this.dialog = true;
					}

				}

			}
		}
	},
	mounted: async function(){

		try {
			this.usuario = await Auth.getPerfil();
		} catch(e) {
			this.msgDialogo = "Error: " + e;
			this.dialog = true;
		}

	}
}
</script>

<style>

</style>