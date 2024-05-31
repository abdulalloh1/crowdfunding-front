<template>
  <div
      v-if="loaded"
      class="admin-block"
  >
    <page-title>
      <template v-slot:title>
        {{ user.first_name }} {{ user.last_name }}
      </template>
      <template v-slot:buttons>
        <back-btn
            :to="{
            name: 'Admin User Index'
          }"
        >
          {{ $t('button.goBack') }}
        </back-btn>
      </template>
    </page-title>
    <div class="cabinet__profile">
      <div class="cabinet__profile__body">

        <div class="cabinet__profile__column">
          <div class="c-card u-mb-4">
            <h5 class="u-mb-2">
              {{ $t('title.userInfo') }}
            </h5>
            <table class="c-table">
              <tbody>
              <tr>
                <td>{{ $t('common.firstName') }}</td>
                <td class="u-color-green">
                  {{ user.first_name }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('common.lastName') }}</td>
                <td class="u-color-green">
                  {{ user.last_name }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('common.middleName') }}</td>
                <td class="u-color-green">
                  {{ user.middle_name }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('common.status') }}</td>
                <td class="u-color-green">
                  {{ userStatusLabel }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('common.phoneNumber') }}</td>
                <td class="u-color-green">
                  {{ maskedPhoneNumber }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('title.region') }}</td>
                <td class="u-color-green">
                  {{ user.regionName }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('common.district') }}/{{ $t('common.city') }}</td>
                <td class="u-color-green">
                  {{ user.cityName }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('common.birthdate') }}</td>
                <td class="u-color-green">
                  {{ user.birthDate }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div
              v-if="user.requestForSubmit"
              class="c-card u-mb-4"
          >
            <h4 class="mb-2">
              {{ $t('title.requestConfirmStatus') }}
            </h4>
            <!-- TODO: show passport Image !-->
            <img
                class="u-mb-2"
                :src="imageForUserSubmittedStatusRequest"
                style="width: 100%; height: auto;"
            />
            <table class="c-table u-mt-2 u-mb-2">
              <tbody>
              <tr>
                <td>{{ $t('submittedUser.address') }}</td>
                <td class="u-color-green">
                  {{ user.address }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('submittedUser.issuedBy') }}
                </td>
                <td class="u-color-green">
                  {{ user.issuedBy }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('submittedUser.dateOfIssue') }}
                </td>
                <td class="u-color-green">
                  {{ user.dateOfIssue }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('submittedUser.passportSeries') }}
                </td>
                <td class="u-color-green">
                  {{ user.passportSeries }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('submittedUser.passportNumber') }}
                </td>
                <td class="u-color-green">
                  {{ user.passportNumber }}
                </td>
              </tr>
              </tbody>
            </table>

            <div class="u-d-flex">
              <btn
                  class="u-mr-2"
                  color="green"
                  height="32px"
                  width="120px"
                  @click="approveRequestForSubmittedStatus()"
              >
                {{ $t('button.confirm') }}
              </btn>
              <toggler-btn
                  v-model="showRejectForSubmittedStatusBlock"
                  :off-text="$t('button.reject')"
                  :on-text="$t('button.cancel')"
                  style="max-width: 120px"
              />
            </div>
            <div
                v-show="showRejectForSubmittedStatusBlock"
                class="u-mt-2 u-mb-2"
            >
              <div class="form-group">
                <div class="form-label">
                  {{ $t('title.rejectReason') }}
                </div>
                <textarea
                    v-model="rejectRequestForSubmittedStatusReason"
                    class="form-textarea"
                />
              </div>
              <btn
                  color="red"
                  height="32px"
                  width="120px"
                  @click="rejectRequestForSubmittedStatus()"
              >
                {{ $t('common.reject') }}
              </btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {maskPhoneNumber} from "../../../utils/dataManipulations";
import PageTitle from "../../../components/Layout/PageTitle";
import {
  approveUserRequestForSubmittedStatusApi,
  getUserApi,
  rejectUserRequestForSubmittedStatusApi
} from "../../../api/admin/users";
import Btn from "../../../components/ui/Btn";
import BackBtn from "../../../components/ui/BackBtn";
import {getUserStatusText} from "../../../utils/auth";
import TogglerBtn from "../../../components/ui/TogglerBtn/TogglerBtn";
import {USER_REJECTED} from "../../../constants/moderation-statuses";
import {getFileAsBlobUrl} from "../../../api/files";

export default {
  name: "UserSingle",
  components: {TogglerBtn, BackBtn, Btn, PageTitle},
  data: () => ({
    loaded: false,

    showRejectForSubmittedStatusBlock: false,
    rejectRequestForSubmittedStatusReason: '',

    imageForUserSubmittedStatusRequest: null,

    user: {}
  }),
  computed: {
    userChangeIsRejected() {
      return this.user.moderationStatus === USER_REJECTED;
    },
    userStatusLabel() {
      return getUserStatusText(this.user.status)
    },
    maskedPhoneNumber() {
      return maskPhoneNumber(this.user.login)
    }
  },
  methods: {

    approveRequestForSubmittedStatus() {
      approveUserRequestForSubmittedStatusApi({
        userId: this.user.id
      })
          .then(() => {
            this.user.requestForSubmit = false;
          });
    },
    rejectRequestForSubmittedStatus() {
      rejectUserRequestForSubmittedStatusApi(this.user.id, this.rejectRequestForSubmittedStatusReason)
          .then(() => {
            this.user.requestForSubmit = false;
          });
    },
  },
  async created() {
    this.user = await getUserApi(this.$route.params.userID);

    const userPassportImageForSubmittedStatusRequest = this.user.passportImage;
    if(userPassportImageForSubmittedStatusRequest){
      this.imageForUserSubmittedStatusRequest = await getFileAsBlobUrl(userPassportImageForSubmittedStatusRequest);
    }

    this.loaded = true;
  }
}
</script>