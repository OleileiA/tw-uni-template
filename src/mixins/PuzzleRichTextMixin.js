import { getCustomTitleHtml } from "../config/dynamicCustomTitle";

export default {
  methods: {
    // 拼接富文本
    puzzleContent(contents, layout) {
      let puzzledContent = "";
      if (contents?.length) {
        contents.forEach((item) => {
          if (item.type === "title") {
            puzzledContent += this.formatTitleTypeContent(item);
          } else if (item.type === "text") {
            puzzledContent += this.formatTextTypeContent(item, layout);
          }
        });
      }
      return puzzledContent;
    },
    // 处理text
    formatTextTypeContent(content, layout) {
      // TODO: 这里的拼接应该考虑图上字下，还是图下字上
      let richText = "";
      if (content.imgUrl) {
        if (layout === 0) {
          // 图上字下
          richText = `<p><img src="${content.imgUrl}" /></p>` + richText;
        } else {
          // 字上图下
          richText += `<p><img src="${content.imgUrl}" /></p>`;
        }
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
