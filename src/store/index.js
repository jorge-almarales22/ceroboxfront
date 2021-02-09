import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    fails: null,
    clientes: [],
    servicios: [],
    serviciosXuser: []
  },
  mutations: {
    setToken(state, payload){
      state.token = payload;
    },
    setFails(state, payload){
      state.fails = payload;
    },
    setClientes(state, payload){
      state.clientes = payload;
    },
    setServicios(state, payload){
      state.servicios = payload;
    },
    destroyCliente(state, payload){
      state.clientes.splice(payload.index, 1);
    },
    destroyServicio(state, payload){
      state.servicios.splice(payload.index, 1);
    },
    setServicioXuser(state, payload){
      state.serviciosXuser = payload;
    },
  
  },
  actions: {
    getToken(context){
      if(localStorage.getItem('token')){
        context.commit('setToken', localStorage.getItem('token'))
      }else{
        context.commit('setToken', null)
      }
    },
    getClientes(context){
      axios.get(`http://127.0.0.1:8000/api/auth/clientes`,
      { headers: {"Authorization" : `Bearer ${context.state.token}`} })
      .then(res => {
        context.commit('setClientes', res.data);
        
      })
    },
    borrarCliente(context, servicio){
      context.commit('destroyServicio', servicio);
      axios.delete(`http://127.0.0.1:8000/api/auth/servicios/${servicio.id}`,
      { headers: {"Authorization" : `Bearer ${context.state.token}`} })
      .then(res => {
        console.log('borrado con exito');
      })
    },
    borrarServicio(context, cliente){
      context.commit('destroyServicio', cliente);
      axios.delete(`http://127.0.0.1:8000/api/auth/servicios/${cliente.id}`,
      { headers: {"Authorization" : `Bearer ${context.state.token}`} })
      .then(res => {
        console.log('borrado con exito');
      })
    },
    getServicios(context){
      axios.get(`http://127.0.0.1:8000/api/auth/servicios`,
      { headers: {"Authorization" : `Bearer ${context.state.token}`} })
      .then(res => {
        context.commit('setServicios', res.data);
        // console.log(res.data)
        
      })
    },
    getServiciosXuser(context, user){
      // console.log(user)
      axios.get(`http://127.0.0.1:8000/api/auth/servicios/${user}`,
      { headers: {"Authorization" : `Bearer ${context.state.token}`} })
      .then(res => {
        context.commit('setServicioXuser', res.data);
        
      })
    },


  },
})
