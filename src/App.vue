<template>
<v-app>

	<v-app-bar
		app
		color="primary"
		dark
	>
		<div class="d-flex align-center">
			
			<router-link to="/">
			<v-img
				alt="Vuetify Logo"
				class="shrink mr-2"
				contain
				src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
				transition="scale-transition"
				width="40"
			/>
			</router-link>

		</div>

		<v-spacer></v-spacer>

		<v-btn
			to="/agenda"
			text
		>
			<span class="mr-2">Agenda</span>
			<v-icon>mdi-account-box-multiple</v-icon>
		</v-btn>

	</v-app-bar>

	<v-main class="p-5">

		<router-view/>

	</v-main>

</v-app>
</template>

<script>

// const contactos = {
// 	nombre: 'x',
// 	apellido: 'x',
// 	domicilio: {
// 		ciudad: 'x',
// 		calle: 'x',
// 		numero: 'x',
// 		cp: 123
// 	},
// 	email: 'x',
// 	telefonos: [
// 		{numero: 123, clase: 'x'}
// 	],
// 	foto: 'x',
// 	fechaNacimiento: 'x',
//	etiquetas: []
// }

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
