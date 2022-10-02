<template>
  <div class="main-wrapper" :class="{'large-wrapper':isScheduleView}">
   
    <div class="main-body">
      <!-- <div class="atcb" style="display:none;">
        {{ JSON.stringify(eventData) }}
      </div> -->
      <div class="main-body__tabs" v-if="isMainView">
        <ul>
          <li>
            <Button-Comp button-type="main-body__tabs--schedule" buttonText="Schedule" @click="changeView('schedule')"/>
          </li>
          <li>
            <!-- <router-link to="/imageGallery"> -->
            <Button-Comp button-type="main-body__tabs--gallery" buttonText="Gallery" @click="changeView('gallery')"/>
            <!-- </router-link> -->
          </li>
          <li>
            <a href="https://maps.app.goo.gl/aJ3t7gXUnWjrPi5f6?g_st=iw">
              
              <Button-Comp button-type="main-body__tabs--location" buttonText="Location"/>
            </a>
          </li>
        </ul>
      </div>

      <Image-Gallery v-if="isGalleryView" @emitChange="changeView"></Image-Gallery>

      <Schedule-List v-if="isScheduleView" @emitChange="changeView"></Schedule-List>

    </div>
  </div>
</template>

<script>
import ButtonComp from "../components/ButtonComp.vue";
import { atcb_init } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";
import ImageGallery from "../components/ImageGallery.vue";
import ScheduleList from "@/components/ScheduleList.vue";

export default {
  name: "MainView",
  components: {
    ButtonComp,
    ImageGallery,
    ScheduleList
  },
  data() {
    return {
      isGalleryView: false,
      isMainView:true,
      isScheduleView:false,
      eventData: {}
    }
  },
  mounted() {
    this.eventData = {
      name: "Event",
      startDate: "12-02-2022",
      endDate: "13-02-2022",
      options:[
        "Apple",
        "Google",
        "iCal",  
        "Microsoft365",
        "MicrosoftTeams", 
        "Outlook.com",
        "Yahoo"
      ],
      trigger: "click",
      listStyle: "list",
      iCalFileName: "download_reminder"
    }
    this.$nextTick(() => {
      atcb_init();
    });
  },
  methods:{
    changeView(view) {
      this.isMainView=false;
      this.isGalleryView=false;
      this.isScheduleView=false;
      if(view=="schedule"){
        this.isScheduleView=true;
      }
      if(view=="gallery"){
        this.isGalleryView=true;
      }
      if(view=="main") {
        this.isMainView=true;
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
    animation-duration: 2s;
    animation-delay: 6s;
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
