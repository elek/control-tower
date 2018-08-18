<template>
<iframe class="embedded" :src="url"></iframe>
</template>

<script>
export default {
  data() {
    return {
        url: "/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/pod/" + this.$store.state.namespace +
        "/" + this.$route.params.name + "?namespace=" + this.$store.state.namespace,
    }
  }
}
</script>
