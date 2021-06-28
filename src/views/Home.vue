<template>
<div class="pa-3 dark">
	<v-sheet class="pa-1 text-center mb-4 mx-auto max-w-300" color="white" elevation="1">
	<Login />
	</v-sheet>
</div>
</template>

<script>
	//import HelloWorld from '../components/HelloWorld'
	import Login from '@/components/Login.vue'

	export default {
	name: 'Home',

	components: {
		//HelloWorld,
		Login
	},
	}
</script>

<style>
.w-75{width: 75%;}
.max-w-300{max-width: 300px;}
</style>
