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
      },
      spacing: {
        "2d5": "20rpx",
        std: "30rpx",
        "8d5": "68rpx",
        "8d75": "70rpx",
        13.75: "110rpx",
        15: "120rpx",
        "18d75": "150rpx",
      },
      fontSize: {
        std: "30rpx",
        9: "36rpx",
      },
      borderRadius: {
        "3d5xl": "56rpx",
        "4xl": "64rpx",
        "5xl": "80rpx",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
