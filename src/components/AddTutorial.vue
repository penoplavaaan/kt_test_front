<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Загрузить новые товары</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-file-input
            accept="text/xml"
            show-size
            v-model="files"
        />
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveTutorial">Загрузить</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Загрузка началась!
        </v-card-title>

        <v-card-subtitle>
          <p>Она будет происходить на фоне и может занять продолжительное время.</p>
          <p>Рекомендуем запастись терпением, кофе и печеньками.</p>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newTutorial">Повторить</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/ProductDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      files: null,
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      let formData = new FormData()
      formData.append("products", this.files )

      TutorialDataService.create(formData)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
