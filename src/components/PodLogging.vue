<template>
   <iframe class="embedded" :src="url"></iframe>
</template>

<script>
export default {
  template: '',
  data() {
    return {
      url: "/api/v1/namespaces/logging/services/kibana/proxy/app/kibana#/discover?_g=()&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'033e4840-9345-11e8-bc4b-21753a237035',key:kubernetes.pod_name,negate:!f,params:(query:demom-ozone-scm-0,type:phrase),type:phrase,value:demom-ozone-scm-0),"+
      "query:(match:(kubernetes.pod_name:(query:"+this.$route.params.name+",type:phrase))))),interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))",
    }
  }
}
</script>
