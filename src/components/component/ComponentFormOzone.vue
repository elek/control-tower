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
                <small class="form-text text-muted">Choose a uniq name. This will be the name of the resrouce in k8s.
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
                    Tag of the docker image to use. Choose a tag from the left
                    side.
                </small>
            </div>
            <h2>Datanode</h2>
            <div class="form-group">
                <label for="values_services_datanode_replicas">Number of
                    datanodes</label>
                <input type="number"
                       v-model="resource.spec.values.services.datanode.replicas"
                       id="values_services_datanode_replicas"
                       class="form-control">
                <small class="form-text text-muted">Number of the datanode
                    instances.
                </small>
            </div>
            <h2>Configuration</h2>


            <config-editor
                    v-model="resource.spec.values.config.coreSite"
                    label="core-site.xml"></config-editor>

            <config-editor
                    v-model="resource.spec.values.config.hdfsSite"
                    label="hdfs-site.xml"></config-editor>

            <config-editor
                    v-model="resource.spec.values.config.ozoneSite"
                    label="ozone-site.xml"></config-editor>

            <config-editor
                    v-model="resource.spec.values.config.log4j"
                    label="log4j.properties"></config-editor>

            <h2>Custom env for all containers</h2>
            <config-editor
                    v-model="resource.spec.values.env"
                    label="Environment variables (KEY: VALUE)"></config-editor>


            <button type="submit" class="btn btn-primary" v-on:click="submit()">
                Submit
            </button>
        </form>
    </div>
        <docker-selector v-on:selected="resource.spec.values.image.tag = $event" ref="docker" v-bind:image="resource.spec.values.image.repository"></docker-selector>
    </div>
</template>

<script>
    import ConfigEditor from '../ConfigEditor'
    import DockerSelector from './DockerSelector'

    export default {
        components: {ConfigEditor, DockerSelector},
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
		"name": "example",
		"labels": {
		   "flokkr.github.io/component" : "ozone"
		}
	},
	"spec": {
		"type": "ozone",
		"values": {
			"image": {
				"repository": "flokkr/ozone",
				"tag": "latest"
			},
			"services": {
				"datanode": {
					"replicas": 3
				}
			},
			"config": {
				"log4j": {
					"log4j.rootLogger": "INFO, stdout",
					"log4j.appender.stdout": "org.apache.log4j.ConsoleAppender",
					"log4j.appender.stdout.layout": "org.apache.log4j.PatternLayout",
					"log4j.appender.stdout.layout.ConversionPattern": "%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n"
				},
				"ozoneSite": {
					"ozone.enabled": "True",
					"ozone.scm.datanode.id": "/data/datanode.id",
					"ozone.metadata.dirs": "/data/metadata",
					"rpc.metrics.quantile.enable": "true",
					"rpc.metrics.percentiles.intervals": "60,300"
				}
			}
		}
	}
}`);
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
