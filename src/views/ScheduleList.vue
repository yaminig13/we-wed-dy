<template>
  <v-content class="fill-height">
    <div class="wrapper">
      <div
        class="atcb"
        style="display:none;"
      >
        {{ JSON.stringify(eventData) }}
      </div>
      <div class="main-body__schedule-wrapper">
        <div class="main-body__schedule-tabs event-bmd">
          <div class="main-body__schedule-tabs--title">
            Mehendi - Bride's side
          </div>
          <div class="main-body__schedule-tabs--time">
            3rd December 2022, Noon
          </div>
          <button class="event-button">
            <i class="far fa-calendar-alt" />
            Add to calendar
          </button>
        </div>
        <div class="main-body__schedule-tabs event-gmd">
          <div class="main-body__schedule-tabs--title">
            Mehendi - Groom's side
          </div>
          <div class="main-body__schedule-tabs--time">
            2nd December 2022, Noon
          </div>
          <button class="event-button">
            <i class="far fa-calendar-alt" />
            Add to calendar
          </button>
        </div>

        <div class="main-body__schedule-tabs event-sgt">
          <div class="main-body__schedule-tabs--title">
            Sangeet Night
          </div>
          <div class="main-body__schedule-tabs--time">
            3rd December 2022, 1700 hrs
          </div>
          <button class="event-button">
            <i class="far fa-calendar-alt" />
            Add to calendar
          </button>
        </div>
        <div class="main-body__schedule-tabs event-hdi">
          <div class="main-body__schedule-tabs--title">
            Pool-Side Haldi
          </div>
          <div class="main-body__schedule-tabs--time">
            4th December 2022, 1030 hrs
          </div>
          <button class="event-button">
            <i class="far fa-calendar-alt" />
            Add to calendar
          </button>
        </div>
        <div class="main-body__schedule-tabs event-rcp">
          <div class="main-body__schedule-tabs--title">
            Reception
          </div>
          <div class="main-body__schedule-tabs--time">
            4th December 2022, 1900 hrs
          </div>
          <button class="event-button">
            <i class="far fa-calendar-alt" />
            Add to calendar
          </button>
        </div>
        <div class="main-body__schedule-tabs event-wdg">
          <div class="main-body__schedule-tabs--title">
            Wedding
          </div>
          <div class="main-body__schedule-tabs--time">
            4th December 2022, 2300 hrs
          </div>
          <button class="event-button">
            <i class="far fa-calendar-alt" />
            Add to calendar
          </button>
        </div>
      </div>
    </div>
  </v-content>
</template>

<script>
import { atcb_action } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";

export default {
  name: "ScheduleList",
  components: {
    // ButtonComp
  },
  mounted() {
    const hdi = {
      name: "Haldi of Yamini & Dhruv",
      description: "Haldi of Yamini & Dhruv",
      startDate: "2022-12-04",
      endDate: "2022-12-04",
      startTime: "10:00",
      endTime: "13:00",
      location: "Pool Side, Hotel Comfort Inn",
      options: ["Google", "Apple"],
      timeZone: "Asia/Kolkata",
      trigger: "click",
      iCalFileName: "Hdi-Event",
    };
    const HdiButton = document.querySelector('.event-hdi');
    HdiButton.addEventListener('click', () => atcb_action(hdi, HdiButton));

    const wdg = {
      name: "Wedding of Yamini & Dhruv",
      description: "Wedding of Yamini & Dhruv",
      startDate: "2022-12-04",
      endDate: "2022-12-05",
      startTime: "23:00",
      endTime: "03:00",
      location: "Hotel Comfort Inn",
      options: ["Google", "Apple"],
      timeZone: "Asia/Kolkata",
      trigger: "click",
      iCalFileName: "wdg-Event",
    };
    const WdgButton = document.querySelector('.event-wdg');
    WdgButton.addEventListener('click', () => atcb_action(wdg, WdgButton));

    const rcp = {
      name: "Reception of Yamini & Dhruv",
      description: "Reception of Yamini & Dhruv",
      startDate: "2022-12-04",
      endDate: "2022-12-04",
      startTime: "19:00",
      endTime: "23:00",
      location: "Hotel Comfort Inn",
      options: ["Google", "Apple"],
      timeZone: "Asia/Kolkata",
      trigger: "click",
      iCalFileName: "rcp-Event",
    };
    const RcpButton = document.querySelector('.event-rcp');
    RcpButton.addEventListener('click', () => atcb_action(rcp, RcpButton));

    const bmd = {
      name: "Mehendi of Yamini",
      description: "Mehendi",
      startDate: "2022-12-03",
      endDate: "2022-12-03",
      startTime: "08:00",
      endTime: "16:00",
      location: "Hotel Comfort Inn",
      options: ["Google", "Apple"],
      timeZone: "Asia/Kolkata",
      trigger: "click",
      iCalFileName: "bmd-Event",
    };
    const BmdButton = document.querySelector('.event-bmd');
    BmdButton.addEventListener('click', () => atcb_action(bmd, BmdButton));

    const gmd = {
      name: "Mehendi of Dhruv",
      description: "Mehendi",
      startDate: "2022-12-02",
      endDate: "2022-12-02",
      startTime: "10:00",
      endTime: "17:00",
      location: "A-190, Anandbaug Society",
      options: ["Google", "Apple"],
      timeZone: "Asia/Kolkata",
      trigger: "click",
      iCalFileName: "gmd-Event",
    };
    const GmdButton = document.querySelector('.event-gmd');
    GmdButton.addEventListener('click', () => atcb_action(gmd, GmdButton));

    const sgt = {
      name: "Sangeet of Yamini & Dhruv",
      description: "Sangeet ",
      startDate: "2022-12-03",
      endDate: "2022-12-03",
      startTime: "19:00",
      endTime: "22:00",
      location: "Priyadarshi Hall, Hotel Comfort Inn",
      options: ["Google", "Apple"],
      timeZone: "Asia/Kolkata",
      trigger: "click",
      iCalFileName: "sgt-Event",
    };
    const SgtButton = document.querySelector('.event-sgt');
    SgtButton.addEventListener('click', () => atcb_action(sgt, SgtButton));
  },
};
</script>
<style lang="less">
.main-body {
    &__schedule-wrapper{
        // animation: appear 1s forwards;
        display: grid;
        grid-template-columns: 1fr 1fr;

        @media (min-width:480px) {
            grid-column-gap:25rem;
        }
    }

    &__schedule-tabs {
        background-color: orange;
        color: beige;
        font-family: Lobster;
        padding: 10px;
        margin: 10px;
        // min-width: 80px;
        // cursor: pointer;
        font-size: 1rem;
        border-radius: 10px;
        border: 2px outset beige;
        display: flex;
        flex-direction: column;

        .event-button {
            background: beige;
            color: orange;
            font-size: .75rem;
            width: 70%;
            margin-top: .5rem;
            border-radius: unset;
            padding: unset;
        }

        @media (max-width:480px) {
            font-size: .875rem;
        }

        &--title {
            color:black;
        }

        &--time {
            font-size: 0.75rem;
        }

        &--location {
            font-size: .75rem;
        }

    }
}

</style>

