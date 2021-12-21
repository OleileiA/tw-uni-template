import { isAndroidOrIOS } from '../common/util';
import rrjConfig from "../config/index";

export default {
  data() {
    return {
      phoneType: 'ios'
    }
  },
  methods: {
    openApp() {
      this.phoneType = isAndroidOrIOS();
      if (this.phoneType === "ios") {
        window.location.href = rrjConfig.iosAppDownloadLink;
      } else {
        window.location.href = rrjConfig.androidAppDownloadLink;
      }
    }
  }
}
