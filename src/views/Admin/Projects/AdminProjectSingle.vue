<template>
  <div class="cabinet">

    <page-title>
      <template v-slot:title>
        {{ project.name }}
      </template>

      <template v-slot:buttons>
        <back-btn
            @click="$router.back()"
        >
          {{ $t('button.backToList') }}
        </back-btn>
      </template>
    </page-title>
    <progress-linear v-if="!loaded"/>
    <template v-else>

      <p class="u-mb-3">
        {{ $t('title.projectCategory') }}: {{ getProjectTypeLabel(project.type) }}
      </p>
      <alert
          v-if="justCreated"
          class="u-mb-2"
          type="info"
      >
        {{ $t('title.newProject') }}
      </alert>
      <div v-if="project.changedInfo" class="c-card u-mb-2 u-mt-2">
        <h4 class="u-mb-2">
          {{ $t('title.dataInModer') }}
        </h4>

        <div class="form">
          <div
              v-if="categoryOfChangedInfo"
              class="form-group form-group--full"
          >
            <div class="form-label">
              {{ $t('common.category') }}
            </div>
            {{ categoryOfChangedInfo.name }}
          </div>


          <project-slider
              :images="changedInfoImages"
              class="u-mt-2 u-mb-2"
              style="width: 80%;margin-bottom: 50px;min-height: 400px"
          />

          <div class="form-group form-group--full">
            <div class="form-label">
              {{ $t('title.title') }}:
            </div>
            <input
                :value="project.changedInfo.name"
                class="form-input"
                readonly
                type="text"
            />
          </div>
          <div class="form-group form-group--full">
            <div class="form-label">
              {{ $t('title.shortDesc') }}:
            </div>
            <input
                :value="project.changedInfo.shortDescription"
                class="form-input"
                readonly
                type="text"
            />
          </div>
          <div class="form-group form-group--full">
            <div class="form-label">
              {{ $t('title.detailedDesc') }}:
            </div>
            <div v-html="project.changedInfo.description"/>
          </div>
        </div>

      </div>
      <div class="c-card u-mb-2 u-mt-2">
        <h4 class="u-mb-2">
          {{ $t('title.activeData') }}
        </h4>
        <project-slider
            :images="activeImages"
            class="u-mt-2 u-mb-2"
            style="width: 80%;margin-bottom: 50px;"
        />
        <expander>
          <expander-item>
            <template #header>
              {{ $t('title.projectDesc') }}
            </template>
            <template #content>

              <div class="form">
                <div
                    v-if="project.category"
                    class="form-group form-group--full"
                >
                  <div class="form-label">
                    {{ $t('common.category') }}
                  </div>
                  <input
                      :value="project.category"
                      class="form-input"
                      readonly
                      type="text"
                  />
                </div>
                <div class="form-group form-group--half">
                  <div class="form-label">
                    {{ $t('title.region') }}
                  </div>
                  <input
                      :value="project.region"
                      class="form-input"
                      readonly
                      type="text"
                  />
                </div>
                <div class="form-group form-group--half">
                  <div class="form-label">
                    {{ $t('common.cityDistrict') }}
                  </div>
                  <input
                      :value="project.city"
                      class="form-input"
                      readonly
                      type="text"
                  />
                </div>
                <div class="form-group form-group--full">
                  <div class="form-label">
                    {{ $t('title.title') }}:
                  </div>
                  <input
                      :value="project.name"
                      class="form-input"
                      readonly
                      type="text"
                  />
                </div>
                <div class="form-group form-group--full">
                  <div class="form-label">
                    {{ $t('title.shortDesc') }}:
                  </div>
                  <input
                      :value="project.shortDescription"
                      class="form-input"
                      readonly
                      type="text"
                  />
                </div>
                <div class="form-group form-group--full">
                  <div class="form-label">
                    {{ $t('title.detailedDesc') }}:
                  </div>
                  <div v-html="project.description"/>
                </div>
              </div>

            </template>
          </expander-item>
          <expander-item>
            <template #header>
              {{ $t('title.financeSettings') }}
            </template>
            <template #content>
              <div class="form">
                <div class="form-group form-group--half">
                  <div class="form-label">
                    {{ $t('title.needAmount') }}
                  </div>
                  {{ makeFormattedNumber(project.targetAmount) }}

                </div>
                <div class="form-group form-group--half">
                  <div class="form-label">
                    {{ $t('title.collectedAmount') }}
                  </div>
                  {{ makeFormattedNumber(project.currentAmount) }}
                </div>
                <div class="form-group form-group--half">
                  <div class="form-label">
                    {{ $t('title.minInvestment') }}
                  </div>
                  {{ makeFormattedNumber(project.minimalPayment) }}

                </div>
                <div class="form-group form-group--half">
                  <div class="form-label">
                    {{ $t('title.expiryCollect') }}
                  </div>
                  <input
                      :value="project.finishDate"
                      class="form-input"
                      readonly
                      type="datetime-local"
                  />
                </div>
                <div class="form-group form-group--half">
                  <div class="form-label">
                    {{ $t('common.card') }}
                  </div>
                  <input
                      type="text"
                      :value="project.cardNumber"
                      class="form-input"
                      readonly
                  />
                </div>
                <div
                    v-if="project.returnDate"
                    class="form-group form-group--half"
                >
                  <div class="form-label">
                    {{ $t('title.investmentReturnDate') }}
                  </div>
                  <input
                      :value="project.returnDate"
                      class="form-input"
                      readonly
                      type="datetime-local"
                  />
                </div>
              </div>
            </template>
          </expander-item>
        </expander>
      </div>
      <div
          v-if="isModerating"
          class="c-card"
      >
        <alert type="warning">
          {{ $t('title.projectInModerCheckData') }}
        </alert>
        <div class="u-d-flex u-mt-2">
          <btn
              color="green"
              height="40px"
              width="150px"
              @click="approveProject()"
          >
            {{ $t('common.accept') }}
          </btn>
          <toggler-btn
              v-model="showRejectProjectBlock"
              :off-text="$t('button.reject')"
              :on-text="$t('button.cancel')"
              style="width: 150px;"
          />
        </div>
        <div
            v-show="showRejectProjectBlock"
            class="u-mt-2"
        >
          <div class="form-group">
            <div class="form-label">
              {{ $t('title.rejectReason') }}
            </div>
            <textarea
                v-model="rejectReason"
                class="form-textarea"
            />
            <btn
                class="u-mt-2"
                color="red"
                width="160px"
                @click="rejectProject()"

            >
              {{ $t('button.Отклонить') }}
            </btn>
          </div>
        </div>
      </div>

      <div class="u-mt-2 u-d-flex">
        <btn
            :to="{
                name: 'Project Single',
                params: {
                  projectID: project.id
                }
              }"
            color="green"
            sm
            class="u-mr-2"
        >
          {{ $t('button.viewOnSite') }}
        </btn>
        <btn
            @click="deleteDialog = true"
            color="red"
            sm
            class="u-mr-2"
        >
          {{ $t('button.delete') }}
        </btn>
      </div>

    </template>

  </div>
  <confirmation-dialog
    v-model="deleteDialog"
    :title="$t('alert.confirm.deletingProject')"
    :action="deleteProject"
  />

