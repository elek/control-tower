<template>
    <div>
        <h2>Recent jobs</h2>
        <table class="table-striped table">
            <tr v-for="job in jobs">
                <td>{{job.metadata.labels['flokkr.github.io/instance']}}</td>
                <td>
                    <router-link
                            :to="'/' + namespace + '/pod/' + job.metadata.name + '/console'"
                            class="card-link">{{job.metadata.name}}
                    </router-link>
                </td>
                <td>{{job.status.phase}}</td>
            </tr>
        </table>
    </div>
</template>

<script>

    export default {
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
        },
        props: ["namespace"],
        data() {
            return {
                "jobs": [],
            }
        },
        name: "list-jobs",
        methods: {
            fetchData() {
                this.$http.get("/api/v1/namespaces/" + this.$store.state.namespace + "/pods?labelSelector=flokkr.github.io/task=job").then(result => {
                    var jobs = result.body.items;
                    jobs.sort(function (a, b) {
                        return new Date(a.metadata.creationTimestamp).getTime() > new Date(b.metadata.creationTimestamp).getTime() ? -1 : 1;
                    });
                    this.jobs = jobs

                })
            }
        }
    }


</script>
