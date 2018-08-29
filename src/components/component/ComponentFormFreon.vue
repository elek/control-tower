<template>
    <div class="row">
        <div class="col-md-8">

            {{message}}
            <h1>Installing {{$route.params.id}}</h1>
            <form>
                <div class="form-group">
                    <label for="metadata_name">Name of the installation</label>
                    <input type="text"
                           v-model="resource.metadata.name"
                           id="metadata_name" class="form-control">
                    <small class="form-text text-muted">Choose a unique name. This
                        will be the name of the resrouce in k8s.
                    </small>
                </div>

                <h2>Dependencies</h2>
                <div class="form-group">
                    <label for="values_image_tag">Ozone service</label>
                    <div class="input-group">
                        <input type="text"
                               v-model="resource.spec.values.dependencies.ozone"
                               id="values_dependency_ozone" class="form-control">
                        <button type="button" @click="$refs.dependencyozone.reload()"
                                class="btn btn-warning">List ozone clusters
                        </button>
                    </div>
                    <small class="form-text text-muted">Name of the ozone installation to use.
                    </small>
                </div>

                <h2>Docker parameters</h2>
                <div class="form-group">
                    <label for="values_image_repository">Docker image</label>
                    <div class="input-group">
                        <input type="text"
                               v-model="resource.spec.values.image.repository"
                               v-on:blur="$refs.docker.reloadTags()"
                               id="values_image_repository" class="form-control"
                               placeholder="Docker image"/>
                        <button type="button" @click="$refs.docker.reloadTags()"
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
                        Tag of the docker image to use.
                    </small>
                </div>
                <h2>Freon instance</h2>
                <div class="form-group">
                    <label for="values_services_datanode_replicas">Number of
                        instances</label>
                    <input type="number"
                           v-model="resource.spec.values.services.freon.replicas"
                           id="values_services_datanode_replicas"
                           class="form-control">
                    <small class="form-text text-muted">Number of the freon
                        instances.
                    </small>
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="submit()">
                    Submit
                </button>
            </form>
        </div>
        <div class="col-md-4">
            <docker-selector v-on:selected="resource.spec.values.image.tag = $event"
                             ref="docker"
                             v-bind:image="resource.spec.values.image.repository"></docker-selector>
            <dependency-selector v-on:selected="resource.spec.values.dependencies.ozone=$event"
                                 v-on:repository="resource.spec.values.image.repository=$event"
                                 v-on:tag="resource.spec.values.image.tag=$event"
                                 ref="dependencyozone"
                                 component="ozone"></dependency-selector>
        </div>
    </div>

</template>

<script>
    import DockerSelector from './DockerSelector'
    import DependencySelector from './DependencySelector'

    export default {
        components: {DockerSelector, DependencySelector},
        data() {
            return {
                message: '',
                resource: JSON.parse(`
{
	"apiVersion": "flokkr.github.io/v1alpha1",
	"kind": "Component",
	"metadata": {
		"name": "freon"
	},
	"spec": {
		"type": "freon",
		"values": {
			"image": {
				"repository": "flokkr/ozone",
				"tag": "latest"
			},
			"services": {
				"freon": {
					"replicas": 1
				}
			},
			"dependencies": {
				"ozone": ""
			}
		}
	}
}
                `),
            }
        },
        methods: {
            submit() {
                // eslint-disable-next-line
                this.$http.post("/apis/flokkr.github.io/v1alpha1/namespaces/" + this.$store.state.namespace + "/components", this.resource).then(post => {
                    this.message = "Message saved successfully."
                }, error => {
                    this.message = error.body.status + " " + error.body.message
                })
            },
            fetchData() {
                this.error = this.post = null;
                this.loading = true
                // replace `getPost` with your data fetching util / API wrapper

            }
        }
    }


</script>
