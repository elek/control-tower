<template>
    <iframe class="embedded" :src="url"></iframe>
</template>

<script>
    export default {
        data() {
            return {
                url: "/api/v1/namespaces/" + this.$store.state.namespace + "/services/grafana-grafana:web/proxy/",
            }
        }
    }
</script>
