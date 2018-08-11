<template>
    <div class="col-md-12">
        {{message}}
        <textarea v-model="resource" class="col-md-12" rows=20
                  placeholder="add multiple lines"></textarea>
        <input type="submit" v-on:click="submit()">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: '',
                resource: `{
  "apiVersion": "flokkr.github.io/v1alpha1",
  "kind": "Component",
  "metadata": {
    "name": "example"
  },
  "spec": {
    "type": "ozone",
    "values": {
      "image": {
        "repository": "elek/ozone",
        "tag": "latest"
      }
    }
  }
}`,
            }
        },

        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            // this.fetchData()
        },
        watch: {
            // call again the method if the route changes
            // '$route': 'fetchData'
        },
        methods: {
            submit() {
                var obj = JSON.parse(this.resource)
                // eslint-disable-next-line
                this.$http.post("/apis/flokkr.github.io/v1alpha1/namespaces/" + this.$store.state.namespace + "/components", obj).then(post => {
                    this.message = "Message saved successfully."
                }, error => {
                    this.message = error.body.status + " " + error.body.message
                })
            },
            fetchData() {
                this.error = this.post = null
                this.loading = true
                // replace `getPost` with your data fetching util / API wrapper

            }
        }
    }


</script>
