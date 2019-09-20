import Vue from 'vue'

export function shortLabel (value) {
  return `${value.substr(0, 3)}`
}
const filters = { shortLabel }

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
