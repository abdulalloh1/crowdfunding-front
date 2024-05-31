<template>
  <div>
    <page-title>
      <template v-slot:title>
        {{ $t('nav.favorites') }}
      </template>
    </page-title>
    <div
        v-if="projects.length > 0"
        class="projects__items"
    >
      <project-card
          v-for="item in projects"
          :key="item.id"
          :project="item"
        >
          <template v-slot:delete-btn>
            <div
                class="project-card__delete"
                @click.prevent="deleteProject(item.id)"
            >
              <svg data-src="/img/icons/basket.svg" />
              {{$t('deleteFromFavorites')}}
            </div>
          </template>
        </project-card>
      </div>
      <empty-block
        v-else
        :title="$t('title.noFavorites.title')"
        :subtitle="$t('title.noFavorites.subtitle')"
    >
      <template #icon>
        <svg data-src="/img/icons/bow.svg"/>
      </template>
      <template #button>
        <btn
            class="empty-block__create"
            color="black"
        >
          {{ $t('button.viewProjects') }}
        </btn>
      </template>
    </empty-block>
  </div>

</template>

<script>
import ProjectCard from "../../components/ProjectCard";
import Btn from "../../components/ui/Btn";
import PageTitle from "../../components/Layout/PageTitle";
import EmptyBlock from "../../components/EmptyBlock";

export default {
  name: "Favorites",
  components: {EmptyBlock, PageTitle, Btn, ProjectCard},
  data: () => ({
    projects: [],
  }),
  methods: {
    deleteProject(id) {
      this.projects = this.projects.filter(item => item.id !== id)
    }
  },
}
</script>

<style scoped>

</style>