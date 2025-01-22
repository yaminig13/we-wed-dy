<template>
  <v-app :class="isGalleryView?'blur':''">
    <notifications
      position="bottom center"
      classes="alert"
    />
    <Main-Header />
    <router-view />
  </v-app>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";

export default {
  name: "App",
  components: {
    MainHeader,
  },
  computed: {
    isGalleryView() {
      return this.$route.name === 'GuestGallery' || this.$route.name === 'PhotographerGallery';
    },
  },
};
</script>

<style lang="less">

@font-face {
  font-family: "Lobster";
  font-style: normal;
  src:local("Lobster"), url(./fonts/Lobster/Lobster-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Milkshake";
  font-style: normal;
  src:local("Milkshake"), url(./fonts/Milkshake.ttf) format("truetype");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// body {
//   background: url("assets/bg_reduced.jpg") no-repeat center center fixed;
//   background-size: cover;
//   height: 100vh;
// }

.blur {
  .v-application__wrap {
    backdrop-filter: blur(15px);
  }
}

.bg-light{
  background: linear-gradient(
      rgba(0,0, 0, 1),
      rgba(250, 190, 88,0.85);
    ), url("assets/bg_reduced.jpg") no-repeat center center fixed;
      background-size: cover;
}

.vue-notification-group {
  // bottom: 2rem !important;
  // padding: 1rem;

  .vue-notification-template {
    background: orange;
    color: black;
    border-left: 5px solid black;
    padding: 1rem;
  }
}

.v-application {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: Lobster;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: beige;
  background: url("assets/bg_reduced.jpg") no-repeat center center fixed;
  background-size: cover;
}

@keyframes fadein { from { opacity:0; } to { opacity:1; } }

</style>
