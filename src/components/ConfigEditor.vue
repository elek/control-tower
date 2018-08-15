<template>
    <div class="form-group">
        <label for="values_config_coresite">{{label}}</label>
        <textarea v-model="editablestr" class="form-control"
                  id="values_config_coresite"
                  rows="12"></textarea>
    </div>
</template>
<script>

    export default {
        props: ['value', 'label'],
        data: function () {
            return {
                'editablestr': ''
            }
        },
        created: function () {
            this.editablestr = '';
            this.tostr()
        },
        watch: {
            editablestr: function (newvalue) {
                const res = {};
                if (newvalue) {
                    const lines = newvalue.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        var trimmed = lines[i].trim()
                        if (trimmed.length > 0) {
                            var seppos = trimmed.indexOf(":");
                            var key = trimmed.substr(0, seppos);

                            var value = trimmed.substr(seppos + 1, trimmed.length - 1).trim();
                            res[key] = value
                        }
                    }
                }
                this.$emit('input', res)
            }
        },
        methods: {
            tostr() {
                var str = '';
                if (this.value) {
                    for (const [key, value] of Object.entries(this.value)) {
                        str += key + ': ' + value + '\n'
                    }
                }
                this.editablestr = str;
            }
        },
        name: 'ConfigEditor',

    }
</script>