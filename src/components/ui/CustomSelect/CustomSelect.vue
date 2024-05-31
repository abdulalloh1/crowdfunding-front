<template>
  <div
      :class="[
        'custom-select',
        {
          'custom-select--active': showOptions,
          'custom-select--outlined': outlined
        }
      ]"
      @blur="showOptions = false"
  >
    <button
        v-if="clearable && selectedItem"
        class="custom-select__clear"
        @click.prevent="clear()"
    >
      <svg data-src="/img/icons/close.svg"/>
    </button>
    <button
        class="custom-select__header"
        @click="toggle()"
        :tabindex="!computedItems.length ? '-1' : ''"
    >
      <svg
          v-once
          v-if="icon"
          :data-src="icon"
          class="custom-select__icon"
      />
      <span>
        {{ selectHeaderText }}
      </span>
      <div class="custom-select__arrow">
        <svg data-src="/img/icons/arrowUpDown.svg"/>
      </div>
    </button>
    <div class="custom-select__options">
      <div
          v-if="computedItems.length === 0"
          class="custom-select__option custom-select__option--no-selectable"
      >
        <i>{{ $t('title.noElementToChoose') }}</i>
      </div>
      <button
          v-else
          v-for="(option, index) in computedItems"
          :key="index"
          :tabindex="!showOptions ? '-1' : ''"
          :class="[
              'custom-select__option',
              {
                'custom-select__option--selected': option === selectedItem
              }
          ]"
          @click="selectOption(option[itemValue])"
      >
        {{ option[itemText] }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    modelValue: null,
    title: {
      type: String,
      default: ''
    },
    items: Array,
    itemText: {
      type: String,
      default: 'label'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    icon: {
      type: String,
      default: null
    },
    clearable: Boolean,
    outlined: Boolean,
  },
  data() {
    return {
      dataItems: [],
      showOptions: false,
    }
  },
  computed: {
    selectHeaderText(){
      if(this.selectedItem) return this.selectedItem[this.itemText]

      return this.title;
    },
    selectedItem() {
      if (this.items.length === 0) return
      return this.items.find(item => item[this.itemValue] === this.modelValue);
    },
    computedItems() {
      return this.dataItems
    }
  },
  methods: {
    toggle() {
      this.showOptions = !this.showOptions
    },
    selectOption(val) {
      this.$emit('update:modelValue', val)
      this.showOptions = false;
    },

    clear() {
      this.$emit('update:modelValue', null)
    }
  },
  mounted() {
    window.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showOptions = false
      }
    });
    this.dataItems = this.items;
  },
  watch: {
    items(val) {
      this.dataItems = val;
    }
  }
}
</script>
<style lang="scss" src="./CustomSelect.scss"/>