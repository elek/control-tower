import Vue from 'vue'
import App from './App.vue'

import Topology from './components/Topology.vue'
import Logging from './components/Logging.vue'
import History from './components/History.vue'
import ComponentNew from './components/ComponentNew.vue'
import ComponentDetail from './components/ComponentDetail.vue'
import ConfigEdit from './components/ConfigEdit.vue'
import Monitoring from './components/Monitoring.vue'
import PodLogging from './components/PodLogging.vue'
import PodStatus from './components/PodStatus.vue'
import PodUIConsole from './components/PodUIConsole.vue'
import KubernetesUI from './components/KubernetesUI.vue'
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
    { path: '/', component: Current },
    { path: '/topology', component: Topology },
    { path: '/logging', component: Logging },
    { path: '/history', component: History },
    { path: '/new/component', component: ComponentNew },
    { path: '/component/:name', component: ComponentDetail },
    { path: '/config/:name', component: ConfigEdit },
    { path: '/monitoring', component: Monitoring },
    { path: '/pod/:name/logging', component: PodLogging },
    { path: '/pod/:name/status', component: PodStatus },
    { path: '/pod/:name/console', component: PodUIConsole },
    { path: '/ui', component: KubernetesUI }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});




new Vue({
  render: h => h(App),
    store: store,
    router: router,
}).$mount('#app');


