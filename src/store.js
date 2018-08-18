import Vuex from 'vuex'
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        namespace: "default"
    },
    mutations: {
        namespace(state, namespace) {
            state.namespace = namespace
        }
    }
});

export default store