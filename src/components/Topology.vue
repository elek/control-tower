<template>
    <iframe class="embedded" :src="url"></iframe>
</template>
<script>
    export default {
        data() {
            return {
                url: "/api/v1/namespaces/weave/services/weave-scope-app:app/proxy/#!/state/{%22pausedAt%22:%222018-07-29T20:59:21Z%22,%22topologyId%22:%22pods%22,%22topologyOptions%22:{%22pods%22:{%22namespace%22:[%22" + this.$store.state.namespace + "%22]}}}",
            }
        }
    }
</script>
