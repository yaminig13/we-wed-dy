<template>
  <Main-Header></Main-Header>
  <router-view></router-view>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";

export default {
  name: "App",
  components: {
    MainHeader,
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
  box-sizing: border-box;
}

body {
  margin: 0px; 
  background: url("assets/bg_reduced.jpg") no-repeat center center fixed;
  background-size: cover; 
}

.bg-light{
  background: linear-gradient(
      rgba(0,0, 0, 1), 
      rgba(250, 190, 88,0.85);
    ), url("assets/bg_reduced.jpg") no-repeat center center fixed;
      background-size: cover; 

}
// body::before { 
//   content: ""; 
//   background: url("assets/bg.JPG") no-repeat center center fixed; 
//   background-size: cover; 
//   background-color: black; 
//   position: absolute; 
//   top: 0px; 
//   right: 0px; 
//   bottom: 0px; 
//   left: 0px;

// }

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: Lobster;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: beige;
  height: 100vh;

}

@keyframes fadein { from { opacity:0; } to { opacity:1; } }

</style>
