<template>
    <div class="post">
        <div class="loading" v-if="loading">
            Loading...
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>
        <div class="row">
            <div class="content col-md-6">
                <h2>Installed components</h2>
                <div class="card" style="width: 18rem; margin: 1em;" v-for="item in post.body.items">
                    <div class="card-body">
                        <h5 class="card-title">{{item.spec.type}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{item.metadata.name}}</h6>
                        <p class="card-text">Namespace: {{item.metadata.namespace}}</p>
                        <router-link
                                :to="{path:'/' + namespace + '/component/' + item.metadata.name }"
                                class="card-link">Details
                        </router-link>
                        <router-link
                                :to="{path:'/' + namespace + '/component/' + item.spec.type + '/' + item.metadata.name +'/edit'}"
                                class="card-link">Edit
                        </router-link>
                        <a href="#" class="card-link" @click="remove(item)">Delete</a>
                    </div>
                </div>
                <router-link :to="'/' + namespace + '/new/component/select'"
                             class="btn btn-warning">Install new component
                </router-link>
                <router-link to="/" class="btn btn-danger" style="margin-left: 20px;">Switch
                    namespace
                </router-link>
            </div>
            <div class="col-md-6">
                <list-jobs v-bind:namespace="namespace"></list-jobs>
            </div>
        </div>
    </div>
</template>


<script>
    import ListJobs from './ListJobs'

    export default {
        components: {ListJobs},
        computed: {
            namespace: function () {
                return this.$route.params.namespace;
            }
        },
        data() {
            return {
                loading: false,
                post: null,
                error: null
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
            remove(item) {
                var url = "/apis/flokkr.github.io/v1alpha1/namespaces/" + item.metadata.namespace + "/components/" + item.metadata.name
                this.$http.delete(url).then(ok => {
                    this.fetchData()
                }, error => {
                    this.error = error
                })
            },
            fetchData() {
                this.error = this.post = null
                this.loading = true
                // replace `getPost` with your data fetching util / API wrapper
                this.$http.get("/apis/flokkr.github.io/v1alpha1/namespaces/" + this.$store.state.namespace + "/components").then(post => {
                    this.loading = false
                    this.post = post
                }, error => {
                    this.loading = false
                    this.error = error
                })
            }
        }
    }
</script>