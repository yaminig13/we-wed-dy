<template>
  <button :class="{'hovered':hovered}" @mouseenter="hovered=true" @mouseleave="hovered=false">
    <i class="fas fa-map-marker-alt" v-if="buttonType=='main-body__tabs--location'"></i>
    <i class="fas fa-images" v-if="buttonType=='main-body__tabs--gallery'"></i>
    <i class="far fa-calendar-alt" v-if="buttonType=='main-body__tabs--schedule'"></i>
    {{ buttonText }}
  </button>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: "ButtonComp",
  props: {
    buttonType: String,
    buttonText: String,
  },
  data(){
    return {
      hovered: false
    }
  }
};
</script>
<style lang="less">
button {

  .fa-map-marker {
    color: black;
  }
  background-color: orange;
  color: beige;
  font-family: Lobster;
  padding: 10px;
  min-width: 80px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px outset beige; 

  @media (max-width:480px) {
    font-size: .875rem;
  }

  &.hovered {
    background: beige;
    color:orange;
    border: 2px outset orange; 

  }
}
</style>

