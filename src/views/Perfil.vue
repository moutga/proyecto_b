<template>
<div>

	<v-container class="">
	<v-form @submit.prevent="guardar" class="" ref="formulario">

		<!-- //* Campos de texto -->
		<v-text-field :rules="reglas" v-model="usuario.nombre" name="nombre" label="Nombre" prepend-inner-icon="mdi-account"></v-text-field>
		<v-text-field :rules="['reglas']" v-model="nuevaPass" name="contrasena" type="password" label="Contraseña" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
		<v-text-field :rules="['reglas']" v-model="nuevaPass" name="contrasenaDos" type="password" label="Repetir Contraseña" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>

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
// import Auth from "@/services/auth.js";
// import { mapGetters } from 'vuex'

export default {
	name: 'Perfil',
	data: function(){return {
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
	};},
	props: {},
	computed: {},
	methods: {
		guardar: function(){
			this.msgDialogo = "Mensaje_de_guardado";
			this.dialog = true;
			return 0;
		}
	}
}
</script>

<style>

</style>