</template>

<script>
import PageTitle from "../../../components/Layout/PageTitle";
import {approveProjectApi, deleteProjectApi, getProjectApi, rejectProjectApi} from "../../../api/projects";
import {Expander, ExpanderItem} from "../../../components/ui/Expander";
import {getProjectTypeLabel} from "../../../utils/projects";
import {makeFormattedNumber} from "../../../utils/dataManipulations";
import Btn from "../../../components/ui/Btn/Btn";
import BackBtn from "../../../components/ui/BackBtn";
import Alert from "../../../components/ui/Alert";
import TogglerBtn from "../../../components/ui/TogglerBtn";
import {
  PROJECT_STATUS_CANCELED,
  PROJECT_STATUS_CREATED,
  PROJECT_STATUS_FUNDING,
  PROJECT_STATUS_MODERATING
} from "../../../constants/project-statuses";
import {getCategoryApi} from "../../../api/admin/categories";
import ProgressLinear from "../../../components/ui/ProgressLinear/ProgressLinear";
import ProjectSlider from "../../../components/ProjectSlider/ProjectSlider";
import ConfirmationDialog from "../../../components/Dialogs/ConfirmationDialog";

export default {
  name: "AdminProjectSingle",
  components: {
    ConfirmationDialog,
    ProjectSlider, ProgressLinear, TogglerBtn, Alert, BackBtn, Btn, ExpanderItem, Expander, PageTitle
  },
  computed: {
    activeImages() {
      return this.getImages(this.project.images, this.project.imageId)

    },
    changedInfoImages() {
      if (!this.project.changedInfo) return

      return this.getImages(this.project.changedInfo, this.project.changedInfo.imageId)
    },
    justCreated() {
      return this.project.status === PROJECT_STATUS_CREATED
    },
    projectID() {
      return this.$route.params.projectID
    },
    isModerating() {
      return this.project.status === PROJECT_STATUS_MODERATING || this.justCreated
    }
  },
  data: () => ({
    loaded: false,
    project: {},
    categoryOfChangedInfo: null,

    rejectReason: '',
    showRejectProjectBlock: false,

    deleteDialog: false,
  }),
  methods: {
    makeFormattedNumber,
    getProjectTypeLabel,
    deleteProject(){
      deleteProjectApi(this.projectID)
        .then(() => {
          this.$router.back();
        })
        .catch(error => {
          this.$toast.error(this.$t('alert.error.unexpectedError.default'));
          console.log(error);
        })
    },
    getImages(images, mainImage) {
      let array = [];
      if (images.length > 0) array = images;

      if (mainImage) array.unshift(mainImage);

      return array;
    },
    approveProject() {
      approveProjectApi(this.projectID).then(() => {
        this.project.status = PROJECT_STATUS_FUNDING;
      });
    },
    rejectProject() {
      rejectProjectApi(this.projectID, this.rejectReason).then(() => {
        this.project.status = PROJECT_STATUS_CANCELED;
        this.project.rejectStatus = this.rejectReason;
      })
    }
  },
  async created() {
    this.project = await getProjectApi(this.projectID);
    if (this.project?.changedInfo?.categoryId) {
      this.categoryOfChangedInfo = await getCategoryApi(this.project.changedInfo.categoryId);
    }

    this.loaded = true;
  }
}
</script>