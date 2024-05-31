<template>
  <div class="project-single">
    <alert
        v-if="errorLoad"
        type="error"
    >
      {{ errorMessage }}
    </alert>
    <progress-linear v-else-if="!loaded"/>
    <template v-else>
      <div class="project-single__intro">
        <div class="project-single__intro__container container">
          <bread-crumbs
              :links="breadCrumbs"
              class="project-single__bread-crumbs"
          />

          <project-slider :images="sliderImages"/>

          <div class="project-single__desc">
            <div class="project-single__author">
              <div class="project-single__author__avatar">
                <img :src="projectOwnerImage"/>
              </div>
              <div class="project-single__author__info">
                <div class="project-single__author__name">
                  {{ projectWithFormattedData.owner.last_name }}
                  {{ projectWithFormattedData.owner.first_name }}
                  {{ projectWithFormattedData.owner.middle_name }}
                </div>
                <div class="project-single__author__desc">
                  {{ $t('title.projectAuthor') }}
                </div>
              </div>
            </div>

            <div class="project-single__extra-info">
              <div class="project-single__extra-info__items">
                <div class="project-single__extra-info__item">
                  <svg
                      class="project-single__extra-info__item__icon"
                      data-src="/img/icons/star.svg"
                  />
                  {{ projectWithFormattedData.type }}
                </div>
                <div class="project-single__extra-info__item">
                  <svg
                      class="project-single__extra-info__item__icon"
                      data-src="/img/icons/location.svg"
                  />
                  {{ projectWithFormattedData.district?.name }}, {{ projectWithFormattedData.region?.name }}
                </div>
              </div>
            </div>
            <div class="project-single__title">
              {{ projectWithFormattedData.name }}
            </div>
            <div class="project-single__subtitle">
              {{ projectWithFormattedData.shortDescription }}
            </div>
            <div class="project-single__table">
              <table>
                <tbody>
                  <tr>
                    <td>
                      {{ $t('title.minPayment') }}
                    </td>
                    <td>
                      {{ projectWithFormattedData.minimalPayment }} {{ $t('sum') }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {{ $t('title.fundraisingExpiry') }}
                    </td>
                    <td>
                      {{ projectWithFormattedData.finishDate }}
                    </td>
                  </tr>

                  <tr v-if="projectWithFormattedData.rewardValue">
                    <td>
                      {{ $t('title.yield') }}
                    </td>
                    <td>
                      {{ projectWithFormattedData.rewardValue }}%
                    </td>
                  </tr>
                  <tr v-if="projectWithFormattedData.returnDate">
                    <td>
                      {{ $t('title.investmentReturnDate') }}
                    </td>
                    <td>
                      {{ projectWithFormattedData.returnDate }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="project-card__progressbar">
              <div
                  :style="{
                    'background': cashProgress.color,
                    'width': cashProgress.percent + '%'
                  }"
                  class="project-card__progressbar__thumb"
              >
              </div>
            </div>
            <div class="project-card__finance">
              <div class="project-card__finance__half">
                <p class="project-card__finance__title">
                  {{ $t("common.collected") }}
                </p>
                <p class="project-card__finance__subtitle">
                  {{ projectWithFormattedData.currentAmount }} {{ $t('sum') }}
                </p>
              </div>
              <div class="project-card__finance__half">
                <p class="project-card__finance__title">
                  {{ $t('need') }}
                </p>
                <p class="project-card__finance__subtitle">
                  {{ projectWithFormattedData.targetAmount }} {{ $t('sum') }}
                </p>
              </div>
            </div>
            <alert
                v-if="targetAmountIsFinished"
                type="info"
                class="u-mt-2"
            >
              {{ $t('alert.info.fundraisingCompleted') }}
            </alert>
            <template v-else>
              <btn
                  v-if="paymentForProjectIsAvailable"
                  class="project-single__btn"
                  color="green"
                  @click="showPaymentDialog()"
              >
                {{ actionForProject }}
              </btn>
              <alert
                  v-else
                  class="u-mt-2"
                  type="warning"
              >
                {{ $t('alert.warning.signToInvest') }}
                <br/>
                <btn
                    :to="{
                    name: 'Sign In'
                  }"
                    class="u-mt-1"
                    color="green"
                    sm
                >
                  {{ $t('sign.up') }}
                </btn>
              </alert>
            </template>
          </div>
        </div>
      </div>
      <div class="project-single__bottom container">
        <div class="project-single__article">
          <h3 class="project-single__bottom__title">
            {{ $t('common.description') }}
          </h3>
          <div
              class="plain-content"
              v-html="projectWithFormattedData.description"
          />
        </div>
        <div
            v-if="docs.length > 0"
            class="project-single__docs"
        >
          <h3 class="project-single__bottom__title">
            {{ $t('title.extraFiles') }}
          </h3>
          <div class="project-single__docs__row">
            <doc
                v-for="doc in docs"
                :key="doc"
                :doc="doc"
                class="project-single__doc"
            >
              <template #download>
                <a
                    :href="doc"
                    class="doc__download"
                    download
                >
                  {{ $t('common.download') }}
                  <svg data-src="/img/icons/download.svg"/>
                </a>
              </template>
            </doc>
          </div>
        </div>
      </div>
      <payment-dialog
          v-if="paymentForProjectIsAvailable"
          v-model="paymentDialog"
          :actionForProject="actionForProject"
          :project-type="projectType"
          :project="project"
          @success="onSuccessPayment"
      />
    </template>

  </div>
