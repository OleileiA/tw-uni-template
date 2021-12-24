import { getUrlParams } from "../common/util";

export default {
  data() {
    return {
      id: 0,
      showShareGuide: false,
      fromApp: false
    };
  },
  onLoad() {

  },
  methods: {
    toggleShareGuide() {
      this.showShareGuide = !this.showShareGuide;
    },
    getQueryParameter({ idKey, from }) {
      const obj = getUrlParams(window.location.href);
      this.id = obj[idKey];
      if (obj[from] === "app") {
        this.fromApp = true;
      }
    },
    initWxShare({ title, link = window.location.href, imgUrl, desc }) {
      const shareData = {
        title,
        link,
        imgUrl,
        desc,
      };
      const wx = window.jWeixin;
      wx.ready(() => {
        console.log("wx.ready -----------------------");
        wx.updateTimelineShareData(shareData);
        wx.updateAppMessageShareData(shareData);
      });
    },
  },
};
