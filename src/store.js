import Vuex from 'vuex'
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        namespace: "default",
        config: {
            "logging": false,
            "history": false,
            "topology": false
        },
        result: {
            error: false,
            message: ""
        },
    },
    mutations: {
        namespace(state, namespace) {
            state.namespace = namespace
        },
        error(state, message) {
            state.result.error = true;
            state.result.message = message;
        },
        message(state, message) {
            state.result.error = false;
            state.result.message = message;
        },
        resetMessage(state) {
            state.result.error = false;
            state.result.message = "";
        }
    }
});

export default store