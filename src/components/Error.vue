<template>
    <div v-if="message" class="alert"
         v-bind:class="{'alert-danger':error, 'alert-warning':!error}">
        {{message}}
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                message: "",
                error: false,
            }
        },
        updated() {
            this.error = this.$store.state.result.error;
            this.message = this.$store.state.result.message;
            this.$store.commit("resetMessage");
        },
        created() {
            this.error = this.$store.state.result.error;
            this.message = this.$store.state.result.message;
            this.$store.commit("resetMessage");

        }
    }
</script>
