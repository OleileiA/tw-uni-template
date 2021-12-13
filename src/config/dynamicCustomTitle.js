// 自定义标题模板的名字
export const elegant = "elegant";
export const ChinaStyle = "ChinaStyle";
export const peaceMountain = "peaceMountain";
export const orange = "orange";

// 获自定义标题的模板
export function getCustomTitleHtml(title, model, formats) {
  console.log("formats", formats);
  // {
  //   align: "left"
  //   color: "#2b2b2b"
  //   fontSize: "2.1"
  // }

  if (model === elegant) {
    return `<div style="padding-top: 30px; padding-bottom: 30px;">
  <div style="display: flex; justify-content: ${formats.align}; align-items: center; color: ${formats.color}; font-size: ${formats.fontSize}rem;">
    <img style="flex: none; width: ${formats.fontSize}rem; height: ${formats.fontSize}rem;" src="https://image.renrenjiang.cn/sqy_changwen/customTitle/style/elegant-left.png" />
    <div style="line-height: ${formats.fontSize}rem; padding-left: 5px; padding-right: 5px; max-width: 300px; word-break: keep-all; white-space: nowrap;">${title}</div>
    <img style="flex: none; width: ${formats.fontSize}rem; height: ${formats.fontSize}rem;" src="https://image.renrenjiang.cn/sqy_changwen/customTitle/style/elegant-right.png" />
  </div>
</div>`;
  } else if (model === ChinaStyle) {
    return `<div style="padding-top: 30px; padding-bottom: 30px;">
  <div style="display: flex; justify-content: ${
    formats.align
  }; align-items: center; color: ${formats.color}; font-size: ${
      formats.fontSize
    }rem;">
    <div style="line-height: ${
      formats.fontSize
    }rem; padding-left: 5px; padding-right: 5px; max-width: 300px; word-break: keep-all; white-space: nowrap;">${title}</div>
    <img style="position: relative; margin-left: ${
      -formats.fontSize * 1.2
    }rem; z-index: -1; flex: none; width: ${
      formats.fontSize * 1.4
    }rem; height: ${
      formats.fontSize * 1.5
    }rem;" src="https://image.renrenjiang.cn/sqy_changwen/customTitle/style/China-style-right.png" />
  </div>
</div>`;
  } else if (model === peaceMountain) {
    return `<div style="padding-top: 30px; padding-bottom: 30px;">
  <div style="display: flex; justify-content: ${formats.align}; align-items: center; color: ${formats.color}; font-size: ${formats.fontSize}rem;">
    <img style="flex: none; width: ${formats.fontSize}rem; height: ${formats.fontSize}rem;" src="https://image.renrenjiang.cn/sqy_changwen/customTitle/style/mountain-peace-left.png" />
    <div style="line-height: ${formats.fontSize}rem; padding-left: 5px; padding-right: 5px; max-width: 300px; word-break: keep-all; white-space: nowrap;">${title}</div>
    <img style="flex: none; width: ${formats.fontSize}rem; height: ${formats.fontSize}rem;" src="https://image.renrenjiang.cn/sqy_changwen/customTitle/style/mountain-peace-right.png" />
  </div>
</div>`;
  } else if (model === orange) {
    return `<div style="padding-top: 30px; padding-bottom: 30px;">
  <div style="display: flex; justify-content: ${formats.align}; align-items: center; color: ${formats.color}; font-size: ${formats.fontSize}rem;">
    <img style="flex: none; width: ${formats.fontSize}rem; height: ${formats.fontSize}rem;" src="https://image.renrenjiang.cn/sqy_changwen/customTitle/style/orange-left.png" />
    <div style="height: ${formats.fontSize}rem; line-height: ${formats.fontSize}rem; background-color: #F68342; padding-left: 5px; padding-right: 5px; max-width: 300px; word-break: keep-all; white-space: nowrap;">${title}</div>
    <img style="flex: none; width: ${formats.fontSize}rem; height: ${formats.fontSize}rem;" src="https://image.renrenjiang.cn/sqy_changwen/customTitle/style/orange-right.png" />
  </div>
</div>`;
  }
}
