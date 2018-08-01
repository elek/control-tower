<template>
<iframe class="embedded" :src="url"></iframe>
</template>

<script>
export default {
  data() {
    return {
      url: "/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/pod/"+namespace+"/"+this.$route.params.name+"?namespace=" + namespace,
    }
  }
}
</script>
