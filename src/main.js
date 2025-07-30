import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';


router.beforeEach((to, from) => {

});

createApp(App)
    .use(router)
    .mount('#app');
