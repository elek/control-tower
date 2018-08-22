<template>
<div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link :to="'/' + namespace + '/status'" class="nav-link">
              {{namespace}}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/' + namespace + '/topology'" class="nav-link">
              Topology
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/' + namespace + '/monitoring/'" class="nav-link">Dashboards</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/' + namespace + '/logging'" class="nav-link">Logging</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/' + namespace + '/history'" class="nav-link">History</router-link>
          </li>
          <li class="nav-item">
             <router-link :to="'/' + namespace + '/ui'" class="nav-link">Kubernetes UI</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main role="main" class="container">
      <router-view></router-view>
    </main><!-- /.container -->
</div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import RouterLink from 'vue-router'

export default {
  name: 'app',
  components: {},
    computed: {
        namespace() {
            return this.$store.state.namespace
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}


body {
  padding-top: 5rem;
}
.starter-template {
  padding: 3rem 1.5rem;
  text-align: center;
}
.embedded{
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 100%;
  width: 100%;
  border: 0px;
}
</style>
