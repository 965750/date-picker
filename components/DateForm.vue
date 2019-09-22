<template>
  <div class="dateForm__wrapper">
    {{ calendarType }}
    <p class="dateForm__label">
      Dates
    </p>
    <div class="dateForm">
      <p class="dateForm__actions">
        <span :class="['dateForm__btn', calendarType === 'start' ? 'dateForm__btn--active' : '']" @click="calendarType = 'start'">{{ start }}</span>
        <v-icon class="dateForm__arrowIcon" name="arrow-right" />
        <span :class="['dateForm__btn', calendarType === 'end' ? 'dateForm__btn--active' : '']" @click="calendarType = 'end'">{{ end }}</span>
      </p>
    </div>
    <DatePicker v-if="calendarType !== null" :calendar-type="calendarType" :available-dates="availableDates" @changeDate="changeDate" />
  </div>
</template>
<script>
import DatePicker from './DatePicker'

export default {
  name: 'DateForm',
  components: {
    DatePicker
  },
  data () {
    return {
      start: 'Check In',
      end: 'Check Out',
      calendarType: null,
      availableDates: [
        {
          start: new Date(new Date(2019, 4, 2)),
          end: new Date(new Date(2019, 4, 9))
        },
        {
          start: new Date(new Date(2019, 3, 22)),
          end: new Date(new Date(2019, 3, 26))
        },
        {
          start: new Date(new Date(2019, 3, 12)),
          end: new Date(new Date(2019, 3, 19))
        }
      ]
    }
  },
  methods: {
    changeDate (day) {
      console.log(day, 1111)

      const date = new Date(day.timestamp)

      const year = date.getFullYear()
      const month = date.getMonth()

      console.log(date, year, month)
      this[this.calendarType] = `${day.label}/${month}/${year}`
    }
  }
}
</script>

<style lang="scss">
.dateForm {
  border: 1px solid #D6D6D6;
  height: 36px;
  border-radius: 2px;
  padding: 5px;
  box-sizing: border-box;

  &__arrowIcon {
    height: 24px;
    width: 24px;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    line-height: 24px;
  }

  &__btn {
    padding: 0 10px;
    cursor: pointer;

    &--active {
      background: #A0DAD4;
    }
  }

  &__wrapper {
    width: 320px;
  }

  &__label {
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
