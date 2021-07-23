<template lang="es">
<div>

	<v-container class="mb-3">
		<div class="text-center" :class="{'d-none':cargandoLista}" ><v-progress-circular indeterminate color="primary" ></v-progress-circular> Obteniendo lista de contactos</div>

		<transition-group name="list">

			<!-- Recibe la emisión del elemento y ejecuta abreDialogo recibiendo la id como parámetro  -->
			<UsuarioItem :ref="'item'+usuario.id" @enviaUserId="abreDialogo" :key="usuario.id" :nombre="usuario.nombre" :id="usuario.id" :rol="usuario.rol" v-for="(usuario,i) in usuarios" class="list-item" />

		</transition-group>

	</v-container>

	<v-container>
	<v-row >
		<router-link class="ml-auto" :to="{ name: 'usuario', params: { id: -1 }}">
		<v-btn color="green" elevation="1" outlined>
			<v-icon left>mdi-account-plus-outline</v-icon> Añadir usuario
		</v-btn>
		</router-link>

	</v-row>
	</v-container>

	<v-dialog v-model="dialog" persistent max-width="310px" >
	<v-container>

		<v-card>
			<v-card-text>
				¿Seguro desea eliminar el contacto {{borrando}}?
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="dialog = false" >
					Cancelar
				</v-btn>
					<v-btn color="green darken-1" text @click="aceptaBorrar" >
					Proceder
				</v-btn>
			</v-card-actions>
		</v-card>

	</v-container>
	</v-dialog>

</div>
</template>
<script>
import UsuarioItem from "@/components/UsuarioItem.vue";
import Auth from "@/services/auth.js";

export default {
	name: "UsuariosList",
	data: function() {
		return {
			cargandoLista: false,
			usuarios: null, //* La lista de contactos
			dialog: false,
			borrando: null //* Sólo para guardar la id de un usuario a ser borrado
		};
	},
	props: {},
	computed: {},
	methods: {
		//* Se ejecuta al recibir la emisión de un UsuarioItem recibiendo la id de usuario
		abreDialogo: function(id) {

			this.borrando = id;
			this.dialog = true;

		},
		aceptaBorrar: function(){

			//console.log('Se borra usuario ' + this.borrando);

			//* Obtengo el rel del contacto/item que quiero borrar
			//? let item = 'item'+this.borrando;
			//! por ser elemento generado dinamicamente crea un array 
			//! así que tengo que usar un índice 
			//? console.log(this.$refs.[item][0]);
			//? this.$refs.[item][0].escondeEste();

			let borrando = this.borrando;
			//* Busco el índice del contacto cuyo id sea borrando
			//* y lo quito del array usuarios
			let cualBorroRender = this.usuarios.findIndex(function(u){
				return u.id == borrando
			});
			this.usuarios.splice(cualBorroRender,1);
			Auth.borrar(borrando);

			//* Cierro diálogo y vacío el borrando
			this.dialog = false;
			this.borrando = null;

		}
	},
	mounted: async function() {

		try { //* todo el código que querés que se ejecute si la promesa sale por resolve()

		//* recupero la lista de contactos
		this.usuarios = await Auth.getUsuarios();
		this.cargandoLista = true;

		} catch(e){

			//* todo el código que querés que se ejecute si
			//* la promsea sale por reject()
			this.mostrarVentanitaConError = true;
		}

	},
	components: {
		UsuarioItem,
	}
};
</script>
<style scoped>
.v-dialog__content{
	align-items: start;
}
.list-item{}
/* Transición de entrada */
.list-enter{ /* Estado inicial (previo al normal) de la lista */
	opacity:0;
	transform: translateY(-30px);
}
.list-enter-active{ /* transición al estado normal */
	transition: all 0.5s
}
/* Transición de salida */
.list-leave-to { /* Estado final de salida */
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active { /* Estado normal de salida */
	transition: all 0.3s;
}
</style>
