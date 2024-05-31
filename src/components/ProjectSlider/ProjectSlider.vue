<template>
  <div class="project-single__images">
    <progress-circular v-show="!imagesLoaded"/>

    <template v-if="imagesLoaded">
      <div
          v-if="sliderItems.length === 1"
          class="project-single__images__main"
      >
        <div class="project-single__images__main__item">
          <img
              :src="sliderItems[0]"
              alt=""
          />
        </div>
      </div>
      <template v-else>
        <flickity
            ref="main"
            :options="selectedImageFlickity"
            class="project-single__images__main flickity"
        >
          <div
              v-for="(img, index) in sliderItems"
              :key="index"
              class="project-single__images__main__item"
          >
            <img :src="img"/>
          </div>
        </flickity>
        <flickity
            ref="nav"
            :options="navImagesFlickity"
            class="project-single__images__nav"
        >
          <div
              v-for="(img, index) in sliderItems"
              :key="index"
              class="project-single__images__nav__item"
          >
            <img :src="img"/>
          </div>
        </flickity>
      </template>
    </template>

  </div>
</template>

<script>
import {getFileAsBlobUrl} from "../../api/files";
import Flickity from "@/components/Flickity.vue";
import 'flickity-as-nav-for'
import ProgressCircular from "../ui/ProgressCircular/ProgressCircular";

export default {
  name: "ProjectSlider",
  components: {ProgressCircular, Flickity},

  setup() {
    return {
      serverUrl: import.meta.env.VITE_APP_SERVER_URL,
      selectedImageFlickity: {
        cellAlign: 'left',
        contain: true,
        imagesLoaded: true,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        lazyLoad: true,
      },
      navImagesFlickity: {
        asNavFor: '.project-single__images__main',
        cellAlign: 'center',
        contain: true,
        imagesLoaded: true,
        prevNextButtons: false,
        pageDots: false,
        lazyLoad: true,
      },
    }
  },

  props: {
    images: Array
  },
  data: () => ({
    sliderItems: [],
    imagesLoaded: false,
  }),
  async mounted() {
    for (let imageId of this.images) {
      this.sliderItems.push(this.serverUrl + '/storage/' + imageId)
    }
    this.imagesLoaded = true;
  }
}
</script>

<style lang="scss" src="./ProjectSlider.scss"/>