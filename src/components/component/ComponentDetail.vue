<template>
    <div class="post">
        <error></error>
        <div v-if="component" class="content">

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">{{component.metadata.namespace}}
                    </li>
                    <li class="breadcrumb-item">{{component.metadata.name}}
                    </li>
                </ol>
            </nav>

            <grafana-links v-bind:name="component.metadata.name" v-bind:namespace="namespace"></grafana-links>

            <h3>Services</h3>

            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Link</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="service in services">
                    <td>{{service.metadata.name}}</td>
                    <td>{{service.spec.type}}</td>
                    <td>
                        <p v-for="port in service.spec.ports"
                           class="card-text">
                            <a v-bind:href="'/api/v1/namespaces/'+namespace+'/services/'+service.metadata.name+':'+port.name+'/proxy/'">{{port.name}}
                            <span v-if="port.nodePort" >:{{port.nodePort}}</span>
                            </a>
                    </p></td>
                </tr>
                </tbody>
            </table>

            <h3>Statefulsets</h3>

            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="statefulset in statefulsets">
                    <td>{{statefulset.metadata.name}}</td>
                </tr>
                </tbody>
            </table>

            <h3>Configs</h3>

            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Edit</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="config in configs">
                    <td>{{config.metadata.name}}</td>

                    <td>
                    </td>
                </tr>
                </tbody>
            </table>


            <h3>Pods</h3>

            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Logging</th>
                    <th scope="col">Status page</th>
                    <th scope="col">Console</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="pod in pods">
                    <td>{{pod.metadata.name}}</td>
                    <td>{{pod.status.phase}}</td>
                    <td>
                        <router-link
                                :to="'/' + namespace + '/pod/' + pod.metadata.name + '/logging'"
                                class="card-link">Logging
                        </router-link>
                    </td>
                    <td>
                        <router-link
                                :to="'/' + namespace + '/pod/' + pod.metadata.name + '/status'"
                                class="card-link">Status
                        </router-link>
                    </td>
                    <td>
                        <router-link
                                :to="'/' + namespace + '/pod/' + pod.metadata.name + '/console'"
                                class="card-link">Console
                        </router-link>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    </div>

</template>

<script>

    import GrafanaLinks from "./GrafanaLinks.vue";
    import Error from '../Error'

    export default {
        computed: {
            namespace: function () {
                return this.$route.params.namespace;
            }
        },
        components: {GrafanaLinks, Error},
        data() {
            return {
                component: null,
                pods: [],
                statefulsets: [],
                configs: [],
                services: [],
            }
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData'
        },

        methods: {
            fetchData() {
                var namespace = this.$store.state.namespace;
                this.$http.get("/apis/flokkr.github.io/v1alpha1/namespaces/" + namespace + "/components/" + this.$route.params.name).then(result => {
                    this.component = result.body
                }, error => {
                    this.$store.commit("error", error);
                });
                this.$http.get("/apis/apps/v1/namespaces/" + namespace + "/statefulsets?labelSelector=release=" + this.$route.params.name).then(result => {
                    this.statefulsets = result.body.items
                }, error => {
                    this.$store.commit("error", error);
                });
                this.$http.get("/api/v1/namespaces/" + namespace + "/services?labelSelector=release=" + this.$route.params.name).then(result => {
                    this.services = result.body.items
                }, error => {
                    this.$store.commit("error", error);
                });
                this.$http.get("/api/v1/namespaces/" + namespace + "/configmaps?labelSelector=release=" + this.$route.params.name).then(result => {
                    this.configs = result.body.items
                }, error => {
                    this.$store.commit("error", error);
                });
                this.$http.get("/api/v1/namespaces/" + namespace + "/pods?labelSelector=release=" + this.$route.params.name).then(result => {
                    this.pods = result.body.items
                }, error => {
                    this.$store.commit("error", error);
                })
            }
        }
    }
</script>
