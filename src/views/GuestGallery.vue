<template>
  <v-overlay :model-value="isLoading">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  <div class="ma-4 d-flex mb-8 justify-space-between">
    <h1> {{ this.linkValue.charAt(0).toUpperCase() + String(this.linkValue).slice(1) }} </h1>
    <div>
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" icon="fas fa-plus" size="small"/>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card title="Upload Photo" append-icon="fa fa-close" @click:append="isActive.value = false" color="black">
            <v-card-text>
              <v-file-input
                v-model="uploadArray"
                label="Select Photo"
                prepend-icon="fa-solid fa-camera"
                variant="filled"
                accept="image/*"
                multiple
                chips
                @change="handleFileUpload"
              ></v-file-input>
            </v-card-text>
              <v-btn
                text="Upload"
                @click="uploadFile"
              ></v-btn>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </div>
  <v-container fluid class="pa-4">
  <v-row class="image-gallery">
    <v-col
      v-for="photo,index in photos"
      :key="photo.url"
      class="d-flex child-flex image-column"
      cols="3"
      :class="{
          'no-left-padding': index % itemsPerRow === 0, /* First in row */
          'no-right-padding': (index + 1) % itemsPerRow === 0, /* Last in row */
        }"
    >
      <v-img
        :lazy-src="photo.url"
        :src="photo.url"
        aspect-ratio="1"
        class="bg-grey-lighten-2"
        cover
      >
        <template v-slot:placeholder>
          <v-row
            align="center"
            class="fill-height ma-0"
            justify="center"
          >
            <v-progress-circular
              color="grey-lighten-5"
              indeterminate
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  </v-container>

  
</template>

<script>
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export default {
  name: "GuestGallery",
  data () {
    return {
        itemsPerRow: 4,
        photos: [],
        uploadArray: [],
        isLoading: false
    }
  },
  props: {
    linkValue: String
  },
  // components: {
  //   ButtonComp,
  // },
  methods: {
    async fetchPhotos() {
      const folderRef = ref(storage, this.linkValue);
      try {
        const result = await listAll(folderRef);
        const photoPromises = result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        });
        this.photos = await Promise.all(photoPromises);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    },
    handleFileUpload(event) {
            this.file = event.target.files[0];
        },
    async uploadFile() {
      if (!this.uploadArray.length) {
          alert("No file selected!");
          return;
      }
      try {
        this.isLoading = true;
        for (const file of this.uploadArray) {
          const storageRef = ref(storage, `${this.linkValue}/${file.name}`);
          await uploadBytes(storageRef, file);
        }
        alert("Photos uploaded successfully!");
        this.$router.go();     
      } catch (error) {
          console.error("Error uploading file:", error);
          alert("File upload failed.");
        }
    }
  },
  mounted() {
    this.fetchPhotos();
  },
}
</script>
<style lang="less">
/* Remove left padding for the first image in each row */
.no-left-padding {
  padding-left: 0 !important;
}

/* Remove right padding for the last image in each row */
.no-right-padding {
  padding-right: 0 !important;
}
.image-column {
  padding: 2px; /* Default spacing between images */
}
img {
  border: 2px solid white;
}

.v-btn {
  background-color: orange;
  color: black;
  font-family: Lobster;
  text-transform: none;
}
.v-progress-circular {
  position: absolute;
  top: 50vh;
  right: -60vw;
}

</style>