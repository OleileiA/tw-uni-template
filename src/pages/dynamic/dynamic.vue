<template>
  <view class="wrapper" :style="mainStyle">
    <view>
      <u-parse :content="head"></u-parse>
    </view>
    <view class="px-std box-border">
      <u-parse :content="content"></u-parse>
    </view>
  </view>
</template>
<script>
import uParse from "uview-ui/components/u-parse/u-parse";
import { getDynamicDetail } from "../../api";
import { getCustomTitleHtml } from "../../config/dynamicCustomTitle";

export default {
  components: {
    uParse,
  },
  data: function () {
    return {
      head: "",
      content: "",
    };
  },
  async onLoad() {
    await this.getDynamicDetail();
  },
  methods: {
    async getDynamicDetail(exercise_id = 7334, label) {
      const { result, data } = await getDynamicDetail({ exercise_id, label });
      if (result === "ok") {
        const parsedContent = JSON.parse(data.content);
        console.log("parsed", parsedContent);
        this.head = parsedContent?.template?.head?.content;
        this.content = this.wrapperContent(
          parsedContent?.template?.mainStyle?.content,
          this.puzzleContent(parsedContent?.contents)
        );
        console.log("this.content ------------", this.content);
      }
    },

    // content加上包裹
    wrapperContent(mainStyle, mainContent) {
      const splitArr = mainStyle.split("${mainContent}");
      console.log("12312313", splitArr);
      return splitArr[0] + mainContent + splitArr[1];
    },
    // 拼接富文本
    puzzleContent(contents) {
      let puzzledContent = "";
      if (contents?.length) {
        contents.forEach((item) => {
          if (item.type === "title") {
            puzzledContent += this.formatTitleTypeContent(item);
          } else if (item.type === "text") {
            puzzledContent += this.formatTextTypeContent(item);
          }
        });
      }
      return puzzledContent;
    },
    // 处理text
    formatTextTypeContent(content) {
      // TODO: 这里的拼接应该考虑图上字下，还是图下字上
      let richText = "";
      if (content.imgUrl) {
        richText += `<p><img src="${content.imgUrl}" /></p>`;
      }
      return richText + content.content;
    },
    // 处理title
    formatTitleTypeContent(content) {
      // 处理一下URL编码
      if (content.formats.color.indexOf("%") === 0) {
        content.formats.color = decodeURIComponent(content.formats.color);
      }
      return getCustomTitleHtml(content.text, content.model, content.formats);
    },
  },
};
</script>
