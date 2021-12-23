import { getSysInfo } from "../common/util";

export default {
  data() {
    return {
      type: 1,
      content: "",
      customHead: 0,
      contentHeight: 579,
    };
  },
  methods: {
    processRichTextDynamic(data) {
      const parsedContent = JSON.parse(data.content);
      this.content = this.puzzleContent(
        parsedContent?.contents,
        parsedContent?.layout
      );

      // 判断是否有主题
      if (parsedContent?.template?.mainStyle?.templateType === 0) {
        // 无主题
        this.customHead = 0;
      } else {
        // 主题处理
        // 头部处理
        if (parsedContent?.template?.head?.customHead > 0) {
          // 自定义头部
        } else {
          // 默认头部
          this.customHead = 0;
        }
      }
    },
    calContentDomInfo() {
      this.$uGetRect("#contentWrapper").then((res) => {
        const { windowHeight } = getSysInfo();
        this.contentHeight = windowHeight - res.top;
      });
    },
  },
};
