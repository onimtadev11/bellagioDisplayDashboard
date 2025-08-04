import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';    // make sure this points to your Vuex store setup file
import router from './router';

router.beforeEach((to, from) => {
  // your navigation guards if any
});

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
