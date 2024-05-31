<template>
  <div class="c-project-status">
    <div
        :style="{
          'background-color': computedStatus.color
        }"
        class="c-project-status__color"
    />
    {{ computedStatus.label }}
  </div>
</template>

<script>
import {getProjectStatusLabel} from "../../../utils/projects";

export default {
  name: "ProjectStatus",
  props: {
    status: String,
  },
  computed: {
    computedStatus() {
      return getProjectStatusLabel(this.status)
    }
  }

}
</script>

<style lang="scss" src="./ProjectStatus.scss"/>