</template>

<script>

import BreadCrumbs from "../../components/ui/BreadCrumbs";

import Btn from "../../components/ui/Btn";
import Doc from "../../components/Doc";
import PaymentDialog from "../../components/Dialogs/PaymentDialog";
import {getPublicProjectApi} from "../../api/projects";
import {deepClone, getDateWithoutTZ, makeFormattedNumber} from "../../utils/dataManipulations";
import {calculateCashProgress, getProjectTypeLabel} from "../../utils/projects";
import ProgressLinear from "../../components/ui/ProgressLinear/ProgressLinear";
import Alert from "../../components/ui/Alert/Alert";
import ProjectSlider from "../../components/ProjectSlider/ProjectSlider";
import {BUSINESS_TYPE, PROJECT_TYPE_DONATION, PROJECT_TYPE_INVESTMENT} from "../../constants/projects";
import {mapGetters} from "vuex";
import {getFileAsBlobUrl} from "../../api/files";
import {USER_DEFAULT_AVATAR_SRC} from "../../constants/user";

export default {
  name: "ProjectSingle",
  components: {ProjectSlider, Alert, ProgressLinear, Doc, Btn, BreadCrumbs, PaymentDialog},
  data: () => ({
    projectOwnerImage: USER_DEFAULT_AVATAR_SRC,

    errorLoad: false,
    errorMessage: '',

    loaded: false,
    imagesLoaded: false,

    project: {},

    mainImage: '',
    images: [],

    docs: [],

    paymentDialog: false,
  }),
  computed: {
    ...mapGetters('auth', ['userIsAuthenticated']),
    projectType() {
      if (this.projectTypeIsBusiness) return PROJECT_TYPE_INVESTMENT;

      return PROJECT_TYPE_DONATION
    },
    targetAmountIsFinished() {
      return this.project.currentAmount >= this.project.targetAmount;
    },
    paymentForProjectIsAvailable() {

      if (!this.projectTypeIsBusiness) return true

      return this.userIsAuthenticated
    },
    actionForProject() {
      if (this.project.type === BUSINESS_TYPE) return this.$t('button.invest')

      return this.$t('title.donate')
    },
    projectTypeIsBusiness() {
      return this.project.type === BUSINESS_TYPE;
    },
    sliderImages() {
      return [this.project.imageId, ...this.project.images];
    },
    projectWithFormattedData() {
      const data = deepClone(this.project);

      data.minimalPayment = makeFormattedNumber(data.minimalPayment);
      data.maximalPayment = makeFormattedNumber(data.maximalPayment);
      data.currentAmount = makeFormattedNumber(data.currentAmount);
      data.targetAmount = makeFormattedNumber(data.targetAmount);
      data.type = getProjectTypeLabel(data.type);

      if(data.returnDate) data.returnDate = getDateWithoutTZ(data.returnDate);
      data.finishDate = getDateWithoutTZ(data.finishDate);

      return data;
    },
    breadCrumbs() {
      return [
        {
          text: this.$t("nav.home"),
          disabled: false,
          href: {name: 'Home'}
        },
        {
          text: this.$t("nav.projects"),
          disabled: false,
          href: {name: 'Project Index'}
        },
        {
          text: this.projectWithFormattedData.name,
          disabled: true,
          href: ''
        }
      ]
    },
    cashProgress() {
      return calculateCashProgress(this.project.currentAmount, this.project.targetAmount)
    },
  },
  methods: {
    onSuccessPayment(amount) {
      this.project.currentAmount = this.project.currentAmount + amount;
    },
    showPaymentDialog() {
      this.paymentDialog = true;
    },
  },
  async mounted() {
    await getPublicProjectApi(this.$route.params.projectID)
        .then(async response => {
          this.project = response.data;
          document.title = this.project.name;

          const projectOwnerImageId = this.project.ownerImage;
          if(projectOwnerImageId) {
            this.projectOwnerImage = await getFileAsBlobUrl(projectOwnerImageId)
          }
        })
        .catch(error => {
          if (error.status === 404) {
            this.errorMessage = this.$t('alert.error.projectNotFound');
          } else {
            this.errorMessage = this.$t('alert.error.unexpectedError.loadingProject');
          }

          this.errorLoad = true;
        })
        .then(() => {
          this.loaded = true;
        });
  }
}
</script>