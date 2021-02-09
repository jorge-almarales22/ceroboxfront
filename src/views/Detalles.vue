<template>
  <div>
    <h1 class="text-dark display-4">Detalles de los servicios por cliente</h1>
    <table class="table table-hover">
      <thead class="thead-dark">
        <th>Nombre</th>
        <th>Imagen</th>
        <th>Tipo De Servicio</th>
        <th>Fecha Inicio</th>
        <th>Fecha Fin</th>
        <th>Observaciones</th>
      </thead>
      <tbody>
       <template v-if="!serviciosXuser.length">
         <tr>
           <td colspan="7" class="text-center">Cargando....</td>
         </tr>
       </template>
       <template v-else>
        <tr v-for="(cliente, index) of serviciosXuser" :key="index">
            <td>{{cliente.nombre}}</td>
            <td><img class="img" :src="'http://127.0.0.1:8000/' + cliente.imagen"></td>
            <td>{{cliente.tipo_de_servicio}}</td>
            <td>{{cliente.fecha_inicio}}</td>
            <td>{{cliente.fecha_fin}}</td>
            <td>{{cliente.observaciones}}</td>
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
  name: 'Detalles',
  created(){
    this.getServiciosXuser(this.$route.params.id);
  },
  computed:{
    ...mapState(['serviciosXuser'])
  },
  methods:{
    ...mapActions(['getServiciosXuser'])    
  },
}
</script>

<style scoped>
.img{
  max-width: 50px;
}
</style>