import Vue from 'vue'
import App from './App.vue'
import {router} from './_helpers'
import {store} from './_store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import { ValidationProvider } from 'vee-validate';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
