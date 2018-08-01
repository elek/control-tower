<template>
  <div class="col-md-12">
  {{message}}
     <textarea v-model="resource"  class="col-md-12" rows=20 placeholder="add multiple lines"></textarea>
     <input type="submit" v-on:click="submit()"/>
  </div>
</template>
<script>
var namespace = 'ozoneweekly'
export default {
  data () {
     return {
       message: '',
       resource: ''
     }
   },
   created () {
     // fetch the data when the view is created and the data is
     // already being observed
     this.fetchData()
   },
   watch: {
     // call again the method if the route changes
     // '$route': 'fetchData'
   },
   methods: {
   submit() {
      var obj = JSON.parse(this.resource)
      // eslint-disable-next-line
      this.$http.put("/api/v1/namespaces/"+namespace+"/configmaps/" + this.$route.params.name, obj).then( post => {
        this.message = "Message saved successfully."
      }, error => {
        this.message = error.body.status +" " + error.body.message
      })
   },
   fetchData () {
     this.$http.get("/api/v1/namespaces/"+namespace+"/configmaps/" + this.$route.params.name).then( post => {
       this.resource = JSON.stringify(post.body, null, 2)
     }, error => {
       this.message = error.body.status +" " + error.body.message
     })

   }
 }
}
</script>