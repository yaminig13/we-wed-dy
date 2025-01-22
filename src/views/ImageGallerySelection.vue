<template>
  <v-content class="fill-height">
    <div class="wrapper">
      <div
        class="main-body__gallery-tabs"
      >
        <ul>
          <li>
            <Button-Comp
              button-type="main-body__tabs--A"
              :button-text="linkValue == 'engagement' ? 'Photos' : 'Photos from Photographer'"
              @click="photographerChosen()"
            />
          </li>

          <li v-show="linkValue!=='engagement'">
            <button-comp
              button-type="main-body__tabs--B"
              button-text="Photos from Guests"
              @click="guestsChosen"
            />
          </li>
        </ul>
      </div>
    </div>
  </v-content>
</template>

<script>
import ButtonComp from "../components/ButtonComp.vue";

export default {
  name: "ImageGallerySelection",
  components: {
    ButtonComp,
  },
  props: {
    linkValue: String
  },
  data() {
    return {
    }
  },
  methods: {
    guestsChosen() {
      if (this.linkValue!=='engagement') {
        this.triggerNotif();
        this.$router.push({ name: 'GuestGallery', params: { linkValue: this.linkValue } });

      }
    },
    photographerChosen() {
      this.$router.push({ name: 'PhotographerGallery', params: { linkValue: this.linkValue } });
    },
    triggerNotif() {
      this.$notify({
        // title: "We want to share as many moments as possible!",
        text: "We would love to collect photos clicked by you! You can also download photos shared by other guests!",
        duration: 5000,
        ignoreDuplicates: true
      });
    }
  }
};
</script>
<style lang="less">

    .main-body__gallery-tabs {
      width: 80%;
      opacity: 0;
      animation: appear 1s forwards;

      .info {
        position: absolute;
        bottom: 0;
        padding: 2rem;
        color: orange;
        font-size: 2.5rem;
        right: 0;
      }
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
        }
        i {
            font-size:xx-large;
            color: orange;
            cursor: pointer;
            @media (max-width:480px) {
              // position: absolute;
              font-size: xxx-large;
              // bottom: 5rem;
              // right: 3rem;
            }
        }
      }
    }
</style>

