<template>
<v-app>

	<v-app-bar app color="primary" dark >

		<div class="d-flex align-center">
			
			<router-link to="/">
				<v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />
			</router-link>

		</div>

		<v-spacer></v-spacer>

		<v-btn to="/agenda" text >
			<v-icon>mdi-account-box-multiple</v-icon>
			<span class="mr-2"> Agenda</span>
		</v-btn>

	</v-app-bar>

	<v-main class="p-5">

		<router-view/>

	</v-main>

</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
	//
	}),

	mounted: function(){

		const usuarios = [
			{
				id: 1,
				nombre:"Administrador",
				usuario:"admin",
				contrasena:"1234",
				rol:"ADMINISTRADOR",
			},
			{
				id: 2,
				nombre:"Gabriel",
				usuario: "gabriel",
				contrasena:"1234",
				rol:"USUARIO",
			},
			{
				id: 3,
				nombre:"Alejandro",
				usuario:"alejandro",
				contrasena:"1234",
				rol:"USUARIO",
			}
		];

		// Guardar la lista de usuarios en localstorage si todavía no están
		if( !localStorage.getItem('usuarios') ){
			localStorage.setItem('usuarios',JSON.stringify(usuarios));
		}

	}
 
}
</script>
