<template>
  <div>
    <slot name="prepend"/>

    <div class="steps-nav">
      <div class="steps-nav__wrapper">
        <div class="steps-nav__container container">
          <div
              v-for="(step, index) in steps"
              :key="index"
              :class="[
                'steps-nav__item',
                {
                  'steps-nav__item--active': step.value === activeStep,
                  'steps-nav__item--filled': index < indexOfActiveStep
                }
            ]"
          >
            <div class="steps-nav__item__order">

              <img
                  class="steps-nav__item__order__filled-icon"
                  src="/img/icons/received.svg"
              />
              <span class="steps-nav__item__order__number">
              {{ index + 1 }}
            </span>
            </div>
            <div class="steps-nav__item__desc">
              <tooltip>
                <template #activator>
                  <div class="steps-nav__item__title">
                    {{ step.title }}
                  </div>
                </template>
                {{ step.desc }}
              </tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="steps__wrapper">
      <div
          v-show="activeStep === TYPE_STEP"
          class="steps__item"
      >
        <alert
            v-if="!typeStepReadOnly"
            type="warning u-mt-2 u-mb-2"
        >
          <i18n-t
              keypath="alert.warning.formRequired"
              scope="global"
          >
            <template #msg>
              <b>(*)</b>
            </template>
          </i18n-t>
        </alert>
        <div
            v-if="typeStepReadOnly"
            class="u-mt-2 u-mb-2"
        >
          {{ $t('title.selectedProjectType') }}: <b>{{getProjectTypeLabel(project.type)}}</b>
        </div>
        <div
            v-else
            :class="[
            'projects-category',
            {
              'projects-category--readonly': typeStepReadOnly
            }
        ]"
        >
          <div class="projects-category__title">
            {{
              $t("common.choose", {
                msg: $t('title.projectType')
              })
            }}
            <span class="u-color-green">*</span>
          </div>
          <div class="projects-category__row">
            <button
                v-for="(category, index) in projectCategories"
                :key="index"
                :class="[
                'projects-category__item',
                {
                  'projects-category__item--active': project.type === category.value
                }
              ]"
                @click="selectCategory(category.value)"
            >
              <div class="projects-category__item__icon">
                <img
                    :src="category.iconGif"
                    alt=""
                    class="projects-category__item__icon__gif"
                />
                <img
                    :src="category.iconPng"
                    alt=""
                    class="projects-category__item__icon__png"
                />
              </div>
              <div class="projects-category__item__text">
                <div class="projects-category__item__title">
                  {{ category.title }}
                </div>
                <div class="projects-category__item__desc">
                  {{ category.desc }}
                </div>
              </div>
              <tooltip
                  class="projects-category__item__info"
                  @click="$event.preventDefault(); $event.stopPropagation();"
              >
                <template #activator>
                  <svg
                      data-src="/img/icons/info.svg"
                      class="projects-category__item__info__icon"
                  />
                </template>
                {{ category.desc }}
              </tooltip>
            </button>
          </div>
        </div>
      </div>

      <div
          v-show="activeStep === BASIC_INFO_STEP"
          class="steps__item"
      >
        <div class="create-project__column">
          <alert type="warning u-mt-2 u-mb-2">
            <i18n-t
                keypath="alert.warning.formRequired"
                scope="global"
            >
              <template #msg>
                <b>(*)</b>
              </template>
            </i18n-t>
          </alert>
          <div class="create-project__box">
            <div class="form">
              <div class="form-group form-group--full">
                <div class="form-label">
                  {{ $t('common.category') }}
                </div>
                {{ project.type ? getProjectTypeLabel(project.type) : '' }}
              </div>
              <div class="form-group form-group--full">
                <div class="form-label">
                  {{ $t("title.projectName") }}
                  <span class="u-color-green">*</span>
                </div>
                <input
                    v-model="project.name"
                    class="form-input"
                    maxlength="120"
                    type="text"
                />
                <div class="form-group__hint">
                  {{ $t('title.maxSymbols') }}: 100
                </div>
                <p
                    v-show="checkForErrors('name-empty')"
                    class="c-error-text"
                >
                  {{ $t('title.notFilled') }}
                </p>
              </div>
              <div class="form-group form-group--full">
                <div class="form-label">
                  {{ $t("title.shortProjectDesc") }}
                  <span class="u-color-green">*</span>
                </div>
                <textarea-input
                    v-model="project.shortDescription"
                    maxlength="200"
                />
                <p
                    v-show="checkForErrors('shortDescription-empty')"
                    class="c-error-text"
                >
                  {{ $t('title.notFilled') }}
                </p>
              </div>
              <div class="form-group form-group--full">
                <div class="form-label">
                  {{ $t("title.detailedProjectDesc") }}
                  <span class="u-color-green">*</span>
                </div>
                <text-editor
                    v-model="project.description"
                />
                <div class="form-group__hint">
                  {{ $t('title.maxSymbols') }}: 200
                </div>
                <p
                    v-show="checkForErrors('description-empty')"
                    class="c-error-text"
                >
                  {{ $t('title.notFilled') }}
                </p>
              </div>
            </div>
          </div>
          <div class="create-project__box create-project__box--files">
            <file-input
                id="project-photo"
                v-model="project.imageId"
                :accept="ALLOWED_IMAGE_TYPES"
                :handler="uploadImage"
                :loading="imageLoadRequestPending"
                class="create-project__box--files__item"
                image-only
            >
              <template #label>
                {{ $t('button.uploadCover') }}
                <span class="u-color-green">*</span>
              </template>
              <template #input-append>
                <p
                    v-show="checkForErrors('image-empty')"
                    class="c-error-text"
                >
                  {{$t('title.noUploadedFiles')}}
                </p>
              </template>
            </file-input>
            <file-input
                id="project-photos"
                v-model="project.images"
                :accept="ALLOWED_IMAGE_TYPES"
                :handler="uploadImage"
                class="create-project__box--files__item"
                image-only
                :label="$t('button.uploadExtraPhotos')"
                multiple
            />
          </div>
          <div class="create-project__box">
            <div class="form">
              <div class="form-group form-group--half">
                <div class="form-label">
                  {{ $t("title.region") }}
                  <span class="u-color-green">*</span>
                </div>
                <custom-select
                    @update:modelValue="project.regionId = null"
                    v-model="project.regionId"
                    :items="regions"
                    item-text="name"
                    item-value="id"
                />
                <p
                    v-show="checkForErrors('region-empty')"
                    class="c-error-text"
                >
                  {{ $t('title.notFilled') }}
                </p>
              </div>
              <div
                  :class="[
                    'form-group', 'form-group--half',
                    {
                      'form-group--disabled': !project.regionId
                    }
                ]"
              >
                <div class="form-label">
                  {{ $t('common.city') }}/{{ $t('common.district') }}
                  <span class="u-color-green">*</span>
                </div>
                <custom-select
                    v-model="project.cityId"
                    :items="cities"
                    item-text="name"
                    item-value="id"
                />
                <p
                    v-show="checkForErrors('city-empty')"
                    class="c-error-text"
                >
                  {{ $t('title.notFilled') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
          v-show="activeStep === FIN_INFO_STEP"
          class="steps__item"
      >
        <alert
            v-if="!finInfoStepReadOnly"
            type="warning u-mt-2 u-mb-2"
        >
          <i18n-t
              keypath="alert.warning.formRequired"
              scope="global"
          >
            <template #msg>
              <b>(*)</b>
            </template>
          </i18n-t>
        </alert>
        <slot name="prepend-fin-info-step"/>
        <div class="create-project__column">
          <div class="create-project__box">
            <div class="form-label">
              {{ $t('title.cardForReplenishment') }}
              <span class="u-color-green">*</span>
            </div>
            <alert
                class="u-mb-2"
                type="info"
            >
              {{ $t('alert.info.cardReplenishByInvestors') }}
            </alert>

            <div class="user-bank-card-selector">
              <user-bank-card-selector
                  v-model="project.cardId"
                  :cards="bankCards"
                  :readonly="finInfoStepReadOnly"
              />
            </div>
            <p
                v-show="checkForErrors('card-empty')"
                class="c-error-text"
            >
              {{ $t('title.chooseOneOption') }}
            </p>
          </div>
          <div class="create-project__box">
            <div class="form">
              <div class="form-group form-group--full">
                <div class="form-label">
                  {{ $t('title.minInvestment') }}
                  <span class="u-color-green">*</span>
                </div>
                <amount-input
                    v-model="project.minimalPayment"
                    :readonly="finInfoStepReadOnly"
                />
                <p
                    v-show="checkForErrors('minimalPayment-empty')"
                    class="c-error-text"
                >
                  {{ $t('title.minInvestment') }} - 1000 {{ $t('sum') }}
                </p>
              </div>

              <div class="form-group form-group--half">
                <div class="form-label">
                  {{ $t("title.sumToCollect") }}
                  <span class="u-color-green">*</span>
                </div>
                <amount-input
                    v-model="project.targetAmount"
                    :readonly="finInfoStepReadOnly"
                />
                <p
                    v-show="checkForErrors('targetAmount-empty')"
                    class="c-error-text"
                >
                  {{ $t('title.notFilled') }}
                </p>
              </div>
              <div class="form-group form-group--half">
                <div class="form-label">
                  {{ $t("title.expiryCollect") }}
                  <span class="u-color-green">*</span>
                </div>
                <input-date
                    v-model="project.finishDate"
                    time-picker
                    min-date-tomorrow
                    :readonly="finInfoStepReadOnly"
                />
                <p
                    v-show="checkForErrors('finishDate-empty')"
                    class="c-error-text"
                >
                  {{ $t('title.notFilled') }}
                </p>
                <p
                    v-show="checkForErrors('finishDate-incorrect')"
                    class="c-error-text"
                >
                  {{ $t('alert.error.chooseAnotherActualDate') }}
                </p>
              </div>
            </div>
          </div>
<!--          <div-->
<!--              v-if="project.type === BUSINESS_TYPE"-->
<!--              class="create-project__box"-->
<!--          >-->
<!--            <div class="form">-->
<!--              <div class="form-group form-group&#45;&#45;half">-->
<!--                <div class="form-label">-->
<!--                  {{ $t('title.investmentReturnDate') }}-->
<!--                  <span class="u-color-green">*</span>-->
<!--                </div>-->
<!--                <input-date-->
<!--                    v-model="project.returnDate"-->
<!--                    time-picker-->
<!--                    min-date-tomorrow-->
<!--                    :readonly="finInfoStepReadOnly"-->
<!--                />-->
<!--                <p-->
<!--                    v-show="checkForErrors('returnDate-empty')"-->
<!--                    class="c-error-text"-->
<!--                >-->
<!--                  {{ $t('title.notFilled') }}-->
<!--                </p>-->
<!--                <p-->
<!--                    v-show="checkForErrors('returnDate-incorrect')"-->
<!--                    class="c-error-text"-->
<!--                >-->
<!--                  {{ $t('alert.error.chooseAnotherReturnDate') }}-->
<!--                </p>-->
<!--              </div>-->
<!--              <div class="form-group form-group&#45;&#45;half">-->
<!--                <div class="form-label">-->
<!--                  {{ $t('title.profitPercentage') }}-->
<!--                  <span class="u-color-green">*</span>-->
<!--                </div>-->
<!--                <div class="form-group__number form-group__sum">-->
<!--                  <input-->
<!--                      v-model.number="project.rewardValue"-->
<!--                      class="form-input"-->
<!--                      type="number"-->
<!--                      :readonly="finInfoStepReadOnly"-->
<!--                  />-->
<!--                  <p>-->
<!--                    %-->
<!--                  </p>-->
<!--                </div>-->
<!--                <p-->
<!--                    v-show="checkForErrors('rewardValue-empty')"-->
<!--                    class="c-error-text"-->
<!--                >-->
<!--                  {{ $t('title.notFilled') }}-->
<!--                </p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>

    </div>

    <div class="create-project__btns">
      <btn
          v-show="!isFirstStep"
          class="create-project__btns__item"
          color="grey"
          outlined
          @click="validateAndChangeStep(-1)"
      >
        {{$t('button.back')}}
      </btn>

      <btn
          :loading="handleActionPending"
          class="create-project__btns__item"
          color="green"
          @click="validateAndChangeStep(1)"
      >
        {{actionBtnText}}
      </btn>
    </div>
  </div>
</template>

<script>
import Alert from "../ui/Alert";
import {ALLOWED_FILE_TYPES, ALLOWED_IMAGE_TYPES} from "../../constants/file-types";
import {getProjectTypeLabel} from "../../utils/projects";
import {BUSINESS_TYPE, CHARITY_TYPE, CREATIVE_TYPE, SOCIAL_TYPE} from "../../constants/projects";
import {uploadFileApi} from "../../api/files";
import {addFixedOnScrolling, scrollToElement} from "../../utils/domHelper";
import {createProjectApi} from "../../api/projects";
import {getCitiesApi, getRegionsApi} from "../../api/regions";
import {getCategoriesApi} from "../../api/public";
import {mapState} from "vuex";
import Tooltip from "../ui/Tooltip";
import TextareaInput from "../ui/TextareaInput";
import AmountInput from "../ui/AmountInput";
import UserBankCardSelector from "../UserBankCardSelector";
import FileInput from "../ui/FileInput";
import Btn from "../ui/Btn";
import CustomSelect from "../ui/CustomSelect";
import TextEditor from "../ui/TextEditor";
import {BASIC_INFO_STEP, FIN_INFO_STEP, TYPE_STEP} from '../../constants/project-steps'
import InputDate from "../ui/InputDate";

export default {
  props: {
    handleActionBtnText: String,
    handleActionPending: {
      type: Boolean,
      default: false,
    },
    projectInfo: {
      type: Object,
      default() {
        return {
          cardId: null,

          minimalPayment: 1000,

          regionId: null,
          cityId: null,

          type: '',
          name: '',
          shortDescription: '',
          description: '',
          targetAmount: null,
          finishDate: null,

          imageId: null,
          images: [],
          fileIds: []
        }
      }
    },
    readonlyFields: Array,
    defaultActiveStep: {
      type: String,
      default: TYPE_STEP
    },
    finInfoStepReadOnly: {
      type: Boolean,
      default: false
    },
    typeStepReadOnly: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      ALLOWED_FILE_TYPES,
      ALLOWED_IMAGE_TYPES,
      BUSINESS_TYPE,

      TYPE_STEP,
      BASIC_INFO_STEP,
      FIN_INFO_STEP
    }
  },
  data: () => ({
    project: {},

    activeStep: null,
    imageLoadRequestPending: false,

    errors: [],
    loaded: true,

    requestPending: false,

    image: null,
    images: [],
    fileIds: [],
    regions: [],
    cities: [],

    categories: [],
    bankCards: [],
  }),
  components: {
    InputDate,
    Tooltip,
    TextareaInput,
    AmountInput,
    Alert,
    UserBankCardSelector,
    FileInput,
    Btn,
    CustomSelect,
    TextEditor
  },
  name: "SingleProjectManagement",
  computed: {
    ...mapState('auth', ['user']),

    actionBtnText(){
      let actionBtnText = this.handleActionBtnText ? this.handleActionBtnText : this.$t('button.confirm')
      return !this.isLastStep ? this.$t('button.continue') : actionBtnText;
    },
    isFirstStep() {
      return this.steps[0].value === this.activeStep
    },
    indexOfActiveStep() {
      return this.steps.findIndex(step => step.value === this.activeStep);
    },
    isLastStep() {
      const stepsLength = this.steps.length;
      const lastItemIndex = stepsLength - 1;
      const lastStep = this.steps[lastItemIndex];

      return this.activeStep === lastStep.value
    },
    steps() {
      return [
        {
          value: this.TYPE_STEP,
          title: this.$t('title.projectCategory'),
          desc: this.$t('title.fieldsShowByType')
        },
        {
          value: this.BASIC_INFO_STEP,
          title: this.$t('title.projectDesc'),
          desc: this.$t('title.fillProjectTitleDesc')
        },
        {
          value: this.FIN_INFO_STEP,
          title: this.$t('title.financeSettings'),
          desc: this.$t('title.setMinMaxSum')
        }
      ]
    },
    projectCategories() {
      return [
        {
          iconGif: '/img/projects-category1.gif',
          iconPng: '/img/projects-category1.png',
          title: this.$t('projectTypes.business.title'),
          value: BUSINESS_TYPE,
          desc: this.$t('projectTypes.business.desc')
        },
        {
          iconGif: '/img/projects-category2.gif',
          iconPng: '/img/projects-category2.png',
          title: this.$t('projectTypes.social.title'),
          value: SOCIAL_TYPE,
          desc: this.$t('projectTypes.social.desc')
        },
        {
          iconGif: '/img/projects-category3.gif',
          iconPng: '/img/projects-category3.png',
          title: this.$t('projectTypes.charity.title'),
          value: CHARITY_TYPE,
          desc: this.$t('projectTypes.charity.desc')
        },
        {
          iconGif: '/img/projects-category4.gif',
          iconPng: '/img/projects-category4.png',
          title: this.$t('projectTypes.creative.title'),
          value: CREATIVE_TYPE,
          desc: this.$t('projectTypes.creative.desc')
        },
      ]

    },
  },
  methods: {
    getProjectTypeLabel,
    checkForErrors(error) {
      return this.errors.includes(error);
    },
    getActiveStepIndex() {
      return this.steps.findIndex(step => step.value === this.activeStep);
    },
    checkForErrorTypeStep() {
      if (!this.project.type) {
        this.$toast.error(this.$t('common.choose', {
          msg: this.$t('title.projectType')
        }));
        return true;
      }

      return false
    },
    checkForErrorBasicInfoStep() {

      let error = false;

      if (!this.project.name) {
        this.errors.push('name-empty');
        error = true;
      }
      if (!this.project.shortDescription) {
        this.errors.push('shortDescription-empty');
        error = true;
      }
      if (!this.project.description) {
        this.errors.push('description-empty');
        error = true;
      }

      if (!this.project.regionId) {
        this.errors.push('region-empty');
        error = true;
      }
      if (!this.project.cityId) {
        this.errors.push('city-empty');
        error = true;
      }
      if (!this.project.imageId) {
        this.errors.push('image-empty');
        error = true;
      }

      return error;
    },
    checkForErrorFinInfoStep() {
      const currentTime = new Date().getTime();

      let error = false;

      if (!this.project.cardId) {
        this.errors.push('card-empty');
        error = true;
      }
      if (!this.project.finishDate) {
        this.errors.push('finishDate-empty');
        error = true;
      }

      const finishDateToTime = new Date(this.project.finishDate).getTime();

      if(finishDateToTime < currentTime){
        this.errors.push('finishDate-incorrect');
        error = true;
      }
      if (this.project.minimalPayment < 1000) {
        this.errors.push('minimalPayment-empty');
        error = true;
      }
      if (!this.project.targetAmount) {
        this.errors.push('targetAmount-empty');
        error = true;
      }

      return error;
    },
    async uploadImage(file) {
      return new Promise((resolve, reject) => {
        uploadFileApi(file)
            .then(response => {
              const newFileID = response.data.filename;
              resolve(newFileID);
            })
            .catch(error => {
              reject(error);
            });
      });
    },
    validateAndChangeStep(number) {
      this.errors = [];

      const goToNextTab = number > 0
      if (goToNextTab > 0) {
        let error;
        switch (this.activeStep) {
          case this.TYPE_STEP:
            error = this.checkForErrorTypeStep();
            break;
          case this.BASIC_INFO_STEP:
            error = this.checkForErrorBasicInfoStep();
            break;
          case this.FIN_INFO_STEP:
            error = this.checkForErrorFinInfoStep();
            break;
          default:
            error = false;
            return true;
        }

        if (error) {
          this.$toast.error(this.$t('alert.error.incorrectFilledData'));
          scrollToElement('.create-project__column');
          return;
        }
      }

      if (!this.isLastStep || !goToNextTab) {
        let activeStepIndex = this.getActiveStepIndex();
        let nextStepIndex = activeStepIndex + number;
        this.activeStep = this.steps[nextStepIndex].value;
        scrollToElement('.create-project__title');
      } else {
        this.$emit('handleAction', this.project);
      }
    },
    clearErrors() {
      this.errors = [];
    },
    async createProject() {
      this.clearErrors();
      this.requestPending = true;

      createProjectApi(this.project)
          .then(() => {
            this.success = true;
          })
          .catch(error => {
            const {errorCode} = error.data;
            console.log(errorCode);
            this.$toast.error(this.$t('alert.error.onPublishing'));
          })
          .then(() => {
            this.requestPending = false;
          });
    },
    deleteDoc(from, fileName) {
      let indexOfDeletingDoc = this[from].findIndex(i => i.name === fileName)
      this[from].splice(indexOfDeletingDoc, 1)
    },
    selectCategory(value) {
      this.project.type = value
    },
    async loadCities() {
      this.cities = await getCitiesApi(this.project.regionId);
    },
    async loadCategories() {
      // this.project.categoryId = this.project.type;
      // this.categories = await getCategoriesApi(this.project.type);
    },
    fixStepsOnTopOnScroll() {
      addFixedOnScrolling('steps-nav')
    }


  },
  created(){
    this.activeStep = this.defaultActiveStep;
    this.project = this.projectInfo;
  },
  async mounted(){
    window.addEventListener('scroll', this.fixStepsOnTopOnScroll)

    this.project.ownerId = this.user.id;

    this.regions = await getRegionsApi();
  },
  watch: {
    'project.type'() {
      if(!this.project.type) return

      this.loadCategories();
    },
    'project.regionId'() {
      if(!this.project.regionId) return

      this.loadCities();
    },
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.fixStepsOnTopOnScroll)
  }
}
</script>