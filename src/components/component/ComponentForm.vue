<template>
    <div class="row">
        <div class="col-md-8">

        {{message}}
        <h1>Installing {{$route.params.type}}</h1>
        <form>
            <div class="form-group">
                <label for="metadata_name">Name of the installation</label>
                <input type="text"
                       v-model="resource.metadata.name"
                       id="metadata_name" class="form-control">
                <small class="form-text text-muted">Choose a uniq name. This will be the name of the resrouce in k8s.
                </small>
            </div>
            <div class="form-group">
                <label for="values_image_repository">Docker image</label>
                <div class="input-group">
                    <input type="text"
                           v-model="resource.spec.values.image.repository"
                           v-on:blur="reloadTags()"
                           id="values_image_repository" class="form-control"
                           placeholder="Docker image"/>
                    <button type="button" @click="reloadTags()"
                            class="btn btn-warning">Reload tags
                    </button>
                </div>
                <small class="form-text text-muted">Name of the
                    docker images to use.
                </small>
            </div>
            <div class="form-group">
                <label for="values_image_tag">Docker tag</label>
                <input type="text"
                       v-model="resource.spec.values.image.tag"
                       id="values_image_tag" class="form-control">
                <small class="form-text text-muted">Name of the
                    Tag of the docker image to use. Choose a tag from the left
                    side.
                </small>
            </div>


            <button type="submit" class="btn btn-primary" v-on:click="submit()">
                Submit
            </button>
        </form>
    </div>
        <div class="col-md-4">
            <h2>flokkr/ozone versions</h2>
            <p v-for="tag in tags">
                <button class="btn" v-on:click="setLabel(tag.name)">
                    {{tag.name}}
                </button>
            </p>
        </div>
    </div>
</template>

<script>
    import ConfigEditor from '../ConfigEditor'

    export default {
        components: {ConfigEditor},
        data() {
            return {
                message: '',
                editMode: false,
                resource: {},
                tags: [],
                loadedRepository: "",
            }
        },
        created() {
            if (this.$route.params.id) {
                this.editMode = true;
                this.$http.get("/apis/flokkr.github.io/v1alpha1/namespaces/" + this.$store.state.namespace + "/components/" + this.$route.params.id).then(result => {
                    this.resource = result.body;
                    if (!this.resource.spec.values.config) {
                        this.resource.spec.values.config = {}
                    }
                }, error => {
                    this.message = error.body.status + " " + error.body.message
                });
            } else {
                this.resource = JSON.parse(`{
	"apiVersion": "flokkr.github.io/v1alpha1",
	"kind": "Component",
	"metadata": {
		"name": "example"
	},
	"spec": {
		"type": "ozone",
		"values": {
			"image": {
				"repository": "flokkr/hadoop",
				"tag": "latest"
			}
		}
	}
}`);
                    this.resource.spec.type = this.$route.params.type;
                this.resource.spec.values.image.repository = "flokkr/" + this.$route.params.type;
            }
            this.reloadTags()
        },
        methods: {
            reloadTags() {
                if (this.loadedRepository != this.resource.spec.values.image.repository) {
                    this.$http.get("/docker/v2/repositories/" + this.resource.spec.values.image.repository + "/tags/").then(result => {
                        this.tags = result.body.results;
                    }, error => {
                        this.message = error.body.status + " " + error.body.message
                    });
                    this.loadedRepository = this.resource.spec.values.image.repository
                }

            },
            setLabel(tag) {
                this.resource.spec.values.image.tag = tag;
            },
            submit() {
                if (this.editMode) {
                    // eslint-disable-next-line
                    this.$http.put("/apis/flokkr.github.io/v1alpha1/namespaces/" + this.$store.state.namespace + "/components/" + this.$route.params.id, this.resource).then(post => {
                        this.message = "Message saved successfully."
                    }, error => {
                        this.message = error.body.status + " " + error.body.message
                    })
                } else {
                    // eslint-disable-next-line
                    this.$http.post("/apis/flokkr.github.io/v1alpha1/namespaces/" + this.$store.state.namespace + "/components", this.resource).then(post => {
                        this.message = "Message saved successfully."
                    }, error => {
                        this.message = error.body.status + " " + error.body.message
                    })
                }
            },
            fetchData() {
                this.error = this.post = null;
                this.loading = true
                // replace `getPost` with your data fetching util / API wrapper

            }
        }
    }


</script>
