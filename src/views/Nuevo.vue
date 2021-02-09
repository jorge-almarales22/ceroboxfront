<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow rounded">
                <div class="card-body">
                    <form @submit.prevent="addCliente()" enctype="multipart/formdata">
                        <div class="form-group">
                            <label>Nombre</label>
                            <input type="text" class="form-control" v-model="cliente.nombre" placeholder="Nombre...">
                        </div>
                        <div class="form-group">
                            <label>Cédula</label>
                            <input type="number" class="form-control" v-model="cliente.cedula" placeholder="Cédula...">
                        </div>
                      <div class="form-group">
                            <label for="servicio">Servicios</label>
                            <select v-model="cliente.servicio" class="form-control" >
                                <option v-for="(servicio, index) in servicios" :value="servicio.id" 
                                :key="index">{{servicio.nombre}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Correo</label>
                            <input type="email" class="form-control" v-model="cliente.correo" placeholder="Email...">
                        </div>
                        <div class="form-group">
                            <label>Telefono</label>
                            <input type="number" class="form-control" v-model="cliente.telefono" placeholder="Telefono...">
                        </div>
                        <div class="form-group">
                            <label>Observaciones</label>
                            <textarea class="form-control" rows="5" v-model="cliente.observaciones"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Image</label>
                            <input type="file" class="form-control-file" @change="inputFile">
                        </div>
                        <div>
                            <img :src="imagen" class="img">
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Guardar" class="btn btn-info btn-lg btn-block">
                            <router-link class="btn btn-default btn-lg btn-block mt-2" to="/clientes">Back</router-link> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {mapState, mapActions} from 'vuex';

export default {
    name: 'New',
    created(){
        this.getServicios();
    },
    data() {
        return {
            cliente:{
                servicio: null,
                nombre: null,
                cedula: null,
                correo: null,
                imagen: null,
                telefono: null,
                observaciones: null,
            },
            imageMin: ''
        }
    },
    computed:{
        ...mapState(['token', 'servicios']),
        imagen(){
            return this.imageMin;
        }
    },
    methods:{
        ...mapActions(['getServicios']),
        inputFile(e){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onload = (e) =>{
                this.cliente.imagen = e.target.result
                this.imageMin = e.target.result
            }
        },
        addCliente(){
            const params = {
                servicio: this.cliente.servicio,
                nombre: this.cliente.nombre,
                cedula: this.cliente.cedula,
                correo: this.cliente.correo,
                imagen: this.cliente.imagen,
                telefono: this.cliente.telefono,
                observaciones: this.cliente.observaciones,
            }
            axios.post('http://127.0.0.1:8000/api/auth/clientes',params, 
                { headers: {"Authorization" : `Bearer ${this.token}`} })
                .then(res => {
                    this.$router.push('/clientes');
            })             
            // console.log(params)
        }
    }
}
</script>

<style scoped>
.img{
    max-width: 200px;
}
</style>