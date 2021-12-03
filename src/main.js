import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueYoutube from 'vue-youtube'
Vue.use(VueYoutube)

// Styles
import "./styles/styles.scss";

Vue.config.productionTip = false

new Vue({
  created() {
    this.$store.dispatch({ type: "loadStations", filterBy: {} });
  },
  router,
  store,
  render: h => h(app)
}).$mount('#app')
