<template>
<div class="container">
    <div class="row">
        <div class="col-12 col-sm-10 col-lg-6 mx-auto">
            <h1 class="display-4 text-primary text-center">
                Login
            </h1>
            <form @submit.prevent="Login()" class="card bg-white shadow rounded py-3 px-4">
                <label for="email">Email</label>
                <div class="form-group">
                  <input type="email" class="form-control" v-model="params.email">
                </div>
                <label for="password">Password</label>
                <div class="form-group">
                  <input type="password" class="form-control" v-model="params.password">
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block btn-lg">Login</button>
                </div>
                <div v-if="fails" class="alert alert-danger" role="alert">
                  {{ fails }}
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import {mapMutations, mapState} from 'vuex';
export default {
    data() {
        return {
            params: {
                email: null,
                password: null
            }
        }
    },
    computed:{
        ...mapState(['fails'])
    },
    methods:{
        ...mapMutations(['setToken','setFails']),
        Login(){
            const params = {
                email: this.params.email,
                password: this.params.password
            }
            axios.post(`http://127.0.0.1:8000/api/auth/login`,params)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                this.setToken(res.data.token);
                this.setFails(null);
                this.$router.push('/clientes');
            }).catch(error => {
                const msg = 'Verifica tus credenciales';
                this.setFails(msg);
            })
        }
    }
}
</script>