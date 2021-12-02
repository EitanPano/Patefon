<template>
  <div class="img-upload-container">
    <template v-if="!isLoading">
      <!-- UPLOAD IMG -->
      <label
        for="imgUploader"
        @drop.prevent="handleFile"
        @dragover.prevent="dragOver"
        @dragleave="isDragOver = false"
        :class="{ drag: isDragOver, 'not-drag': !isDragOver }"
      >
        <transition name="fade" mode="out-in">
          <img :src="imageUrl" v-if="imageUrl">
          <img v-if="!imageUrl"
            alt="Drop images here"
            v-bind:key="isDragOver"
            :src="
              isDragOver
                ? require('@/assets/images/box.png')
                : require('@/assets/images/upload.png')
            "
          />
        </transition>
        <h3 class="chooseImgText">Choose an image<span class="light"> or drag it here </span></h3>
      </label>
      <!-- HIDDEN INPUT -->
      <input
        type="file"
        name="img-uploader"
        id="imgUploader"
        @change="handleFile"
      />
    </template>
    <!-- LOADER -->
    <img  class="loader" v-else :src="require('../assets/images/loader.gif')" alt="" />
  </div>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  data() {
    return {
      isLoading: false,
      isDragOver: false,
      imageUrl : ''
    };
  },
  methods: {
    dragOver(ev) {
      this.isDragOver = true;
    },
    handleFile(ev) {
      let file;
      if (ev.type === "change") file = ev.target.files[0];
      else if (ev.type === "drop") file = ev.dataTransfer.files[0];
      this.onUploadImg(file);
    },

    async onUploadImg(file) {
      this.isLoading = true;
      this.isDragOver = false;
      const res = await uploadImg(file);
      this.imageUrl = res.url;
      this.$emit("imageSaved", res.url);
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.loader {
  width: 100px;
  height: 100px;
}
label {
  cursor: pointer;
  transition: background-color 0.3s;
}
label img {
 width: 100px;
}
input {
  width: 0;
  height: 0;
}
.drag {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: grey;
  background-color: rgb(245, 245, 245);
  padding: 30px 5px;
  width: 100px;
  height: 100px;
  border: 1px dashed gray;
  border-radius: 8px;
   font-size: 0.5rem;
}
.not-drag {
  color: grey;
  background-color: rgb(216, 216, 216);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 5px;
  width: 100px;
  height: 100px;
  border: 1px dashed gray;
  border-radius: 8px;
  font-size: 0.5rem;
  font-weight:900;
}
.light {
  font-weight: lighter;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.chooseImgText{
  display: none;
  position: absolute;
}
label:hover .chooseImgText {
  display: block;
}
</style>
