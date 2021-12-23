import { getSysInfo } from "../common/util";

export default {
  data() {
    return {
      texts: [],
      images: [],
      maxHeight: 0,
      audio: ''
    };
  },
  methods: {
    processNormalDynamic(data) {
      const content = JSON.parse(data.content);
      if (content?.length) {
        let audio = '';
        const texts = [];
        const images = [];
        let maxHeight = 0;
        let highestWidth = 0;

        content.forEach((item) => {
          if (item.type === "image") {
            if (item.height > maxHeight) {
              maxHeight = item.height;
              highestWidth = item.width;
            }
            images.push(item.content);
          }
          else if (item.type === 'text') {
            texts.push(item.content);
          }
          else if (item.type === 'audio') {
            audio = item.content;
          }
        });

        // 图片关于尺寸的计算
        let radio = 0;
        if (images.length) {
          const { windowWidth } = getSysInfo();
          console.log("windosWidth -----------------", windowWidth);
          radio = windowWidth / highestWidth;
          maxHeight = maxHeight * radio;
          let maxLimit = 500;
          let minLimit = (windowWidth / 4) * 3;
          if (maxHeight > maxLimit) maxHeight = maxLimit;
          else if (maxHeight < minLimit) maxHeight = minLimit;
        }

        // 赋值
        this.audio = audio;
        this.texts = texts;
        this.images = images;
        this.maxHeight = maxHeight;
      }
    },
  },
};
