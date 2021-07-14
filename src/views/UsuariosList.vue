<template lang="es">
<div>

	<v-container class="mb-3">
		<v-row class="grey pr-2 lighten-5">
			<v-col class="">Nombre de usuario</v-col>
			<v-col class="col-3">
				<v-row class="pt-2 justify-end">
					<v-btn class="mr-1" small color="primary" elevation="1" icon outlined><v-icon>mdi-account-edit-outline</v-icon></v-btn>
					<v-btn small color="red" elevation="1" icon outlined><v-icon>mdi-trash-can-outline</v-icon></v-btn>
				</v-row>
			</v-col>
		</v-row>
	</v-container>

	<v-container>
	<v-row >
		<v-btn class="ml-auto" color="green" elevation="1" outlined><v-icon class="mr-2">mdi-account-plus-outline</v-icon> Añadir usuario</v-btn>
	</v-row>
	</v-container>

</div>
</template>
<script>
// import Auth from "@/services/auth.js";
export default {
	name:'UsuariosList',
	data: function(){return{

	}},
	props: {},
	computed: {},
	methods: {},
}
</script>
<style lang="es">
	
</style>