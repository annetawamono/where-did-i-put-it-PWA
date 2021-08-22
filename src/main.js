import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { openDB } from 'idb';

Vue.config.productionTip = false;

(async function () {
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  await openDB('wdipi-db1', 1, {
    upgrade(db) {
      db.createObjectStore('houses', { keyPath: 'id', autoIncrement: true });
      db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
    }
  })
})();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
