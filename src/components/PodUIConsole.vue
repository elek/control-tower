<template>
<iframe class="embedded" :src="url"></iframe>
</template>
<script>
var namespace = 'ozoneweekly'
export default {
  data() {
    return {
      url: "/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/log/"+namespace+"/"+this.$route.params.name+"/pod?namespace=" + namespace,
    }
  }
}
</script>
