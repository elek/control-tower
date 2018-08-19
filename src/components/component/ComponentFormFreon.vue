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
                <small class="form-text text-muted">Choose a uniq name. This
                    will be the name of the resrouce in k8s.
                </small>
            </div>
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
            <div class="form-group">
                <label for="values_image_tag">Config map name</label>
                <input type="text"
                       v-model="resource.spec.values.configmap"
                       id="values_configmap" class="form-control">
                <small class="form-text text-muted">Name of the
                    configmap of the ozonecluster (ususally clustername-config).
                </small>
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="submit()">
                Submit
            </button>
        </form>
    </div>
        <docker-selector v-on:selected="resource.spec.values.image.tag = $event"
                         ref="docker"
                         v-bind:image="resource.spec.values.image.repository"></docker-selector>
    </div>

</template>

<script>
    import DockerSelector from './DockerSelector'

    export default {
        components: {DockerSelector},
        data() {
            return {
                message: '',
                resource: JSON.parse(`{
  "apiVersion": "flokkr.github.io/v1alpha1",
  "kind": "Component",
  "metadata": {
    "name": "example"
  },
  "spec": {
    "type": "freon",
    "values": {
      "image": {
        "repository": "flokkr/ozone",
        "tag": "latest"
      }
    }
  }
}`),
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
