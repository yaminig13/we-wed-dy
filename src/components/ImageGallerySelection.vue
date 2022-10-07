<template>
  <div class="main-body__gallery-tabs">
        <ul>
          <li>
            <a :href=downloadUrl>
              <Button-Comp button-type="main-body__tabs--A" buttonText="Photos from Photographer" />
            </a>
          </li>
          
          <li v-show="linkValue!=='engagement'">
            <a :href=downloadGuestUrl>
              <Button-Comp button-type="main-body__tabs--B" buttonText="Photos from Guests" />
            </a>
          </li>

          <li v-show="linkValue!=='engagement'">
            <a :href=uploadGuestUrl>
              <Button-Comp button-type="main-body__tabs--C" buttonText="Upload" />
            </a>
          </li>
          <li class="back">
            <i class="fa fa-arrow-circle-o-left" @click="$emit('emitChange','gallery')"></i>
          </li>
        </ul>
        <div class="info" v-show="linkValue!=='engagement'">
          <i class="fa fa-info-circle" @click="triggerNotif"></i>
        </div>
  </div>
</template>

<script>
import ButtonComp from "./ButtonComp.vue";

export default {
  name: "ImageGallerySelection",
  components: {
    ButtonComp,
  },
  data () {
    return {
      uploadGuestUrl: String,
      downloadGuestUrl: String,
      donwloadUrl: String
    }
  },
  mounted() {
    if (this.linkValue=="engagement") {
      this.downloadUrl="https://photos.app.goo.gl/9vMPMxzu68A7h4i58";
      this.uploadGuestUrl="https://photos.app.goo.gl/9vMPMxzu68A7h4i58";
    }
    if (this.linkValue=="haldi") {
      this.downloadUrl="https://photos.app.goo.gl/PPW4PxDAykQ2fDfy9";
      this.uploadGuestUrl="https://dhruvyamini.quickconnect.to/mo/request/vbTsYV0cg";
      this.downloadGuestUrl="https://dhruvyamini.quickconnect.to/mo/sharing/SODCY7lDJ"
    }
    if (this.linkValue=="mehendi") {
      this.downloadUrl="https://photos.app.goo.gl/CvYJ5H8s58LihvPH9";
      this.uploadGuestUrl="https://dhruvyamini.quickconnect.to/mo/request/xxO0RoFfu";
      this.downloadGuestUrl="https://dhruvyamini.quickconnect.to/mo/sharing/kYDLD8lHi"
    }
    if (this.linkValue=="sangeet") {
      this.downloadUrl="https://photos.app.goo.gl/jGonE48y4Xy3rLzo6";
      this.uploadGuestUrl="https://dhruvyamini.quickconnect.to/mo/request/o2KF2g8mv";
      this.downloadGuestUrl="https://dhruvyamini.quickconnect.to/mo/sharing/e6eMKNjDm"
    }
    if (this.linkValue=="wedding") {
      this.downloadUrl="https://photos.app.goo.gl/CSkpmwErZWMXKznx5";
      this.uploadGuestUrl="https://dhruvyamini.quickconnect.to/mo/request/OQtQvL1Fr";
      this.downloadGuestUrl="https://dhruvyamini.quickconnect.to/mo/sharing/mk39vYuhN"
    }
    if (this.linkValue=="other") {
      this.downloadUrl="https://photos.app.goo.gl/MZf93LNkFNpz9AAh7";
      this.uploadGuestUrl="https://dhruvyamini.quickconnect.to/mo/request/xxO0RoFfu";
      this.downloadGuestUrl="https://dhruvyamini.quickconnect.to/mo/sharing/kYDLD8lHi"
    }
    if (this.linkValue!=='engagement') {
      this.triggerNotif();
    }
  },
  props: {
    linkValue: String
  },
  methods: {
    triggerNotif() {
        this.$notify({
        // title: "We want to share as many moments as possible!",
        text: "You can upload photos clicked by your personal device by clicking on 'Upload' button. Photos from other guests and from a professional can be downloaded by clicking on respective buttons.",
        duration: 5000,
        ignoreDuplicates: true
      });
    }
  }
};
</script>
<style lang="less">

    .main-body__gallery-tabs {
      margin: auto 0 0 12px;
      z-index: 1;
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
              // position: absolute;
              font-size: xxx-large;
              // bottom: 5rem;
              // right: 3rem;
            }
        }
      }
    }
</style>

