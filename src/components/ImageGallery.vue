<template>
  <div class="main-body__gallery-tabs">
    <ul>
      <li>
        <Button-Comp
          button-type="main-body__tabs--A"
          button-text="Engagement"
          @click="$emit('emitChange','gallery-selection','engagement')"
        />
      </li>
      <li>
        <Button-Comp
          button-type="main-body__tabs--B"
          button-text="Haldi"
          @click="$emit('emitChange','gallery-selection','haldi')"
        />
      </li>
      <li>
        <Button-Comp
          button-type="main-body__tabs--C"
          button-text="Mehendi"
          @click="$emit('emitChange','gallery-selection','mehendi')"
        />
      </li>
      <li>
        <Button-Comp
          button-type="main-body__tabs--D"
          button-text="Sangeet"
          @click="$emit('emitChange','gallery-selection','sangeet')"
        />
      </li>
      <li>
        <Button-Comp
          button-type="main-body__tabs--E"
          button-text="Wedding"
          @click="$emit('emitChange','gallery-selection','wedding')"
        />
      </li>
      <li>
        <Button-Comp
          button-type="main-body__tabs--F"
          button-text="Other Functions"
          @click="$emit('emitChange','gallery-selection','other')"
        />
      </li>
      <!-- <li class="back">
            <i class="fa fa-arrow-circle-o-left" @click="$emit('emitChange','main')"></i>
          </li> -->
    </ul>
    <div class="back">
      <i
        class="fa-solid fa-chevron-left"
        @click="$emit('emitChange','main')"
      />
    </div>
  </div>
</template>

<script>
import ButtonComp from "../components/ButtonComp.vue";

export default {
  name: "ImageGallery",
  components: {
    ButtonComp
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

      .back {
        position: absolute;
        top: 7rem;
        left: 1rem;
        font-size: xx-large;
        color: orange;
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
            font-size: xx-large;
            color: orange;
            cursor: pointer;
            @media (max-width:480px) {
              // position: absolute;
              // font-size: xxx-large;
              // bottom: 5rem;
              // right: 3rem;
            }
        }
      }
    }
</style>

