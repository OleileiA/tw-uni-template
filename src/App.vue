<script>
import { appInit } from "./common/appInit";

export default {
  onLaunch: async function () {
    console.log("App Launch");
    appInit();
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {},
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import "tailwindcss/utilities";
</style>
