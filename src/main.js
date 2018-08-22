import Vue from 'vue'
import App from './App.vue'

import Topology from './components/Topology.vue'
import Logging from './components/Logging.vue'
import History from './components/History.vue'
import ComponentFormCustom from './components/component/ComponentFormCustom.vue'
import ComponentForm from './components/component/ComponentForm.vue'
import ComponentFormFreon from './components/component/ComponentFormFreon.vue'
import ComponentFormOzone from './components/component/ComponentFormOzone.vue'
import ComponentDetail from './components/component/ComponentDetail.vue'
import ComponentSelection from './components/component/ComponentSelection.vue'
import ConfigEdit from './components/ConfigEdit.vue'
import Monitoring from './components/Monitoring.vue'
import PodLogging from './components/PodLogging.vue'
import PodStatus from './components/PodStatus.vue'
import PodUIConsole from './components/PodUIConsole.vue'
import KubernetesUI from './components/KubernetesUI.vue'
import Prometheus from './components/Prometheus.vue'
import SelectNamespace from './components/namespace/Select.vue'
import store from './store.js'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueResource);

import Current from './components/Current.vue'

const routes = [
    {path: '/:namespace/status', component: Current},
    {path: '/', component: SelectNamespace},
    {path: '/:namespace/topology', component: Topology},
    {path: '/:namespace/logging', component: Logging},
    {path: '/:namespace/history', component: History},
    {path: '/:namespace/new/customcomponent', component: ComponentFormCustom},
    {path: '/:namespace/new/component/select', component: ComponentSelection},
    {path: '/:namespace/component/ozone/new', component: ComponentFormOzone},
    {path: '/:namespace/component/freon/new', component: ComponentFormFreon},
    {path: '/:namespace/component/:type/new', component: ComponentForm},
    {
        path: '/:namespace/component/ozone/:id/edit',
        component: ComponentFormOzone
    },
    {path: '/:namespace/component/:type/:id/edit', component: ComponentForm},
    {path: '/:namespace/component/:name', component: ComponentDetail},
    {path: '/:namespace/config/:name', component: ConfigEdit},
    {path: '/:namespace/monitoring', component: Monitoring},
    {path: '/:namespace/pod/:name/logging', component: PodLogging},
    {path: '/:namespace/pod/:name/status', component: PodStatus},
    {path: '/:namespace/pod/:name/console', component: PodUIConsole},
    {path: '/:namespace/ui', component: KubernetesUI},
    {path: '/:namespace/prometheus', component: Prometheus}
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    if (to.params.namespace) {
        store.commit('namespace', to.params.namespace);
    }
    next()
});

new Vue({
    render: h => h(App),
    store: store,
    router: router,
}).$mount('#app');


