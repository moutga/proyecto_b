<template>
<div>
	<v-form class="w-75 mx-auto " >
		<v-sheet class="pa-2 text-center mb-4" color="white" elevation="1"  >Iniciar sesión</v-sheet>
		<v-text-field label="Usuario" prepend-inner-icon="mdi-account"></v-text-field>
		<v-text-field label="Contraseña" type="password" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
	</v-form>
</div>
</template>

<script>
export default {
	name: 'Login',
	data:function(){
		return {}
	},
	props: {},
	methods: {},
	computed: {}
}
</script>

<style scoped>

</style>