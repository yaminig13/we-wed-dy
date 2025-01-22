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
      // uploadGuestUrl: String,
      // downloadGuestUrl: String,
      // photoUrl: String,
      // isGuestButtonClicked: false,
    }
  },
  mounted() {
    // if (this.linkValue=="engagement") {
    //   this.photoUrl="https://photos.app.goo.gl/9vMPMxzu68A7h4i58";
    //   this.uploadGuestUrl="https://photos.app.goo.gl/9vMPMxzu68A7h4i58";
    // }
    // if (this.linkValue=="haldi") {
    //   this.photoUrl="https://photos.app.goo.gl/PPW4PxDAykQ2fDfy9";
    //   this.uploadGuestUrl="https://dhruvgupta.smugmug.com/upload/4ccCcs/dhruvyaminihaldi";
    //   this.downloadGuestUrl="https://dhruvgupta.smugmug.com/Haldi/n-xs7rv4"
    // }
    // if (this.linkValue=="mehendi") {
    //   this.photoUrl="https://photos.app.goo.gl/CvYJ5H8s58LihvPH9";
    //   this.uploadGuestUrl="https://dhruvgupta.smugmug.com/upload/9SBndc/dhruvyaminimehendi";
    //   this.downloadGuestUrl="https://dhruvgupta.smugmug.com/Mehendi/n-tXC6tg"
    // }
    // if (this.linkValue=="sangeet") {
    //   this.photoUrl="https://photos.app.goo.gl/jGonE48y4Xy3rLzo6";
    //   this.uploadGuestUrl="https://dhruvgupta.smugmug.com/upload/VbF4mm/dhruvyaminisangeet";
    //   this.downloadGuestUrl="https://dhruvgupta.smugmug.com/Sangeet/n-2C3mS9"
    // }
    // if (this.linkValue=="wedding") {
    //   this.photoUrl="https://photos.app.goo.gl/CSkpmwErZWMXKznx5";
    //   this.uploadGuestUrl="https://dhruvgupta.smugmug.com/upload/5FPZWf/dhruvyaminiwedding";
    //   this.downloadGuestUrl="https://dhruvgupta.smugmug.com/Wedding-Reception/n-fkD4PK"
    // }
    // if (this.linkValue=="other") {
    //   this.photoUrl="https://photos.app.goo.gl/MZf93LNkFNpz9AAh7";
    //   this.uploadGuestUrl="https://dhruvgupta.smugmug.com/upload/d59c7s/dhruvyaminisonstiges";
    //   this.downloadGuestUrl="https://dhruvgupta.smugmug.com/Other-Functions/n-chFGSH"
    // }
  },
  methods: {
    guestsChosen() {
      if (this.linkValue!=='engagement') {
        this.triggerNotif();
        // this.$emit('emitChange','guestGallery',this.linkValue)
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

