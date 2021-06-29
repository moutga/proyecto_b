<template>
<div class="pa-3 dark">

	<v-alert v-if="usuario" dense text type="success">Bienvenido <strong>{{usuario}}</strong></v-alert>

	<v-sheet v-else class="pa-1 text-center mb-4 mx-auto max-w-300" color="white" elevation="1">
	<Login />
	</v-sheet>

</div>
</template>

<script>
	//import HelloWorld from '../components/HelloWorld'
	import Login from '@/components/Login.vue'

	export default {
		name: 'Home',

		data: function(){
			return {
				usuario: ''
			}
		},

		components: {
			//HelloWorld,
			Login
		},

		mounted: function(){

			this.usuario = localStorage.getItem('agendaUsuario');

		}
	}
</script>

<style>
.w-75{width: 75%;}
.max-w-300{max-width: 300px;}
</style>
