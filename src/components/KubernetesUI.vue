<template>
    <iframe class="embedded" :src="url"></iframe>
</template>

<script>
export default {
    data() {
        return {
            url: "/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/overview?namespace=" + this.$store.state.namespace,
        }
    }
}
</script>
