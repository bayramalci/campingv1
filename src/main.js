// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css'; // Optional: Include global CSS styles

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
