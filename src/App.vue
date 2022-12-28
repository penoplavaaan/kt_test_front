<template>
  <v-app>
    <v-app-bar app dark >

      <v-btn to="/products" text>
        Товары
      </v-btn>

      <v-btn to="/add" text>
        Добавить
      </v-btn>

      <v-banner>
        Задач в очереди на обработку: {{filesInQueue}}
        <span v-if="filesInQueue === 0">. Будьте внимательны: возможно, товары все еще добавляются.</span>
        <span v-else>⚠! Файлы все еще обрабатываются, новые товары пока не добавляются.</span>
      </v-banner>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import ProductDataService from "@/services/ProductDataService";

export default {
  name: "app",
  data() {
    return {
      filesInQueue: 0,
    };
  },
  created() {
    this.retrieveCount()
    this.timer = setInterval(this.retrieveCount, 15000);
  },
  destroyed () {
    this.cancelAutoUpdate();
  },
  methods:{
    retrieveCount() {
      ProductDataService.getUnprocessedTasks()
          .then((response) => {
            this.filesInQueue = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
    },
  }
};
</script>
