<template>
    <div class="row">
        <div class="content col-md-10">
            <h2>List of namespaces</h2>
            <div class="card" style="width: 18rem; margin: 1em;"
                 v-for="namespace in namespaces.items"
                 v-bind:key="namespace.metadata.ui">
                <div class="card-body">
                    <h5 class="card-title">{{namespace.metadata.name}}</h5>
                    <div class="card-text">
                        <p>
                            {{namespace.metadata.annotations["flokkr.github.io/description"]}}
                        </p>
                    <button v-on:click="select(namespace)"
                            class="btn btn-warning">Select
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        components: {},
        data() {
            return {
                namespaces: []
            }
        },
        created() {
            this.readNamespaces();
        },
        methods: {
            select(namespace) {
                this.$store.commit("namespace", namespace.metadata.name);
                this.$router.push("/" + namespace.metadata.name + "/status")
            },
            readNamespaces() {
                this.$http.get("/api/v1/namespaces?labelSelector=flokkr.github.io/managed=true").then(result => {
                    this.namespaces = result.body;
                }, error => {
                    this.$store.commit("error", error.body.status + " " + error.body.message)
                });
            }
        }
    }
</script>
