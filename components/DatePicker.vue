<template>
  <div>
    <div class="datePicker__header">
      <div class="datePicker__arrowIcon" @click="changeMonth(-1)">
        <v-icon name="chevron-left" @click="changeMonth(-1)" />
      </div>
      <p>{{ month | namesOfMonths }} {{ year }}</p>
      <div class="datePicker__arrowIcon" @click="changeMonth(1)">
        <v-icon name="chevron-right" />
      </div>
    </div>
    <div class="datePicker__calendar">
      <div class="datePicker__daysLabels">
        <div
          v-for="day in days"
          :key="day"
          class="datePicker__dayLabel"
        >
          {{ day | shortLabel }}
        </div>
      </div>
      <div class="datePicker__days">
        <div
          v-for="space in daysSpacing"
          :key="`spacing-${space}`"
          class="day"
        />
        <div
          v-for="day in daysInMonth"
          :key="`calendar-${day.label}`"
          :class="{
            'day': true,
            'day__wrapper--available': day.availableType === 1
          }"
          @click="pickDate(day)"
        >
          <div
            :class="{
              'day__wrapper--circle': day.availableType === 3 || day.availableType === 2,
              'day__wrapper--picked': isPicked(day)
            }"
          />

          <div
            v-if="day.availableType === 3 || day.availableType === 2"
            :class="{
              'day__wrapper--availableRight': day.availableType === 2,
              'day__wrapper--availableLeft': day.availableType === 3
            }"
          />
          <span
            :class="{
              'day__label': true,
              'day__label--available': day.availableType === 2 || day.availableType === 3,
              'day__label--picked': isPicked(day)
            }"
          >
            {{ day.label }}
          </span>
        </div>
      </div>
    </div>
    <Notification :picked-dates="pickedDates" :available-dates="availableDates" />
  </div>
</template>

<script>
import Notification from './Notification'

export default {
  name: 'DatePicker',
  components: {
    Notification
  },
  props: {
    calendarType: {
      required: true,
      type: [String, Boolean]
    },
    availableDates: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      year: null,
      month: null,
      pickedDates: {
        start: null,
        end: null
      }
    }
  },
  computed: {
    daysSpacing () {
      const spacing = new Date(this.year, this.month, 0).getDay() + 1

      if (spacing > 6) {
        return 0
      } else {
        return spacing
      }
    },
    daysInMonth () {
      const days = new Array(new Date(this.year, this.month + 1, 0).getDate())
      days.fill(1)

      const fullDays = days.map((day, index) => {
        const timestamp = new Date(this.year, this.month, index + 1).getTime()
        let availableType = 0

        this.availableDates.forEach((date) => {
          if (timestamp < date.end.getTime() && timestamp > date.start.getTime()) {
            availableType = 1
          }

          if (timestamp === date.start.getTime()) {
            availableType = 2
          }

          if (timestamp === date.end.getTime()) {
            availableType = 3
          }
        })

        return {
          label: index + 1,
          timestamp,
          availableType
        }
      })

      return fullDays
    }
  },
  mounted () {
    this.year = new Date().getFullYear()
    this.month = new Date().getMonth()
  },
  methods: {
    pickDate (day) {
      this.$emit('changeDate', day)
      this.pickedDates[this.calendarType] = day
    },
    isPicked (day) {
      return (this.pickedDates.start && this.pickedDates.start.timestamp === day.timestamp) || (this.pickedDates.end && this.pickedDates.end.timestamp === day.timestamp)
    },
    changeMonth (value) {
      if (this.month === 11 && value === 1) {
        this.year++
        this.month = 0
      } else if (this.month === 0 && value === -1) {
        this.year--
        this.month = 11
      } else {
        this.month += value
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/variables';

.datePicker {

  &__header {
    background: $caribbeanGreen;
    height: 60px;
    line-height: 60px;
    color: #FFF;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
  }

  &__arrowIcon {
    padding: 0 5px;
    color: $capeCod;
    cursor: pointer;
  }

  &__days {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  &__daysLabels {
    display: flex;
    font-size: 14px;
    color: $silverSand;
  }

  &__dayLabel {
    width: 40px;
    text-align: center;
  }

  &__calendar {
    padding: 19px;
    border: 1px solid $silverSand;
  }
}

.day {
  text-align: center;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: relative;
  margin: 2px 0;

  &:hover {
    cursor: pointer;
  }

  &__label {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &--available {
      color: #FFF;
    }

    &--picked {
      color: $caribbeanGreen;
    }
  }
  &__wrapper {

    &--available {
      background: $onahau;
      color: $caribbeanGreen;

      &:hover {
        cursor: pointer;
      }
    }

    &--circle {
      position: absolute;
      top: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: $caribbeanGreen;
      color: #FFF;
    }

    &--picked {
      @extend .day__wrapper--circle;
      background: $onahau;
      border: 3px solid $caribbeanGreen;
    }

    &--availableRight {
      position: absolute;
      z-index: 1;
      background: $onahau;
      width: 50%;
      height: 100%;
      top: 0;
      right: 0;
    }

    &--availableLeft {
      @extend .day__wrapper--availableRight;
      left: 0;
    }
  }
}
</style>
