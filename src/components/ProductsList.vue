<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="8">
      <v-text-field v-model="searchTitle" label="Поиск по названию или описанию"></v-text-field>
    </v-col>

    <v-col cols="12" sm="4">
      <v-btn small @click="page = 1; retrieveProducts();">
        Найти
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-row>
        <v-col cols="4" sm="3">
          <v-select
            v-model="category"
            :items="categories.map((el)=>el.name)"
            label="Категория"
            @change="handleFilterChange"
            @click="handleFilter"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Товары</v-card-title>

        <v-data-table
          :headers="headers"
          :items="tutorials"
          disable-pagination
          :hide-default-footer="true"
        >
        </v-data-table>
      </v-card>
      <v-row>
        <v-col cols="4" sm="3">
          <v-select
              v-model="pageSize"
              :items="pageSizes"
              label="Элементов на странице"
              @change="handlePageSizeChange"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="9">
          <v-pagination
              v-model="page"
              :length="totalPages"
              total-visible="7"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ProductDataService from "../services/ProductDataService";
import CategoriesDataService from "@/services/CategoriesDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      searchTitle: "",
      headers: [
        { text: "Название", align: "start", value: "title", sortable: true  },
        { text: "Описание", value: "description", sortable: true },
        { text: "Категория", value: "category", sortable: false },
      ],

      page: 1,
      totalPages: 0,
      pageSize: 5,
      category: "",

      pageSizes: [5, 10, 15],

      categories: []
    };
  },
  methods: {
    getRequestParams(searchTitle, page, pageSize, filterCategory) {
      let params = {};

      if (searchTitle) {
        params["q"] = searchTitle;
      }

      if (page) {
        params["page"] = page;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      if (filterCategory){
        params["filterBy"] = "category_id",
        params["filterValue"] = filterCategory
      }

      return params;
    },

    retrieveProducts() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize,
        this.category,
      );

      ProductDataService.getAll(params)
        .then((response) => {
          const tutorials = response.data.data;
          const total = response.data.meta.lastPage;

          this.tutorials = tutorials.map(this.getDisplayTutorial);
          this.totalPages = total;

        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveProducts();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveProducts();
    },

    handleFilterChange(category) {
      this.category =
          this.categories.filter(
              item=>item.name.includes(category)
          )[0].id;

      this.retrieveProducts();
    },

    handleFilter() {
      if (this.categories.length === 0){
        CategoriesDataService.getAll()
            .then((response) => {
              const firstCategory = {
                "id": 0,
                "name": ""
              }

              this.categories = response.data;
              this.categories = [firstCategory].concat(this.categories)
            })
            .catch((e) => {
              console.log(e);
            });
      }
    },

    refreshList() {
      this.retrieveProducts();
    },

    getDisplayTutorial(product) {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category
      };
    },
  },
  mounted() {
    this.retrieveProducts();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
