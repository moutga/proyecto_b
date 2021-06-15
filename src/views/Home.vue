<template>
<div class="pa-3 dark">
	<Login />
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
</style>
