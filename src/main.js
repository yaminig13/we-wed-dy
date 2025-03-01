import { createApp } from 'vue'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import vClickOutside from "click-outside-vue3"

// Import regarding PWA
import './registerServiceWorker'

// Import for router
import { createRouter, createWebHistory } from 'vue-router'

// Import of all views
import MainView from './views/MainView';


const router = createRouter({
    history: createWebHistory(), 
    routes: [
        { path:'/', component: MainView },
    ]
});

const app = createApp(App);

app.use(router);
app.use(Notifications);
app.use(vClickOutside);
app.mount('#app');
