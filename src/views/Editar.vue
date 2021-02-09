<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow rounded">
                <div class="card-body">
                    <form @submit.prevent="updateCliente()" enctype="multipart/formdata">
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
                            <select v-model="cliente.servicio_id" class="form-control" >
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
import {mapState, mapActions} from 'vuex'
import axios from 'axios'
export default {
    name: 'Edit',
    data() {
        return {
            cliente: {
                servicio_id: null,
                nombre: null,
                cedula: null,
                correo: null,
                imagen: null,
                telefono: null,
                observaciones: null,
            },
            imageMin: null
        }
    },
    computed:{
        ...mapState(['clientes', 'token','servicios']),
        imagen(){
            return this.imageMin;
        }
    },
    created(){
        this.getServicios();
        this.cliente = this.clientes.find(item => item.id == this.$route.params.id);
        // console.log(this.cliente)
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
        updateCliente(){
            const params = {
                servicio: this.cliente.servicio_id,
                nombre: this.cliente.nombre,
                cedula: this.cliente.cedula,
                correo: this.cliente.correo,
                imagen: this.cliente.imagen,
                telefono: this.cliente.telefono,
                observaciones: this.cliente.observaciones,
            }
            axios.put(`http://127.0.0.1:8000/api/auth/clientes/${this.$route.params.id}`,params, 
            { headers: {"Authorization" : `Bearer ${this.token}`} })
            .then(res => {
                this.$router.push('/clientes')
            })
            // console.log(params)
        }
    }

}
</script>