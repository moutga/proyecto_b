<template>
<div>

	<!--//* Mensaje de error si la ID no coincide con la de un usuario existente -->
	<v-alert v-if="hayError" elevation="3" outlined type="error">Ese usuario no existe</v-alert>
	<!--//* Mensaje de error si la ID no coincide con la de un usuario existente -->
	<v-alert v-if="esNuevo" elevation="3" outlined type="info">Nuevo usuario</v-alert>
	<!--//* Mensaje de error si la ID no coincide con la de un usuario existente -->
	<v-alert v-if="(!esNuevo&&!hayError)" elevation="3" outlined type="success">Editar usuario {{usuario.usuario}}</v-alert>

	<div class="">
		
	</div>

</div>
</template>
<script>
import Auth from "@/services/auth.js";

export default {
	name: "UsuarioEdit",
	data: function() {
		return {
			id: -2,
			usuario: '',
			hayError: false,
			esNuevo: false
		};
	},
	props: {},
	computed: {},
	methods: {},
	mounted: async function() {
		
		//* Si viene id la meto en data
		try{

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

	},
	components: {
	}
};
</script>
<style scoped>
</style>
