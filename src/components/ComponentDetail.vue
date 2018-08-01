<template>
  <div class="post">

  <div v-if="component" class="content">
    <h2>{{component.spec.type}} component ({{component.metadata.name}})</h2>
    <p v-for="item in component.items">{{ item.metadata.name }}
       <ul>
          <li v-for="(content,filename) in item.data">
             {{filename}}
          </li>
       </ul>
    </p>
    <h3>Services</h3>
    <div class="card-deck">
    <div class="card" style="width: 18rem;" v-for="service in services">
      <div class="card-body">
        <h5 class="card-title">{{service.metadata.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{service.spec.type}}</h6>
        <p v-for="port in service.spec.ports" class="card-text"><a v-bind:href="'/api/v1/namespaces/ozoneconsole/services/'+service.metadata.name+':'+port.name+'/proxy/'">{{port.name}}</a></p>
      </div>
    </div>
    </div>
    <h3>Statefulsets</h3>
    <div class="card-deck">
    <div class="card" style="width: 18rem;" v-for="statefulset in statefulsets">
      <div class="card-body">
        <h5 class="card-title">{{statefulset.metadata.name}}</h5>
      </div>
    </div>
    </div>
    <h3>Configs</h3>
    <div class="card-deck">
    <div class="card" style="width: 18rem;" v-for="config in configs">
      <div class="card-body">
        <h5 class="card-title">{{config.metadata.name}}</h5>
        <router-link :to="'/config/' + config.metadata.name" class="card-link">Edit</router-link>
      </div>
    </div>
    </div>
    <h3>Pods</h3>
    <div class="card-deck">
    <div class="card" style="min-width: 18rem; max-width: 18rem; margin: 1em;" v-for="pod in pods">
      <div class="card-body">
        <h5 class="card-title">{{pod.metadata.name}}</h5>
        <h5 class="card-title">{{pod.status.phase}}</h5>
        <router-link :to="'/pod/' + pod.metadata.name + '/logging'" class="card-link">Logging</router-link>
        <router-link :to="'/pod/' + pod.metadata.name + '/status'" class="card-link">Status</router-link>
        <router-link :to="'/pod/' + pod.metadata.name + '/console'" class="card-link">Console</router-link>
      </div>
    </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data () {
     return {
       component: null,
       pods: [],
       statefulsets: [],
       configs: [],
       services: [],
     }
   },
   created () {
     // fetch the data when the view is created and the data is
     // already being observed
     this.fetchData()
   },
   watch: {
     // call again the method if the route changes
     '$route': 'fetchData'
   },
   methods: {
   fetchData () {
     this.$http.get("/apis/flokkr.github.io/v1alpha1/namespaces/"+namespace+"/components/" + this.$route.params.name ).then( result => {
       this.component = result.body
     }, error => {
       console.log(error)
     })
     this.$http.get("/apis/apps/v1/namespaces/"+namespace+"/statefulsets?labelSelector=release=" + this.$route.params.name ).then( result => {
       this.statefulsets = result.body.items
     }, error => {
       console.log(error)
     })
     this.$http.get("/api/v1/namespaces/"+namespace+"/services?labelSelector=release=" + this.$route.params.name ).then( result => {
       this.services = result.body.items
     }, error => {
       console.log(error)
     })
     this.$http.get("/api/v1/namespaces/"+namespace+"/configmaps?labelSelector=release=" + this.$route.params.name ).then( result => {
       this.configs = result.body.items
     }, error => {
       console.log(error)
     })
     this.$http.get("/api/v1/namespaces/"+namespace+"/pods?labelSelector=release=" + this.$route.params.name ).then( result => {
       this.pods = result.body.items
     }, error => {
       console.log(error)
     })
   }
 }
}
</script>
