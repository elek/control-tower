<template>
    <div v-if="visible">
        <h2>{{image}} versions</h2>
        <p v-for="tag in tags">
            <button class="btn" v-on:click="select(tag.name)">
                {{tag.name}}
            </button>
        </p>
    </div>
</template>

<script>

    export default {

        props: ["image"],
        data() {
            return {
                "visible": false,
                "tags": [],
                "loadedRepository": ""
            }
        },
        name: "docker-selector",
        methods: {
            select(tag) {
              this.visible = false;
              this.$emit('selected',tag);
            },
            reloadTags() {
                this.visible = true;
                if (this.loadedRepository != this.image) {
                    this.$http.get("/docker/v2/repositories/" + this.image + "/tags/").then(result => {
                        this.tags = result.body.results;
                    }, error => {
                        console.log(error)
                    });
                    this.loadedRepository = this.image
                }

            }
        }
    }


</script>
