import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Styles
import "./styles/styles.scss";

Vue.config.productionTip = false

new Vue({
  created() {
    this.$store.dispatch({ type: "loadStations" });
  },
  router,
  store,
  render: h => h(app)
}).$mount('#app')
