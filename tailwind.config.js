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
        sharedark: "#1B1B1C",
      },
      spacing: {
        "2d5": "20rpx",
        std: "30rpx",
        "4d5": "36rpx",
        "8d5": "68rpx",
        "8d75": "70rpx",
        "10d5": "84rpx",
        "11d25": "90rpx",
        13.75: "110rpx",
        15: "120rpx",
        "16d25": "130rpx",
        "18d75": "150rpx",
        "35d5": "284rpx",
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
