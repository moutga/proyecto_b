<template>
<div>

	<v-container class="mb-3">

		<!--//* Mensaje de error si la ID no coincide con la de un usuario existente -->
		<v-alert v-if="hayError" elevation="3" outlined type="error">Ese usuario no existe</v-alert>
		<!--//* Mensaje de error si la ID no coincide con la de un usuario existente -->
		<v-alert v-if="esNuevo" elevation="3" outlined type="info">Nuevo usuario</v-alert>
		<!--//* Mensaje de error si la ID no coincide con la de un usuario existente -->
		<v-alert v-if="(!esNuevo&&!hayError)" elevation="3" outlined type="info">Editando el usuario <span class="font-weight-bold">{{usuario.usuario}}</span></v-alert>

	</v-container>

	<v-container class="">
	<v-form @submit.prevent="guardar" class="" ref="formulario">

		<!-- //* Campos de texto -->
		<v-text-field :rules="reglas" v-model="usuario.usuario" name="usuario" label="Usuario" prepend-inner-icon="mdi-account"></v-text-field>
		<v-text-field :rules="reglas" v-model="usuario.nombre" name="nombre" label="Nombre" prepend-inner-icon="mdi-account"></v-text-field>
		<v-text-field :rules="reglas" v-model="usuario.rol" name="rol" label="Rol" prepend-inner-icon="mdi-account"></v-text-field>
		<v-text-field :rules="reglasContrasena" v-model="nuevaPass" name="contrasena" type="password" label="Contraseña" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
		<!-- //* Botones -->
		<router-link class="ml-auto mr-2" to >
			<v-btn class="my-4 orange" type="submit"  @click="$router.go(-1)">Regresar</v-btn>
		</router-link>
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

export default {
	name: "UsuarioEdit",
	data: function() {
		return {
			id: -2,
			usuario: {},
			hayError: false,
			esNuevo: false,
			nuevaPass: null,
			reglas: [
				function(x){
					return !!x || 'Dato obligatorio'
				}
			],
			reglasContrasena: [],
			msgDialogo: null,
			dialog: false
		};
	},
	props: {},
	computed: {},
	methods: {
		guardar: async function(){
			if(this.$refs.formulario.validate()){
				
				//* Si no es un nuevo usuario...
				if(this.id != -1){

					if(this.nuevaPass){
						this.usuario.contrasena = this.nuevaPass;
					}
					
					try {

						await Auth.actualizar(this.usuario);

						this.msgDialogo = 'Información del usuario actualizada'
						this.dialog = true

					} catch(e){
						this.msgDialogo = 'Error: '+e
						this.dialog = true
					}

				} else {

					try {
						
						this.usuario.contrasena = this.nuevaPass;
						this.usuario = await Auth.guardar(this.usuario);

						//* Redirección al usuario recién creado
						this.id = this.usuario.id;
						this.$router.replace({ path: `/usuarios/${this.id}` });
						this.esNuevo = false

						this.msgDialogo = "Nuevo usuario creado exitosamente";
						this.dialog = true;

					} catch(e){
						this.msgDialogo = 'Error: '+e;
						this.dialog = true;
					}

				}

			}
		}
	},
	mounted: async function() {
		
		try{

			//* Si viene id la meto en data
			this.$route.params.id && ( this.id = this.$route.params.id );
			if(this.id != -1){

				this.usuario = await Auth.getPorId(this.id);
				//console.log(this.usuario);
				
			} else if(this.id == -1) {
				this.esNuevo = true
			}

		} catch (e){
			this.hayError = true
		}

		//* Si la id = -1 agrego funcion de validación para contraseña
		if(this.id == -1){

			this.reglasContrasena[0] = function (x){
				return !!x || 'Dato obligatorio'
			}

		}

	},
	components: {
	}
};
</script>
<style scoped>
</style>
