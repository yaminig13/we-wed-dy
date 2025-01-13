<template>
  <div class="main-wrapper" :class="{'large-wrapper':isScheduleView}">
   
    <div class="main-body">
      <div class="main-body__tabs" v-if="isMainView && !liveVisible">
        <ul>
          <li>
            <Button-Comp button-icon="far fa-calendar-alt" button-type="main-body__tabs--schedule" buttonText="Schedule" @click="changeView('schedule')"/>
          </li>
          <li>
            <!-- <router-link to="/imageGallery"> -->
            <Button-Comp button-icon="fas fa-images" button-type="main-body__tabs--gallery" buttonText="Gallery" @click="changeView('gallery')"/>
            <!-- </router-link> -->
          </li>
          <li>
            <a href="https://maps.app.goo.gl/aJ3t7gXUnWjrPi5f6?g_st=iw">
              
              <Button-Comp button-icon="fas fa-map-marker-alt" button-type="main-body__tabs--location" buttonText="Location"/>
            </a>
          </li>

          <li >
            <!-- <a href="https://www.youtube.com/channel/UC79dNC2qJy5Qk9rWUF4pr5w"> -->
              
              <Button-Comp button-icon="fas fa-stream" button-type="main-body__tabs--live" buttonText="LiveStream" @click="triggerNotif"/>
            <!-- </a> -->
          </li>
        </ul>
      </div>

      <Image-Gallery v-if="isGalleryView" @emitChange="changeView"></Image-Gallery>

      <Schedule-List v-if="isScheduleView" @emitChange="changeView"></Schedule-List>

      <image-gallery-selection v-if="isGallerySelectionView" @emitChange="changeView" :linkValue="linkValue"/>

      <guest-gallery v-if="isGuestGalleryView" @emitChange="changeView" :linkValue="linkValue"></guest-gallery>
      <div v-click-outside="clickedOutside" class="install-notif__wrapper" ref="installNotif" v-show="showInstallNotif">
        <div class="install-notif">
          Install this webapp on your iOS device from Safari: Tap <i class="fa-solid fa-arrow-up-from-bracket"></i> 
           and then 'Add to Homescreen'
        </div>
      
        <i class="fa-solid fa-caret-down"></i>
      </div>
    </div>
  </div>

  <div class="live-notif" v-if="liveVisible" v-click-outside="hideNotif">
    Live Stream will start on the day of the event on this YouTube channel.
    <a href="https://youtube.com/c/AshutoshRubber">
      <ButtonComp buttonText="Redirect to YouTube" button-icon="fa fa-external-link"></ButtonComp>
    </a>
    <span class="caption">
      We sincerely thank "Ashutosh Rubber" for streaming the events.
    </span>
    <span class="icon-close">
      <i class="fa fa-window-close" @click="hideNotif"></i>
    </span>
  </div>
</template>

<script>
import GuestGallery from "@/components/GuestGallery.vue";
import ButtonComp from "../components/ButtonComp.vue";
import ImageGallery from "../components/ImageGallery.vue";
import ImageGallerySelection from "../components/ImageGallerySelection.vue";
import ScheduleList from "@/components/ScheduleList.vue";

export default {
  name: "MainView",
  components: {
    ButtonComp,
    ImageGallery,
    ScheduleList,
    ImageGallerySelection,
    GuestGallery
  },
  data() {
    return {
      isGalleryView: false,
      isMainView: true,
      isScheduleView: false,
      isGallerySelectionView: false,
      isGuestGalleryView:false,
      eventData: {},
      linkValue: '',
      showInstallNotif: false,
      liveVisible: false
    }
  },
  mounted() {
    if( this.isIOS && !this.isApp ){
      this.showInstallNotif=true;
    }
    if(this.showInstallNotif) {
      setTimeout(() => {
        // const box = document.getElementById('box');
        const box = this.$refs.installNotif;
        // 👇️ removes element from DOM
        box.style.display = 'none';

        // 👇️ hides element (still takes up space on page)
        // box.style.visibility = 'hidden';
      }, 30000); 
    }
  },
  computed: {
    isIOS() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    },
    isApp(){
      return (('standalone' in window.navigator) && (window.navigator.standalone));
    }
  },
  methods:{
    clickedOutside() {
      this.showInstallNotif = false;
    },
    hideNotif() {
      this.liveVisible = false;
      document.body.classList.remove('blur');
    },
    triggerNotif() {
      this.liveVisible=true;
      document.body.classList.add('blur');
    },
    changeView(view,button) {
      this.isMainView=false;
      this.isGalleryView=false;
      this.isScheduleView=false;
      this.isGallerySelectionView=false;
      this.isGuestGalleryView=false;
      if(view=="gallery-selection") {
        this.isGallerySelectionView=true;
        this.linkValue=button;
      }
      if(view=="schedule"){
        this.isScheduleView=true;
      }
      if(view=="gallery"){
        this.isGalleryView=true;
      }
      if(view=="main") {
        this.isMainView=true;
      }
      if(view=="guestGallery") {
        this.isGuestGalleryView = true;
        this.linkValue = button;
      }
    }
  }
};
</script>

<style lang="less" scoped>

@keyframes scrollSide {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}


.live-notif {
  background: black;
  color: orange;
  padding: 2rem 2rem 1rem 2rem;
  margin: 1rem;
  position: absolute;
  top: 45%;
  border-left: 8px solid orange;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 2rem 1rem 1rem 1rem;
  }
  .icon-close {
    position: absolute;
    top: 0;
    right: 2px;

    i {
      font-size: 1.25rem;
    }
  }

.caption {
  font-size: 0.5rem;
}
}
.install-notif__wrapper {

    animation: appear ;
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-delay: 2s;
    opacity: 0;

    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;
    bottom: 0;

  .install-notif {
    padding: 0.5rem;
    background: white;
    color: black;
    font-size: small;
  }

  .fa-caret-down {
    font-size: xx-large;
    position: absolute;
    bottom: 0;
    color: white;
  }

}

.main-wrapper { 
  margin: 15rem 0 .5rem 0; 
  display: flex ; 
  flex-direction: column; 
  padding-top: 5rem;

  @media (max-width:480px) {
    padding-top: 10rem;
    margin-top: 0;
  }

  &.large-wrapper {
    padding-top: 2.5rem;
    @media (min-width:480px) {
      margin-top: -1.5rem;
      padding-top: 0;
    }
  }


  @keyframes appear {
    from {opacity:0;}
    to {opacity:1;}
  }

  .main-body { 
    animation: appear ;
    animation-duration: 1s;
    animation-delay: 2s;
    animation-fill-mode: forwards;
    display:flex; 
    flex-direction: column; 
    height: 50%; 
    align-items: center;
    opacity: 0;
    

    &__tabs {
      margin: auto 0 0 12px;
      z-index: 1;

      ul { 
        padding: 0px; 
        margin: 0px; 
        list-style: none; 
        display: flex; 

        li {
          padding-right: 10px;
          padding-bottom: 10px;
          align-self: center;
        }
      }
    }
  } 
}

</style>
