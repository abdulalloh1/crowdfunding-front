<template>
  <div class="success">
    <img
        :src="iconPath"
        class="success__icon"
    />
    <div class="success__title">
      {{ title }}
    </div>
    <btn
        :to="btnPath"
        class="success__btn"
        color="grey"
        outlined
    >
      {{ btnText }}
    </btn>
  </div>
</template>

<script>
import Btn from "../ui/Btn/Btn";

export default {
  name: "SuccessBlock",
  components: {Btn},
  props: {
    title: String,
    iconPath: String,
    btnText: String,
    btnPath: [String, Object]
  }
}
</script>

<style lang="scss" src="./SuccessBlock.scss"/>