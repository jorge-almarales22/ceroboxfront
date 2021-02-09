<template>
  <div>
    <div class="container">
      <navbar/>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import Navbar from './views/Navbar.vue';
export default {
  name: 'App',
  components:{
    Navbar
  },
  methods: {
    ...mapActions(['getToken'])
  },
  created(){
    this.getToken();
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #17a2b8;
}
</style>
