<template>
    <iframe class="embedded" :src="url"></iframe>
</template>

<script>
    export default {
        data() {
            return {
                url: "",
            }
        },
        created(){
            this.url = "/api/v1/namespaces/" + this.$store.state.namespace + "/services/grafana-grafana:web/proxy/";
            if (this.$route.query.page) {
                this.url += this.$route.query.page;
            }

        }
    }
</script>
