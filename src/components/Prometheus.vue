<template>
    <iframe class="embedded" :src="url"></iframe>
</template>

<script>
    export default {
        data() {
            return {
                url: "/api/v1/namespaces/monitoring/services/:kube-prometheus:http/proxy/"
            }
        }
    }
</script>
