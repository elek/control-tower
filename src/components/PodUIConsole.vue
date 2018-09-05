<template>
<iframe class="embedded" :src="url"></iframe>
</template>
<script>
export default {
  data() {
    return {
      url: "/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/log/"+this.$route.params.namespace+"/"+this.$route.params.name+"/pod?namespace=" + this.$route.params.namespace,
    }
  }
}
</script>
