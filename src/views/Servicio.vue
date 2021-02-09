<template>
  <div>
    <router-link to="/servicio/nuevo" class="btn btn-info btn-sm mb-2">Nuevo servicio</router-link>
    <table class="table table-hover">
      <thead class="thead-dark">
        <th>Nombre</th>
        <th>Imagen</th>
        <th>Tipo de servicio</th>
        <th>Fecha inicio</th>
        <th>Fecha fin</th>
        <th>Observaciones</th>
        <th>Acciones</th>
      </thead>
      <tbody>
       <template v-if="!servicios.length">
         <tr>
           <td colspan="7" class="text-center">Cargando....</td>
         </tr>
       </template>
       <template v-else>
        <tr v-for="(servicio, index) of servicios" :key="index">
            <td>{{servicio.nombre}}</td>
            <td><img class="img" :src="'http://127.0.0.1:8000/' + servicio.imagen"></td>
            <td>{{servicio.tipo_de_servicio}}</td>
            <td>{{servicio.fecha_inicio}}</td>
            <td>{{servicio.fecha_fin}}</td>
            <td>{{servicio.observaciones}}</td>
            <td>
              <router-link :to="`/servicio/edit/${servicio.id}`" class="mr-1">Editar</router-link> 
            <button v-on:click="borrarServicio({index: index, id: servicio.id})" 
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
    this.getServicios();
  },
  computed:{
    ...mapState(['servicios'])
  },
  methods:{
    ...mapActions(['getServicios', 'borrarServicio'])    
  },
}
</script>

<style scoped>
.img{
  max-width: 50px;
}
</style>