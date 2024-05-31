<template>
  <div
      :class="[
          'file-input',
          'file-input--' + size
      ]"
  >
    <div class="file-input__icon">
      <progress-circular v-if="loading"/>
      <img
          v-else-if="!multiple && modelValue && uploadedFile"
          :src="uploadedFile"
          :alt="$t('title.uploadedPhoto')"
      />
      <svg
          v-else
          :data-src="icon"
      />
    </div>
    <input
        :id="id"
        :accept="accept"
        :multiple="multiple"
        class="file-input__input"
        type="file"
        @change="runChange"
    />
    <div class="file-input__desc">
      <div class="file-input__title">
        {{ label }}
        <slot name="label"/>
      </div>
      <label
          :for="id"
          class="file-input__btn btn btn--bg btn--grey"
      >
        <span class="btn__icon">
          <svg data-src="/img/icons/clip.svg"/>
        </span>
        {{ $t("common.upload") }}
      </label>
      <btn
          v-if="clearable && !multiple && modelValue"
          class="file-input__btn"
          color="red"
          @click="clearInput"
      >
        <template v-slot:icon>
          <svg
              class="svg svg__path--red"
              data-src="/img/icons/basket2.svg"
          />
        </template>
        {{ $t('button.delete') }}
      </btn>
    </div>
    <slot name="input-append"/>
    <div
        v-if="multiple && files.length > 0"
        class="file-input__docs"
    >
      <doc
          v-for="(file, index) in files"
          :key="file.id"
          :doc="file"
          class="file-input__doc"
      >
        <template #prepend>
          <progress-circular
              v-show="file.loading"
              class="file-input__progress-circular"
          />
          <p
              v-show="file.error"
              class="file-input__error"
          >
            {{ $t('error') }}
          </p>
        </template>
        <template #delete>
          <button
              class="doc__delete"
              @click="removeFile(index)"
          >
            &times;
          </button>
        </template>
      </doc>
    </div>
  </div>
</template>

<script>
import Doc from "../../Doc";
import Btn from "../Btn";
import {deepClone} from "../../../utils/dataManipulations";
import ProgressCircular from "../ProgressCircular/ProgressCircular";
import {getFile, getFileAsBlobUrl} from "../../../api/files";

export default {
  name: "FileInput",
  components: {ProgressCircular, Btn, Doc},
  props: {
    handler: {
      type: Function,
      default: null
    },
    modelValue: [String, Object, Array],
    imageByDefault: {
      type: String,
      default: null
    },
    id: String,
    imageOnly: Boolean,
    accept: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: null
    }
  },
  data: () => ({
    loading: false,
    files: [],

    defaultImg: '',
    uploadedFile: '',
  }),
  computed: {
    icon() {
      if (this.imageOnly) return "/img/icons/camera.svg"
      return "/img/icons/folder.svg"
    },
  },
  methods: {
    runChange(event) {
      let files = event.target.files
      if (!files.length) return
      if (this.multiple) {
        this.uploadMultipleFiles(files);
      } else {
        this.uploadSingleFile(files[0]);
      }
    },
    uploadSingleFile(file) {
      if (this.handler) {
        this.loading = true;
        this.handler(file)
            .then(response => {
              this.$emit('update:modelValue', response)
              this.uploadedFile = URL.createObjectURL(file)
            }).catch(error => {
          console.log(error);
          this.$toast.error(this.$t('alert.error.unexpectedError.loadingFile'))
        }).then(() => {
          this.loading = false;
        });
      } else {
        this.$emit('update:modelValue', file)
        this.uploadedFile = URL.createObjectURL(file)
      }
    },
    uploadMultipleFiles(newFiles) {
      if (this.handler) {
        for (const file of Object.values(newFiles)) {
          this.files.push(file);
          file.loading = true;

          this.handler(file)
              .then(response => {
                file.handlerValue = response;
                /*
                  FIXME: LATER reactivity not working when i update directly specific object, only after map.
                    Rearranging whole array only for changing one object !== Good
                */
                this.files = this.files.map(item => {
                  if (item.handlerValue === response) {
                    item.loading = false;
                  }
                  return item;
                });

                let newModelValues = this.modelValue;
                newModelValues.push(response);
                this.$emit('update:modelValue', newModelValues);

              })
              .catch(error => {
                console.log(error);
                /*
                  FIXME: LATER reactivity not working when i update directly specific object, only after map.
                    Rearranging whole array only for changing one object !== Good
                */
                this.files = this.files.map(item => {
                  if (item.name === file.name) {
                    item.loading = false;
                    item.error = true;
                  }
                  return item;
                });
                this.$toast.error(this.$t('alert.error.uploadingFile'))
              })
        }

      } else {
        this.files = this.files.concat(newFiles)
        this.$emit('update:modelValue', this.files)
      }

    },
    clearInput() {
      this.uploadedFile = null;
      this.$emit('update:modelValue', null)
    },
    removeFile(indexOfRemovingFile) {
      this.files.splice(indexOfRemovingFile, 1);

      if (this.handler) {
        let cloneModelValue = deepClone(this.modelValue);
        cloneModelValue.splice(indexOfRemovingFile, 1);
        this.$emit('update:modelValue', cloneModelValue)
      }
    }
  },
  mounted() {
    if (this.imageByDefault) {
      this.uploadedFile = this.imageByDefault;
    } else if (this.multiple && this.modelValue !== null) {
      this.modelValue.forEach(value => {
        getFile(value).then(response => {
          let file = response.data;
          file.name = value;
          this.files.push(response.data)
        })
      });
    } else {
      getFileAsBlobUrl(this.modelValue).then(response => {
        this.uploadedFile = response;
      });
    }
  }
}
</script>

<style lang="scss" src="./FileInput.scss"/>
