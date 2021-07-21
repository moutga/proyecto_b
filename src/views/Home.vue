<template>
<div class="pa-3 dark">

	<Login />

</div>
</template>

<script>
	//import HelloWorld from '../components/HelloWorld'
	import Login from '@/views/Login.vue'

	export default {
		name: 'Home',
		data: function(){
			return {}
		},
		components: {
			//HelloWorld,
			Login
		},
		mounted: function(){}
	}
</script>

<style>
.w-75{width: 75%;}
.max-w-300{max-width: 350px;}
</style>
