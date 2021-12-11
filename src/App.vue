<script>
import { wxLogin } from "./common/wxLogin";

export default {
  onLaunch: async function () {
    console.log("App Launch");
    this.wxLogin();
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    async wxLogin() {
      const res = await wxLogin();
      console.log("wx login result ------------ ", res);
    },
  },
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import "tailwindcss/utilities";
</style>
