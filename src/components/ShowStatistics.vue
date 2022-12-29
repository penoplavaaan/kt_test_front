<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Статистика</p>
    <v-btn @click="download" color="grey">
      Скачать отчет .csv
    </v-btn>
    <p class="--text">Всего товаров: {{ totalProductCount }} шт</p>
    <p class="--text">Суммарный вес товаров: {{ totalProductsWeightKg }} кг</p>
    <p class="--text">Средний вес товаров: {{ avgProductsWeightKg }} кг</p>
    <p class="--text">Всего категорий товаров: {{ totalCategoriesCount }}</p>
    <p class="--text">
      Самые популярные категории:
    </p>
    <table class="stat-table">
      <tr>
        <td>Название</td>
        <td>Кол-во позиций</td>
      </tr>
      <tr v-for="item in mostPopularCategories" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.count }}</td>
      </tr>
    </table>
    <p class="--text">
      Наименее популярные категории:
    </p>
    <table class="stat-table">
      <tr>
        <td>Название</td>
        <td>Кол-во позиций</td>
      </tr>
      <tr v-for="item in leastPopularCategories" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.count }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "show-statistics",
  data: () => ({
    totalProductCount: 0,
    totalProductsWeightKg: 0,
    avgProductsWeightKg: 0,
    totalCategoriesCount: 0,
    mostPopularCategories: [],
    leastPopularCategories: []
  }),
  created() {
    this.getStatistics()
    this.timer = setInterval(this.getStatistics, 30000);
  },
  destroyed() {
    this.cancelAutoUpdate();
  },
  methods: {
    download(){
      window.location.href = process.env.VUE_APP_BASE_URL +'/products/statistics/download'
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    getStatistics() {
      ProductDataService.getStatistics()
          .then((response) => {
            let data = response.data

            this.mostPopularCategories = data.mostPopularCategories
            this.totalProductsWeightKg = Math.round(data.totalProductsWeightKg * 100) / 100
            this.totalProductCount = data.totalProductCount
            this.avgProductsWeightKg = Math.round(data.avgProductsWeightKg * 100) / 100
            this.totalCategoriesCount = data.totalCategoriesCount
            this.leastPopularCategories = data.leastPopularCategories

            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}

.stat-table {
  border: 1px solid black;
  border-collapse: collapse
}

.stat-table tr {
  border: 1px solid black;
}

.stat-table td {
  border: 1px solid black;
}

.stat-table * {
  padding: 10px;
}
</style>
