import { createApp } from 'vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import vClickOutside from "click-outside-vue3"

// Import regarding PWA
import './registerServiceWorker'

// Import for router
import { createRouter, createWebHistory } from 'vue-router'

// Import of all views
import MainView from './views/MainView';
import GuestGallery from './views/GuestGallery.vue'
import ImageGallery from './views/ImageGallery.vue'
import ImageGallerySelection from './views/ImageGallerySelection.vue'
import ScheduleList from './views/ScheduleList.vue'

const vuetify = createVuetify({
  components,
  directives,
})


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainView },
    { path: '/schedule/', component: ScheduleList },
    { path: '/guestGallery/:linkValue', name: 'GuestGallery', component: GuestGallery, props: true },
    { path: '/photographerGallery/:linkValue', name: 'PhotographerGallery', component: GuestGallery, props: true },
    { path: '/gallery/', component: ImageGallery },
    { path: '/gallerySelection/:linkValue', component: ImageGallerySelection, props: true }
  ]
});

const app = createApp(App);

app.use(router);
app.use(Notifications);
app.use(vClickOutside);
app.use(vuetify);
app.mount('#app');
