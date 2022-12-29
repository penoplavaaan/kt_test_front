module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: process.env.VUE_APP_PROXY_URL
  },
};
