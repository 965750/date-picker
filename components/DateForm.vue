<template>
  <div class="dateForm__wrapper">
    <p class="dateForm__label">
      Dates
    </p>
    <div class="dateForm">
      <p class="dateForm__actions">
        <span
          :class="{
            'dateForm__btn': true,
            'dateForm__btn--active': calendarType === 'start'
          }"
          @click="calendarType = 'start'"
        >
          {{ start }}
        </span>
        <v-icon class="dateForm__arrowIcon" name="arrow-right" />
        <span
          :class="{
            'dateForm__btn': true,
            'dateForm__btn--active': calendarType === 'end'
          }"
          @click="calendarType = 'end'"
        >{{ end }}</span>
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
          start: new Date(new Date(2019, 8, 3)),
          end: new Date(new Date(2019, 8, 10))
        },
        {
          start: new Date(new Date(2019, 8, 22)),
          end: new Date(new Date(2019, 8, 27))
        },
        {
          start: new Date(new Date(2019, 9, 8)),
          end: new Date(new Date(2019, 9, 24))
        }
      ]
    }
  },
  methods: {
    changeDate (day) {
      const date = new Date(day.timestamp)
      const year = date.getFullYear()
      const month = date.getMonth()

      this[this.calendarType] = `${day.label}/${month}/${year}`
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/variables';

.dateForm {
  border: 1px solid $silverSand;
  height: 36px;
  border-radius: 2px;
  padding: 5px;
  box-sizing: border-box;

  &__actions {
    position: relative;
    display: flex;
    justify-content: space-between;
    line-height: 24px;
  }

  &__arrowIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 24px;
    width: 24px;
  }

  &__btn {
    padding: 0 10px;
    cursor: pointer;

    &--active {
      background: $aquaIsland;
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
