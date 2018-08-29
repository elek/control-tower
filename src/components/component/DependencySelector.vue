<template>
    <div v-if="visible">
        <h2>{{component}} services</h2>
        <p v-for="component in components">
            <button class="btn" v-on:click="select(component)">
                {{component.metadata.name}}
            </button>
        </p>
    </div>
</template>

<script>

    export default {
        props: ["component"],
        data() {
            return {
                "visible": false,
                "components": [],
            }
        },
        name: "dependency-selector",
        methods: {
            select(component) {
                this.visible = false;
                this.$emit('selected', component.metadata.name);
                this.$emit('repository', component.spec.values.image.repository);
                this.$emit('tag', component.spec.values.image.tag);
            },
            reload() {
                this.visible = true;
                this.$http.get("/apis/flokkr.github.io/v1alpha1/namespaces/" + this.$store.state.namespace + "/components").then(result => {

                    this.components = result.body.items;
                })
            }
        }
    }


</script>
