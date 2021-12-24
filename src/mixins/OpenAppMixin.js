import { isAndroidOrIOS } from "../common/util";
import rrjConfig from "../config/index";

export default {
  data() {
    return {
      phoneType: "ios",
      showOpenAppModal: false,
    };
  },
  methods: {
    openApp() {
      if (this.fromApp) return;
      this.phoneType = isAndroidOrIOS();
      // this.showOpenAppModal = true;
      if (this.phoneType === "ios") {
        window.location.href = rrjConfig.iosAppDownloadLink;
      } else {
        window.location.href = rrjConfig.androidAppDownloadLink;
      }
    },
  },
};
