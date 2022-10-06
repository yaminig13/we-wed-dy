<template>
  <div class="main-body__gallery-tabs">
        <ul>
          <li>
            <a :href=url>
              <Button-Comp button-type="main-body__tabs--A" buttonText="Download / View" />
            </a>
          </li>
          <li v-if="linkValue!=='engagement'">
            <Button-Comp button-type="main-body__tabs--B" buttonText="Upload" />
          </li>
          
          <li class="back">
            <i class="fa fa-arrow-circle-o-left" @click="$emit('emitChange','gallery')"></i>
          </li>
        </ul>
      </div>
</template>

<script>
import ButtonComp from "./ButtonComp.vue";

export default {
  name: "ImageGallerySelection",
  components: {
    ButtonComp
  },
  data () {
    return {
      url: String
    }
  },
  mounted() {
    if (this.linkValue=="engagement") {
      this.url="https://photos.app.goo.gl/9vMPMxzu68A7h4i58";
    }
  },
  props: {
    linkValue: String
  }
};
</script>
<style lang="less">

    .main-body__gallery-tabs {
      margin: auto 0 0 12px;
      z-index: 1;
      width: 80%;
      opacity: 0;
      animation: appear 2s forwards;

      ul { 
        padding: 0px; 
        margin: 0px; 
        list-style: none; 
        display: flex; 
        flex-wrap: wrap;
        justify-content: center;

        li {
          padding-right: 10px;
          padding-bottom: 10px;
          align-self: center;

          &.back {
            display: flex;
            justify-content: center;
            @media (max-width:480px) {
                width: 100%;
            }
          }
        }
        i {
            font-size:xx-large;
            color: orange;
            cursor: pointer;
            @media (max-width:480px) {
                color:beige;
            }
        }
      }
    }
</style>

