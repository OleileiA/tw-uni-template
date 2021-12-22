// animates: (3) ["https://image.renrenjiang.cn/shiquyun/uploads/covers/b42fc4eb4309453b8c95f050ee5f58b4.jpg", "https://image.renrenjiang.cn/shiquyun/uploads/covers/3dab6f604c1a4ab1a8dbb4a3d08f4477.jpg", "https://image.renrenjiang.cn/shiquyun/uploads/covers/7580f2e40bae4fa0981325e0b5d130ec.jpg"]
// backgroundColor: "#015C79"
// communityBgColor: "#9EE5FF"
// communityFontColor: "#000000"
// fontFamily:
//     id: 1
// name: "宋体"
// url: "https://cdn-hz.renrenjiang.cn/shiquyun/template/1/songti.ttf"
// __proto__: Object
// footBgImage: "https://image.renrenjiang.cn/shiquyun/uploads/covers/c8dfa44d95c74513b15411061b582da0.jpg"
// padding: 15
// subtitleFontColor: "#C1DCF7"
// templateId: 14
// templateType: 1
// textFontColor: "#D0EBF4"
// titleFontColor: "#D4E7F2"
export default {
  data() {
    return {
      templateId: 0,
      templateType: 0,
      titleFontColor: "#fff",
      subtitleFontColor: "#fff",
      backgroundImg: '',
      backgroundColor: "transparent",
      textFontColor: "#fff",
      padding: "15px",
    };
  },
  methods: {
    /*
     * 1. 朗诵自定义的模板一定要处理mainStyle对象
     * */
    genMainStyle({ type, mainStyle }) {
      if (type === "declaim") {
        if (mainStyle.templateType === 0) {
          // 没有特殊效果
        } else if (mainStyle.templateType === 1) {
          // templateType1表示是带有背景，不用设置背景颜色，特殊效果为滑动毛玻璃
          this.templateId = mainStyle.templateId;
          this.templateType = mainStyle.templateType;
          this.titleFontColor = mainStyle.titleFontColor;
          this.subtitleFontColor = mainStyle.subtitleFontColor;
          this.textFontColor = mainStyle.textFontColor;
          this.padding = mainStyle.padding + "px";
          this.backgroundImg = mainStyle.background;
        }
      }
    },
  },
};
