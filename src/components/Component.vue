
<template>
  <div class="post">

  <div v-if="post" class="content">
    <h2>Configuration</h2>
    <p v-for="item in post.body.items">{{ item.metadata.name }}
       <ul>
          <li v-for="(content,filename) in item.data">
             {{filename}}
          </li>
       </ul>
    </p>
  </div>
</div>
</template>

<script>
export default {
  data () {
     return {
       post: null,
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
       this.$http.get("/api/v1/namespaces/" + this.$store.state + "/configmaps").then(post => {
       this.post = post
     }, error => {
       this.loading = false
     })
   }
 }
}
</script>

