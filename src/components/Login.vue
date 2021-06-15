<template>
<div>
	<v-form @submit.prevent="submit" class="w-75 mx-auto " ref="form" >
		<v-sheet class="pa-2 text-center mb-4" color="white" elevation="1"  >Iniciar sesión</v-sheet>
		<v-text-field  :rules="reglas" name="usuario" label="Usuario" prepend-inner-icon="mdi-account"></v-text-field>
		<v-text-field  :rules="reglas" name="contraseña" label="Contraseña" type="password" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
		<v-btn  class="my-4 blue" type="submit"  >Ingresar</v-btn>
	</v-form>
</div>
</template>

<script>
export default {
	name: 'Login',
	data:function(){
		return {
			reglas: [
				v => !!v || 'Dato obligatorio'
			],
		}
	},
	props: {},
	methods: {
		submit: function submit() {
			if(this.$refs.form.validate()){
				this.$refs.form.$el.submit()
			}
		}
	},
	computed: {}
}
</script>

<style scoped>

</style>