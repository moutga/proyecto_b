<template lang="es" class="" >
	<v-row class="grey pr-2 lighten-5 usuarioItem" >
		<v-col class=""><v-chip small label>#{{id}}</v-chip> {{nombre}}</v-col>
		<v-col class="col-3">
			<v-row class="pt-2 justify-end">
				<router-link :to="{ name: 'usuario', params: { id: id }}">
				<v-btn class="mr-1" small color="primary" elevation="1" icon outlined><v-icon>mdi-account-edit-outline</v-icon></v-btn>
				</router-link>
				<v-btn @click.native="borrarEste" small color="red" elevation="1" icon outlined><v-icon>mdi-trash-can-outline</v-icon></v-btn>
			</v-row>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: 'UsuarioItem',
	data: function(){return({
	})},
	props: {
		nombre:{
			type: String,
			default: 'Nombre por defecto'
		},
		id:{
			type: Number,
			default: -1
		},
		rol: {
			type: String,
			default: 'USUARIO'
		}
	},
	computed: {},
	methods: {
		//* Se ejecuta al presionar el botón de borrar
		//* emite hacia UsuariosList.vue la id del usuario que quiero borrar vía enviaUserId
		borrarEste: function(){

			this.$emit('enviaUserId',this.id);

		}
	}
}
</script>
<style  scoped>  
.usuarioItem{margin-top:4px !important;margin-bottom:0px !important;}
</style>