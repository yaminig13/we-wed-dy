<template>
  <v-content class="fill-height">
    <v-overlay :model-value="isLoading">
      <v-progress-circular
        indeterminate
        size="64"
        color="orange"
      />
    </v-overlay>
    <div class="ma-4 d-flex mb-8 justify-space-between">
      <h1>
        {{ linkValue.charAt(0).toUpperCase() + String(linkValue).slice(1) }}
      </h1>
      <div>
        <v-btn
          v-if="selectionMode"
          icon="fa fa-download"
          variant="flat"
          color="orange"
          size="small"
          class="mr-2"
          @click="downloadArrayFiles()"
        />
        <v-btn
          icon="fas fa-check"
          size="small"
          :color="buttonSelected"
          class="mr-2"
          @click="toggleSelectionMode"
        />
        <v-dialog max-width="500">
          <template #activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              icon="fas fa-plus"
              size="small"
              color="orange"
            />
          </template>
          <template #default="{ isActive }">
            <v-card
              title="Upload Photo"
              color="black"
            >
              <template #append>
                <v-btn
                  icon="fa fa-close"
                  variant="text"
                  size="smalls"
                  @click="isActive.value=false"
                />
              </template>
              <v-card-text>
                <v-file-input
                  v-model="uploadArray"
                  label="Select Photo"
                  prepend-icon="fa-solid fa-camera"
                  variant="filled"
                  accept="image/*"
                  multiple
                  chips
                />
              </v-card-text>
              <v-btn
                text="Upload"
                color="orange"
                @click="uploadFile"
              />
            </v-card>
          </template>
        </v-dialog>
      </div>
    </div>
    <v-container
      fluid
      class="pa-4"
    >
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
            @click="handleClick(photo)"
          >
            <template #placeholder>
              <v-row
                align="center"
                class="fill-height ma-0"
                justify="center"
              >
                <v-progress-circular
                  color="grey-lighten-5"
                  indeterminate
                />
              </v-row>
            </template>

            <!-- Show Checkbox in Selection Mode -->
            <template #default>
              <div
                v-if="selectionMode"
                class="overlay"
              >
                <v-checkbox
                  v-model="downloadArray"
                  :value="photo"
                  hide-details
                  class="checkbox"
                />
              </div>
            </template>
          </v-img>
        </v-col>
      </v-row>
      <!-- Image Preview Dialog -->
      <v-dialog
        v-model="previewOpen"
        max-width="90%"
      >
        <v-card color="black">
          <v-img
            :src="selectedImage.url"
            aspect-ratio="1"
          >
            <div class="preview-image">
              <v-btn
                icon="fa fa-download"
                variant="flat"
                color="orange"
                size="small"
                @click="downloadFile(selectedImage)"
              />
              <v-btn
                icon="fa fa-close"
                variant="flat"
                color="black"
                size="small"
                @click="previewOpen = false"
              />
            </div>
          </v-img>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export default {
  name: "GuestGallery",
  props: {
    linkValue: String,
  },
  data() {
    return {
      itemsPerRow: 4,
      photos: [],
      uploadArray: [],
      isLoading: false,
      previewOpen: false,
      selectedImage: '',
      selectionMode: false,
      buttonSelected: 'beige',
      downloadArray: [],
      isDownloaded: false,
    }
  },
  mounted() {
    this.fetchPhotos();
  },
  methods: {
    handleClick(photo) {
      if (!this.selectionMode) {
        this.openPreview(photo);
      }
      else {
        const indexOfPhoto = this.downloadArray.indexOf(photo);
        if (indexOfPhoto !== -1) {
          this.downloadArray.splice(indexOfPhoto, 1); // Unselect the photo
        } else {
          this.downloadArray.push(photo); // Select the photo
        }
      }
    },
    toggleSelectionMode() {
      if (!this.selectionMode) {
        this.buttonSelected = 'orange';
        this.selectionMode = true;
      }
      else {
        this.buttonSelected = 'beige';
        this.selectionMode = false;
        this.downloadArray = [];
      }
    },
    openPreview(photo) {
      this.selectedImage = photo;
      this.previewOpen = true;
    },
    async fetchPhotos() {
      this.isLoading = true;
      const folderRef = ref(storage, this.$route.name+'/'+this.linkValue);
      try {
        const result = await listAll(folderRef);
        const photoPromises = result.items.map(async(itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        });
        this.photos = await Promise.all(photoPromises);
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    },
    async uploadFile() {
      if (!this.uploadArray.length) {
        alert("Please select a photo!");
        return;
      }
      try {
        this.isLoading = true;
        for (const file of this.uploadArray) {
          const storageRef = ref(storage, `${this.$route.name}/${this.linkValue}/${file.name}`);
          console.log(storageRef)
          await uploadBytes(storageRef, file);
        }
        alert("Photos uploaded successfully!");
        this.$router.go();
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("File upload failed.");
      }
    },
    async downloadFile(photo) {
      this.isDownloading = true;
      await fetch(photo.url)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, photo.name);
        })
    },
    async downloadArrayFiles() {
      if (this.downloadArray.length > 0) {
        this.isLoading = true;
        const zip = new JSZip();
        const imgFolder = zip.folder("WeWed");
        this.isDownloading = true;
        // Fetch each image and add it to the ZIP
        const fetchPromises = this.downloadArray.map(async(image) => {
          const response = await fetch(image.url);
          const blob = await response.blob();
          imgFolder.file(image.name, blob);
        });

        try {
          await Promise.all(fetchPromises); // Wait for all fetches to complete
          const zipBlob = await zip.generateAsync({ type: "blob" }); // Generate ZIP file
          saveAs(zipBlob, "WeWed.zip"); // Trigger download
          this.isLoading = false;
          this.toggleSelectionMode();
        } catch (error) {
          console.error("Error generating ZIP file:", error);
          alert("Failed to download photos.");
        }
      }
    }
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
  font-family: Lobster;
  text-transform: none;
}
.v-progress-circular {
  position: absolute;
  top: 50vh;
  right: -60vw;
}

.preview-image {
  display: flex;
  margin: 10px;
  justify-content: space-between;
}

.overlay {
  z-index: 1;
}

.checkbox {
  --v-checkbox-size: 20px; /* Set a smaller checkbox size */
  color: rgba(255, 255, 255, 0.8); /* Semi-transparent white */
}

.checkbox input {
  opacity: 0.7; /* Makes the checkbox background semi-transparent */
  height: 50%;
  width: 50%;
}
.v-checkbox .v-selection-control {
  min-height: unset;
}
</style>