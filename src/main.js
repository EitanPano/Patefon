import Vue from "vue";
import app from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import VueYoutube from "vue-youtube";
Vue.use(VueYoutube);

// Styles
import "./styles/styles.scss";

Vue.config.productionTip = false;

new Vue({
  created() {
    this.$store.dispatch({ type: "loadStations", filterBy: {} });
    this.$store.dispatch({ type: "loadUser"});
  },
  router,
  store,
  render: (h) => h(app),
}).$mount("#app");

//////////////////////////BAD SHIT /////////////////
// if (filterBy.txt) {
//   var expandedStations;
//   expandedStations["songs"] = stations.map((station) => {
//     var songs =
//       station.songs.filter((song) =>
//         song.title.toLowerCase().includes(filterBy.txt.toLowerCase())
//       ) || [];
//   });
//   console.log(' expandedStations["songs"]', expandedStations["songs"]);
//   if (expandedStations.songs.length) {
//     expandedStations["stations"] = stations.map((station) => {
//       expandedStations.songs.forEach((song) => {
//         if (
//           station.songs.includes(song) &&
//           !data.stations.includes(station)
//         ) {
//           expandedStations.push(station);
//         }
//         if (data.songs.has(song)) return;
//         console.log("song34567", song);
//       });
//     });
//   }
