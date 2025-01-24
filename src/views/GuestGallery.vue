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
    </div>
    <div
      v-if="!isLoading && photos.length"
      class="sticky"
    >
      <!-- <v-btn
          v-if="selectionMode && !isPhotographerGallery"
          icon="fa fa-trash"
          variant="flat"
          color="red"
          size="small"
          class="mr-2"
          @click="deleteClicked()"
        /> -->
      <v-btn
        v-if="selectionMode"
        prepend-icon="fa fa-download"
        variant="flat"
        color="orange"
        size="small"
        class="mr-2"
        @click="downloadArrayFiles()"
      >
        Download
      </v-btn>
      <v-btn
        v-if="photos.length"
        prepend-icon="fas fa-check"
        size="small"
        :color="buttonSelected"
        class="mr-2"
        @click="toggleSelectionMode"
      >
        {{ selectBtnText }}
      </v-btn>
      <v-dialog
        v-if="!isPhotographerGallery"
        max-width="500"
      >
        <template #activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            prepend-icon="fas fa-plus"
            size="small"
            color="orange"
          >
            Upload
          </v-btn>
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
    <v-container
      fluid
      class="pb-6 pl-6 pr-6 pt-3"
    >
      <div v-if="!photos.length && !isLoading">
        <h3>
          No photos found
        </h3>
      </div>
      <v-row
        v-else
        class="image-gallery"
      >
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
              <div class="left-buttons">
                <v-btn
                  icon="fa fa-download"
                  variant="flat"
                  color="orange"
                  size="small"
                  class="mr-2"
                  @click="downloadFile(selectedImage)"
                />
                <!-- <v-btn
                  v-if="!isPhotographerGallery"
                  icon="fa fa-trash"
                  variant="flat"
                  color="red"
                  size="small"
                  @click="deleteFile(selectedImage)"
                /> -->
              </div>
              <div class="right-buttons">
                <v-btn
                  icon="fa fa-close"
                  variant="flat"
                  color="black"
                  size="small"
                  @click="previewOpen = false"
                />
              </div>
            </div>
          </v-img>
        </v-card>
      </v-dialog>

      <!-- Delete Confirmation Dialog -->
      <!-- <v-dialog
        v-model="showDeleteDialog"
        max-width="90%"
      >
        <v-card color="black">
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">
                Delete
              </div>
              <div>
                Are you sure you want to delete the selected items?
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn
              color="red"
              variant="elevated"
              @click="deleteArrayFiles()"
            >
              Yes
            </v-btn>
            <v-btn
              color="success"
              variant="elevated"
              @click="showDeleteDialog=false"
            >
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-container>
  </v-content>
</template>

<script>
import { ref as firebaseRef, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
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
      selectBtnText: 'Select'
      // showDeleteDialog: false
    }
  },
  computed: {
    isPhotographerGallery() {
      return this.$route.name == 'PhotographerGallery'
    }
  },
  mounted() {
    this.fetchPhotos();
  },
  methods: {
    // deleteFile(file) {
    //   const storage = getStorage();
    //   const fileRef= firebaseRef(storage, this.$route.name+'/'+this.linkValue+'/'+file.name);
    //   deleteObject(fileRef)
    //     .then(() => {
    //       alert("Photo deleted successfully");
    //       this.$router.go();
    //     })
    //     .catch((error) => {
    //       console.error("Error deleting photo:", error);
    //     });
    // },
    // deleteClicked() {
    //   if (this.downloadArray.length>0) {
    //     this.showDeleteDialog = true;
    //   }
    //   else {
    //     alert('Please select a photo')
    //   }
    // },
    // deleteArrayFiles() {
    //   this.isLoading = true;
    //   const storage = getStorage();
    //   for (const file of this.downloadArray) {
    //     const fileRef= firebaseRef(storage, this.$route.name+'/'+this.linkValue+'/'+file.name);
    //     deleteObject(fileRef)
    //       .then(() => {
    //         console.log("Photo deleted successfully");
    //       })
    //       .catch((error) => {
    //         console.error("Error deleting photo:", error);
    //       });
    //   }
    //   this.$router.go();
    //   alert("Photos deleted successfully");
    // },
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
        this.selectBtnText = 'Clear Selection'
      }
      else {
        this.buttonSelected = 'beige';
        this.selectionMode = false;
        this.downloadArray = [];
        this.selectBtnText = 'Select'
      }
    },
    openPreview(photo) {
      this.selectedImage = photo;
      this.previewOpen = true;
    },
    async fetchPhotos() {
      this.isLoading = true;
      const folderRef = firebaseRef(storage, this.$route.name+'/'+this.linkValue);
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
          const storageRef = firebaseRef(storage, `${this.$route.name}/${this.linkValue}/${file.name}`);
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
          this.previewOpen = false;
        })
    },
    async downloadArrayFiles() {
      console.log(this.downloadArray.length)
      if (this.downloadArray.length > 1) {
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
      else if (this.downloadArray.length == 1) {
        this.downloadFile(this.downloadArray[0]);
      }
      else {
        alert('Please select a photo')
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

.sticky {
  position: sticky;
  top: 0;
  padding: 1rem;
  z-index: 1;
}
</style>