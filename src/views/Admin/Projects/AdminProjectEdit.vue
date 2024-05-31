<template>
  <div class="cabinet">
    <page-title>
      <template v-slot:title>
        Project Single
      </template>
      <template v-slot:buttons>

      </template>
    </page-title>
  </div>
</template>

<script>
import PageTitle from "../../../components/Layout/PageTitle";

export default {
  name: "AdminProjectSingle",
  components: {PageTitle},
  data: () => ({
    routes: []
  }),
}
</script>

<style scoped>

</style>