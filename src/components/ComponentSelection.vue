<template>
    <div class="col-md-12">

        {{message}}
        <h2>Choose a software to install:</h2>
        <div class="card" style="width: 30rem; margin: 1em;"
             v-for="component in components">
            <div class="card-body" style="width: 18rem; margin: 1em;">
                <h5 class="card-title">{{component.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Latest version:
                    {{component.version}}</h6>


                <button class="btn" v-if="component.disabled">Not yet available</button>
                <router-link v-else class="card-link btn btn-warning"
                             :to="{path:'/component/' + component.id +'/new'}">
                    Install
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                components:
                    [
                        {
                            name: 'Apache Hadoop Ozone',
                            id: 'ozone',
                            version: '0.2.1-SNAPSHOT'
                        },
                        {
                            name: 'Apache Hadoop HDFS',
                            id: 'hdfs',
                            version: '3.1.1',
                            disabled: true
                        },
                        {
                            name: 'Apache Hadoop YARN',
                            id: 'yarn',
                            version: '3.1.1',
                            disabled: true

                        },
                        {
                            name: 'Apache Zeppelin',
                            id: 'zeppelin',
                            version: '0.8.0',
                            disabled: true
                        },
                        {
                            name: 'Apache Hadoop Ozone / Freon',
                            id: 'freon',
                            version: '0.2.1-SNAPSHOT',
                        }
                    ]

            }
        }
    }


</script>
