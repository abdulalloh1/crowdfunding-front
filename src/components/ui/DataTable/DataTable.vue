<template>
  <div>
    <div
      :class="[
          'data-table',
          {
            'data-table--loading': loading
          }
      ]"
    >
      <progress-linear
          :style="{
            'visibility': loading ? 'visible' : 'hidden'
          }"
      />
      <div
          v-if="hasScroll"
          :class="['data-table__scroll-info',
          {
            'data-table__scroll-info--show': showInfo
          }
        ]"
          @touchmove.prevent="scrollHorizontal($event)"
      >
        <div class="data-table__scroll-info__wrapper">
          {{ $t('title.scrollForMore') }}
          <svg
              data-src="/img/icons/scroll-horizontal.svg"
              class="data-table__scroll-info__icon"
          />
        </div>
      </div>
      <div
          class="data-table__wrapper"
          ref="table"
          @scroll.prevent="scrollHorizontal($event)"
      >
        <table>
          <thead>
          <tr>
            <th v-if="withNumeration" v-once>
              #
            </th>
            <th
                v-for="(header, index) in headers"
                :key="index"
            >
              <div class="data-table__header__th">
                {{ header.name }}
                <!--            <span v-if="header.sortable">
                              <svg data-src="/img/icons/arrowUp.svg" />
                            </span>-->
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(item, itemIndex) in dataItems"
              :key="itemIndex"
          >
            <td v-if="withNumeration">
              {{itemIndex + 1}}
            </td>
            <td
                v-for="(column, columnIndex) in headers"
                :key="columnIndex"
            >
              <template v-if="detectSlotExistence(column)">
                {{ item[column.value] }}
              </template>
              <slot
                  v-else
                  :name="`item.${column.value}`"
                  v-bind:item="item"
                  v-bind:index="itemIndex"
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <pagination
        v-if="itemsProvider"
        v-model="dataActivePage"
        :total-pages="dataTotalPages"
    />
  </div>
</template>

<script>

import Pagination from "../Pagination";
import {DEFAULT_ACTIVE_PAGE, DEFAULT_ITEMS_PER_PAGE} from "../../../constants/pagination";
import ProgressLinear from "../ProgressLinear/ProgressLinear";

export default {
  name: "DataTable",
  components: {ProgressLinear, Pagination},
  data: () => ({
    dataActivePage: DEFAULT_ACTIVE_PAGE,
    dataTotalPages: null,
    dataItems: [],

    showInfo: true,
    hasScroll: true
  }),
  props: {
    headers: {
      type: Array,
      required: true,
      default() {
        return [
          {
            name: "string",
            value: "string",
            sortable: true
          }
        ]
      }
    },
    loading: Boolean,
    items: Array,
    pagination: Boolean,
    withNumeration: Boolean,

    itemsProvider: Function,
  },
  methods: {
    scrollHorizontal() {
      if (this.$refs.table.scrollLeft > 0) {
        this.showInfo = false;
      }
    },
    detectSlotExistence(column){
      return !this.$slots[`item.${column.value}`]
    },
    async loadData() {
      if (this.itemsProvider) {
        const data = await this.itemsProvider(this.dataActivePage, DEFAULT_ITEMS_PER_PAGE);
        this.dataItems = data.content;
        this.dataTotalPages = data.totalPages;
        this.dataActivePage = data.number;
      }
    }
  },
  mounted() {
    let app = this;
    let table = this.$refs.table;
    function verifyScroll() {
      app.hasScroll = table.scrollWidth - 20 > table.clientWidth;
    }
    verifyScroll();
    window.addEventListener('resize', verifyScroll);
  },
  watch: {
    async dataActivePage() {
      console.log(this.dataActivePage);
      await this.loadData();

      const currentRouteName = this.$route.name;
      await this.$router.push({
        name: currentRouteName,
        query: {
          page: this.dataActivePage
        }
      });
    },
    items() {
      this.dataItems = this.items;
    }
  },
  created() {
    if (this.itemsProvider) {
      const queries = this.$route.query;
      this.dataActivePage = queries.page;
    } else {
      this.dataItems = this.items;
    }
  }
}
</script>

<style lang="scss" src="./DataTable.scss"/>