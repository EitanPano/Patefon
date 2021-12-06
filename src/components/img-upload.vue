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
          <img :src="passedImgUrl" v-if="passedImgUrl">
          <!-- <img :src="imageUrl" v-if="imageUrl"> -->
          <img v-else
            alt="Drop images here"
            v-bind:key="isDragOver"
            :src="
              isDragOver
                ? require('@/assets/images/box.png')
                : require('@/assets/images/upload.svg')
            "
          />
        </transition>
        <h3 class="chooseImgText">Click to add image<span class="light"> or drag it here </span></h3>
      </label>
      <!-- HIDDEN INPUT -->
      <input
        type="file"
        name="img-uploader"
        @change="handleFile"
        id="imgUploader"
      />
    </template>
    <!-- LOADER -->
    <img class="loader" v-else :src="require('../assets/images/loader.gif')" alt="" />
  </div>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  props: ["passedImgUrl"],

  data() {
    return {
      isLoading: false,
      isDragOver: false,
      imageUrl : ''
    };
  },
  methods: {
    dragOver() {
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
  width: 100%;
  height: 100%;
} 
label {
  cursor: pointer;
  transition: background-color 0.3s;
}
label img {
 width: 100%;
 height: 100%;
}
input {
  width: 0;
  height: 0;
}
.drag {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2b2b2b;

  width: 100%;
  height: 100%;

}
.not-drag {
  position: relative;
  background: #2b2b2b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.chooseImgText{
  display: none;
  position: absolute;
  text-align: center;
  font-size: 0.8em;
  padding: 1em 1em 0.5em;
  bottom: 0;
}
label:hover .chooseImgText {
  display: block;
}
</style>
