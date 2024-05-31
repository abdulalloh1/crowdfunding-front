<template>
  <slot name="prepend"/>
  <alert
      class="u-mb-2 user-not-submitted__alert"
      type="warning"
  >
    {{ $t('alert.warning.getActiveStatus') }}
  </alert>
  <get-submit-status/>
</template>

<script>
import Alert from "./ui/Alert/Alert";
import GetSubmitStatus from "./ui/GetSubmitStatus";

export default {
  name: "UserNotSubmitted",
  components: {GetSubmitStatus, Alert}
}
</script>

<style scoped>
.user-not-submitted__alert {
  margin-bottom: 15px;
}
</style>