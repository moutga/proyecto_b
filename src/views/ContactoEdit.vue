<template>
<div>

	<v-container class="mb-3">

		<!--//* Mensaje de error si la ID no coincide con la de un usuario existente -->
		<v-alert v-if="hayError" elevation="3" outlined type="error">Ese contacto no existe</v-alert>
		<!--//* Mensaje de error si la ID no coincide con la de un usuario existente -->
		<v-alert v-if="esNuevo" elevation="3" outlined type="info">Nuevo contacto</v-alert>
		<!--//* Mensaje de error si la ID no coincide con la de un usuario existente -->
		<v-alert v-if="(!esNuevo&&!hayError)" elevation="3" outlined type="info">Editando el contacto <span class="font-weight-bold">{{contacto.nombre}}</span></v-alert>

	</v-container>

	<v-container class="">
	<v-form @submit.prevent="guardar" class="" ref="formulario">

		<!-- //* Campos de texto -->
		<v-text-field :rules="reglas" v-model="contacto.nombre" name="contacto" label="Contacto" prepend-inner-icon="mdi-account"></v-text-field>
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
// import Api from "@/services/api.js";

export default {
	name: "ContactoEdit",
	data: function() {
		return {
			id: -2,
			contacto: {},
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
		
	},
	mounted: async function() {},
	components: {}
};
</script>
<style scoped>
</style>
