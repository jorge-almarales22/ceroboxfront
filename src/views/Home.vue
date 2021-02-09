<template>
  <div>
    <router-link to="/cliente/nuevo" class="btn btn-info btn-sm mb-2">Nuevo cliente</router-link>
    <table class="table table-hover">
      <thead class="thead-dark">
        <th>Nombre</th>
        <th>Imagen</th>
        <th>Cedula</th>
        <th>Correo</th>
        <th>Telefono</th>
        <th>Observaciones</th>
        <th>Acciones</th>
      </thead>
      <tbody>
       <template v-if="!clientes.length">
         <tr>
           <td colspan="7" class="text-center">Cargando....</td>
         </tr>
       </template>
       <template v-else>
        <tr v-for="(cliente, index) of clientes" :key="index">
            <td>{{cliente.nombre}}</td>
            <td><img class="img" :src="'http://127.0.0.1:8000/' + cliente.imagen"></td>
            <td>{{cliente.cedula}}</td>
            <td>{{cliente.correo}}</td>
            <td>{{cliente.telefono}}</td>
            <td>{{cliente.observaciones}}</td>
            <td><router-link :to="`/cliente/view/${cliente.id}`" class="mr-1">Detalles</router-link>
              <router-link :to="`/cliente/edit/${cliente.id}`" class="mr-1">Editar</router-link> 
            <button v-on:click="borrarCliente({index: index, id: cliente.id})" 
            class="btn btn-danger btn-sm">Delete</button></td>
          </tr>
       </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
// import axios from 'axios';
export default {
  name: 'Home',
  created(){
    this.getClientes();
  },
  computed:{
    ...mapState(['clientes'])
  },
  methods:{
    ...mapActions(['getClientes', 'borrarCliente'])    
  },
}
</script>

<style scoped>
.img{
  max-width: 50px;
}
</style>