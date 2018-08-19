<template>
    <div class="col-md-4">
        <h2>{{image}} versions</h2>
        <p v-for="tag in tags">
            <button class="btn" v-on:click="$emit('selected',tag.name)">
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
                "tags": [],
                "loadedRepository": ""
            }
        },
        name: "docker-selector",
        methods: {
            reloadTags() {
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
