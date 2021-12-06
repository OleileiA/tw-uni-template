const { defaultPreset } = require('./tw_mp_preset/dist')

module.exports = {
  purge: [defaultPreset.purge.content],
  presets: [defaultPreset],
  important: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
