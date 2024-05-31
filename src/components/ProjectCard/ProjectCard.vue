<template>
  <router-link
      :to="{
        name: 'Project Single',
        params: {
          projectID: project.id
        }
      }"
      class="project-card"
    >
      <div class="project-card__img">
        <img
            :src="`${url}/storage/${project.imageId}`"
        />
        <slot name="delete-btn" />
      </div>
      <div class="project-card__desc">
        <div class="project-card__tag">
          {{ getProjectTypeLabel(project.type) }}
        </div>
        <div class="project-card__title">
          {{ project.name }}
        </div>
        <div class="project-card__text">
          {{ project.shortDescription }}
        </div>
        <div class="project-card__progressbar">
          <div
              :style="{
                'background': cashProgress.color,
                'width': cashProgress.percent + '%'
              }"
              class="project-card__progressbar__thumb"
          >
          </div>
        </div>
        <div class="project-card__finance">
          <div class="project-card__finance__half">
            <p class="project-card__finance__title">
              {{ $t("common.collected") }}
            </p>
            <p class="project-card__finance__subtitle">
              {{ makeMoneyFormatFromNum(project.currentAmount) }}
            </p>
          </div>
          <div class="project-card__finance__half">
            <p class="project-card__finance__title">
              {{ $t('need') }}
            </p>
            <p class="project-card__finance__subtitle">
              {{ makeMoneyFormatFromNum(project.targetAmount) }}
            </p>
          </div>
        </div>
      </div>
  </router-link>
</template>

<script>
import {calculateCashProgress, getProjectTypeLabel} from "../../utils/projects";
import {makeMoneyFormatFromNum} from "../../utils/dataManipulations";
import ProgressCircular from "../ui/ProgressCircular/ProgressCircular";

export default {
  name: "ProjectCard",
  components: {ProgressCircular},
  data: () => ({
    url: import.meta.env.VITE_APP_SERVER_URL
  }),
  props: {
    project: Object,
  },
  computed: {
    cashProgress(){
      return calculateCashProgress(this.project.currentAmount, this.project.targetAmount)
    }
  },
  methods: {
    makeMoneyFormatFromNum,
    getProjectTypeLabel
  }
}
</script>

<style lang="scss" src="./ProjectCard.scss"/>