<template>
    <div class="row">
        <h2>List of namespaces</h2>
        <table class="table table-striped">

            <tr v-for="namespace in namespaces.items"
                v-bind:key="namespace.metadata.ui">
                <td>{{namespace.metadata.name}} ({{namespace.status.phase}})
                    <button v-on:click="select(namespace)"
                            class="btn btn-warning">Select
                    </button>
                </td>
            </tr>
        </table>
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
                this.$store.commit("namespace", namespace.metadata.name)
                this.$router.push("/")
            },
            readNamespaces() {
                this.$http.get("/api/v1/namespaces").then(result => {
                    this.namespaces = result.body;
                }, error => {
                    this.message = error.body.status + " " + error.body.message
                });

            }


        }
    }


</script>
