<template>
    <div>
    <h1>Photos in Storage</h1>
    <div>
        <input type="file" @change="handleFileUpload" />
        <button @click="uploadFile">Upload</button>
    </div>
    <div v-if="photos.length === 0">No photos found</div>
    <div v-else>
      <div v-for="(photo, index) in photos" :key="index">
        <img :src="photo.url" :alt="'Photo ' + index" style="max-width: 200px; margin: 10px;" />
      </div>
    </div>
  </div>
    <div class="back">
          <i class="fa-solid fa-chevron-left" @click="$emit('emitChange','gallery-selection')"></i>
        </div>
</template>

<script>
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export default {
  name: "GuestGallery",
  data () {
    return {
        photos: []
    }
  },
  props: {
    linkValue: String
  },
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
        if (!this.file) {
            alert("No file selected!");
            return;
        }
        const storageRef = ref(storage, `${this.linkValue}/${this.file.name}`);
        console.log(storageRef)
        try {
            await uploadBytes(storageRef, this.file);
            alert("File uploaded successfully!");
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
<style>
img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
}
</style>