<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow rounded">
                <div class="card-body">
                    <form @submit.prevent="addServicio()" enctype="multipart/formdata">
                        <div class="form-group">
                            <label>Nombre</label>
                            <input type="text" class="form-control" v-model="servicio.nombre" placeholder="Nombre...">
                        </div>
                      <div class="form-group">
                            <label for="tipo">Tipo de servicio</label>
                            <select v-model="servicio.tipo" class="form-control" >
                                <option value="Basico" >Básico</option>
                                <option value="Avanzado" >Avanzado</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Fecha Inicio</label>
                            <input type="date" class="form-control" v-model="servicio.fecha_inicio">
                        </div>
                        <div class="form-group">
                            <label>Fecha Fin</label>
                            <input type="date" class="form-control" v-model="servicio.fecha_fin">
                        </div>
                        
                        <div class="form-group">
                            <label>Observaciones</label>
                            <textarea class="form-control" rows="5" v-model="servicio.observaciones"></textarea>
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
    data() {
        return {
            servicio:{
                tipo: null,
                nombre: null,
                imagen: null,
                fecha_inicio: null,
                fecha_fin: null,
                observaciones: null,
            },
            imageMin: ''
        }
    },
    computed:{
        ...mapState(['token']),
        imagen(){
            return this.imageMin;
        }
    },
    methods:{
        inputFile(e){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onload = (e) =>{
                this.servicio.imagen = e.target.result
                this.imageMin = e.target.result
            }
        },
        addServicio(){
            const params = {
                tipo: this.servicio.tipo,
                nombre: this.servicio.nombre,
                imagen: this.servicio.imagen,
                fecha_inicio: this.servicio.fecha_inicio,
                fecha_fin: this.servicio.fecha_fin,
                observaciones: this.servicio.observaciones
            }
            axios.post('http://127.0.0.1:8000/api/auth/servicios',params, 
                { headers: {"Authorization" : `Bearer ${this.token}`} })
                .then(res => {
                    this.$router.push('/servicios');
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