<template>
  <v-content class="fill-height">
    <div class="wrapper">
      <div class="main-body__gallery-tabs">
        <ul>
          <li>
            <router-link to="/gallerySelection/engagement">
              <Button-Comp
                button-type="main-body__tabs--A"
                button-text="Engagement"
              />
            </router-link>
          </li>
          <li>
            <router-link to="/gallerySelection/haldi">
              <Button-Comp
                button-type="main-body__tabs--B"
                button-text="Haldi"
              />
            </router-link>
          </li>
          <li>
            <router-link to="/gallerySelection/mehendi">
              <Button-Comp
                button-type="main-body__tabs--C"
                button-text="Mehendi"
              />
            </router-link>
          </li>
          <li>
            <router-link to="/gallerySelection/sangeet">
              <Button-Comp
                button-type="main-body__tabs--D"
                button-text="Sangeet"
              />
            </router-link>
          </li>
          <li>
            <router-link to="/gallerySelection/wedding">
              <Button-Comp
                button-type="main-body__tabs--E"
                button-text="Wedding"
              />
            </router-link>
          </li>
          <li>
            <router-link to="/gallerySelection/others">
              <Button-Comp
                button-type="main-body__tabs--F"
                button-text="Other Functions"
              />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </v-content>
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
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.main-body__gallery-tabs {
  width: 80%;
  opacity: 0;
  animation: appear 1s forwards;

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

