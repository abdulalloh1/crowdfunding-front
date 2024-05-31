<template>
  <div class="page-error">
    <empty-block
        :title="$t('error')"
        :subtitle="$t('nav.notFound404')"
    >
      <template #icon>
        <div class="page-error__title">
          404
        </div>
      </template>
    </empty-block>
  </div>
</template>

<script>
import EmptyBlock from "../components/EmptyBlock/EmptyBlock";
export default {
  name: "Page404",
  components: {EmptyBlock}
}
</script>

<style scoped>

</style>