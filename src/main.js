import { createApp } from 'vue'
import App from './App.vue'


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
app.mount('#app');
