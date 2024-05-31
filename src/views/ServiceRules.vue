<template>
  <div class="plain-page">
    <div class="container">
      <bread-crumbs :links="breadCrumbs"/>
      <div class="plain-content">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio doloremque in itaque magni possimus
          quidem reiciendis rem similique sit voluptatibus. Aut enim id, mollitia nam nesciunt nulla quae quaerat
          quia.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio doloremque in itaque magni possimus
          quidem reiciendis rem similique sit voluptatibus. Aut enim id, mollitia nam nesciunt nulla quae quaerat
          quia.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio doloremque in itaque magni possimus
          quidem reiciendis rem similique sit voluptatibus. Aut enim id, mollitia nam nesciunt nulla quae quaerat
          quia.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio doloremque in itaque magni possimus
          quidem reiciendis rem similique sit voluptatibus. Aut enim id, mollitia nam nesciunt nulla quae quaerat
          quia.</p>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from "../components/ui/BreadCrumbs";

export default {
  name: "ServiceRules",
  components: {BreadCrumbs},
  computed: {
    breadCrumbs() {
      return [
        {
          text: `${this.$t('nav.home')}`,
          disabled: false,
          href: {name: 'Home'}
        },
        {
          text: `${this.$t('nav.serviceRules')}`,
          disabled: true,
          href: ''
        }
      ]
    },
  }
}
</script>

<style scoped>

</style>