const { defaultPreset } = require("./tw_mp_preset/dist");

module.exports = {
  purge: defaultPreset.purge.content,
  presets: [defaultPreset],
  important: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        theme: "#FF0000",
        dark: "#1B1B1C",
        themeDark: "#202020",
        golden: "#FFCF57",
        layout: "rgba(0, 0, 0, 0.8)",
      },
      spacing: {
        m1: "-8rpx",
        "2d5": "20rpx",
        std: "30rpx",
        "4d5": "36rpx",
        "6d5": "52rpx",
        "7d5": "60rpx",
        "8d5": "68rpx",
        "8d75": "70rpx",
        "10d5": "84rpx",
        "11d25": "90rpx",
        13: "104rpx",
        "13d75": "110rpx",
        15: "120rpx",
        "15d5": "124rpx",
        "16d25": "130rpx",
        "18d75": "150rpx",
        "21d5": "172rpx",
        30: "240rpx",
        "35d5": "284rpx",
        65: "520rpx",
      },
      fontSize: {
        "3d5": "28rpx",
        std: "30rpx",
        9: "36rpx",
      },
      borderRadius: {
        "3d5xl": "56rpx",
        "4xl": "64rpx",
        "5xl": "80rpx",
      },
      lineHeight: {
        11: "88rpx",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
