const { defaultPreset } = require("./tw_mp_preset/dist");

module.exports = {
  purge: defaultPreset.purge.content,
  presets: [defaultPreset],
  important: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        std: "30rpx",
        17: "68rpx",
      },
      fontSize: {
        std: "30rpx",
      },
      borderRadius: {
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
