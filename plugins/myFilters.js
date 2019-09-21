import Vue from 'vue'

export function shortLabel (value) {
  return `${value.substr(0, 3)}`
}

export function namesOfMonths (value) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return months[value]
}

const filters = { shortLabel, namesOfMonths }

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
