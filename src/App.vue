<template>
  <v-app>
    <v-app-bar app dark >

      <v-btn to="/products" text>
        Товары
      </v-btn>

      <v-btn to="/add" text>
        Добавить
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>
