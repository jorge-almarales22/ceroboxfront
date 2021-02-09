import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';
Vue.use(VueRouter)

const routes = [
  {
    path: '/clientes',
    name: 'Home',
    component: Home,
    meta: {rutaProtegida: true}
  },
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/servicios',
    name: 'Servicio',
    component: () => import(/* webpackChunkName: "servicio" */ '../views/Servicio.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/cliente/nuevo',
    name: 'Nuevo',
    component: () => import(/* webpackChunkName: "nuevo" */ '../views/Nuevo.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/cliente/edit/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "editar" */ '../views/Editar.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/cliente/view/:id',
    name: 'Detalles',
    component: () => import(/* webpackChunkName: "detalles" */ '../views/Detalles.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/servicio/edit/:id',
    name: 'EditarServicio',
    component: () => import(/* webpackChunkName: "editarservicio" */ '../views/EditarServicio.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/servicio/nuevo',
    name: 'NuevoServicio',
    component: () => import(/* webpackChunkName: "nuevoservicio" */ '../views/NuevoServicio.vue'),
    meta: {rutaProtegida: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const rutaEsProtegida = to.matched.some(item => item.meta.rutaProtegida)
  if(rutaEsProtegida && store.state.token === null){
    next('/')
  }else{
    next()
  }
})

export default router
