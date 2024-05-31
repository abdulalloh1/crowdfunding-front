<template>
  <a
      :class="[
        'doc',
        {
          'doc--can-delete': this.$slots.delete,
          'doc--downloadable': this.$slots.download
        }
      ]"
      :href="doc.href"
      download
  >
    <slot name="prepend"/>
    <div class="doc__icon">
      <img
          v-show="!doc.loading"
          :src="imgByDocFormat"
          alt=""
      />
    </div>
    <div class="doc__desc">
      <div class="doc__name">
        {{ doc.name }}
      </div>
      <div class="doc__size">
        {{ docSize(doc.size) }}
      </div>
    </div>
    <slot name="delete"/>
    <slot name="download"/>
  </a>
</template>

<script>
export default {
  name: "Doc",
  props: {
    doc: Object,
  },
  data: () => ({
    loaded: false,
    docFormat: ''
  }),
  computed: {
    imgByDocFormat() {
      if (this.doc.type === 'document/pdf') {
        return '/img/pdf.svg'
      } else if (this.doc.type === 'document/doc' || this.doc.type === 'document/docx') {
        return '/img/doc.svg'
      } else if (this.doc.type === 'document/xls' || this.doc.type === 'document/xlsx') {
        return '/img/xls.svg'
      } else if (
          this.doc.type === 'image/svg' ||
          this.doc.type === 'image/jpeg' ||
          this.doc.type === 'image/jpg' ||
          this.doc.type === 'image/png'
      ) {
        return URL.createObjectURL(this.doc)
      } else {
        return '/img/file.svg'
      }
    },
  },
  methods: {
    docSize(bytes) {
      let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0';
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
  },
}
</script>

<style lang="scss" src="./Doc.scss"/>