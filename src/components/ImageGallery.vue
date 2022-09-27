<template>
  <div class="main-body__gallery-tabs">
        <ul>
          <li>
            <Button-Comp button-type="main-body__tabs--A" buttonText="Engagement" />
          </li>
          <li>
            <Button-Comp button-type="main-body__tabs--A" buttonText="Haldi" />
          </li>
          <li>
            <Button-Comp button-type="main-body__tabs--E" buttonText="Mehendi" />
          </li>
          <li>
            <Button-Comp button-type="main-body__tabs--C" buttonText="Sangeet" />
          </li>
          <li>
            <Button-Comp button-type="main-body__tabs--D" buttonText="Reception" />
          </li>
          <li>
            <Button-Comp button-type="main-body__tabs--B" buttonText="Wedding" />
          </li>
          
          <li class="back">
            <i class="fas fa-chevron-circle-left text-red" @click="$emit('emitChange','main')"></i>
          </li>
        </ul>
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
      animation: appear 4s forwards;

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
        }
      }
    }
</style>

