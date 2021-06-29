<template>
<div>
	
hola acá va la agenda

</div>
</template>

<script>
export default {
	name: 'Agenda',
	data: function(){
		return {

		};
	},
	props: {},
	methods: {},
	mounted: function(){

		// Redirigir a la home si no hay sesión iniciada
		if(!localStorage.getItem('agendaUsuario')){

			this.$router.push({ path: '/' })

		}

	}
}
</script>