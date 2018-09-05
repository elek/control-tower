<template>
    <div v-if="dashboards.length > 0">
        <h3>Grafana dashboards</h3>

        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">Name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="dashboard in dashboards">
                <td>
                    <router-link
                            :to="'/' + namespace + '/monitoring?page=/d/'+dashboard.uid+'/'+dashboard.title">
                        {{dashboard.title}}
                    </router-link>
                </td>
           </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: "grafana-links",
        data() {
            return {
                "dashboards": {}
            }
        },
        props: ["name", "namespace"],
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                var namespace = this.$store.state.namespace;
                this.$http.get("/api/v1/namespaces/" + namespace + "/services/" + namespace + "-grafana-grafana:web/proxy/api/search?query=" + this.name).then(result => {
                    this.dashboards = result.body
                }, error => {
                    console.log(error)
                })
            }
        }
    }
</script>