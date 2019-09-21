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
          :class="[`day`, day.availableType === 1 ? 'day__wrapper--available' : '']"
        >
          <div
            :class="[
              day.availableType === 2 ? 'day__wrapper--circle' : '',
              day.availableType === 3 ? 'day__wrapper--circle' : '',
            ]"
          />

          <div
            v-if="day.availableType === 3 || day.availableType === 2"
            :class="[
              day.availableType === 2 ? 'day__wrapper--availableRight' : '',
              day.availableType === 3 ? 'day__wrapper--availableLeft' : '',
            ]"
          />
          <span
            :class="[
              'day__label',
              day.availableType === 2 || day.availableType === 3 ? 'day__label--available' : '',
            ]"
          >
            {{ day.label }}
          </span>
        </div>
      </div>
    </div>
    {{ month }} --- {{ year }}
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    availableDates: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      year: 2019,
      month: 3
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
      console.log(fullDays, 44444)
      return fullDays
    }
  },
  methods: {
    changeMonth (value) {
      console.log('clicked')
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
.datePicker {

  &__header {
    background: #00DBB1;
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
    color: #44514D;
    cursor: pointer;
  }

  &__days {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }

  &__daysLabels {
    display: flex;
    font-size: 14px;
    color: #C7C9CC;
  }

  &__dayLabel {
    width: 40px;
    text-align: center;
  }

  &__calendar {
    padding: 19px;
    border: 1px solid #D6D6D6;
    min-height: 260px;
  }
}

.day {
  text-align: center;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: relative;

  &:hover {
    border: 2px solid #01DBB3;
    border-radius: 50%;
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
  }
  &__wrapper {

    &--available {
      background: #C3FEF8;
      color: #3AD8B8;

      &:hover {
        border: 2px solid #01DBB3;
        border-radius: 50%;
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
      background: #01DBB3;
      color: #FFF;
    }

    &--availableRight {
      position: absolute;
      z-index: 1;
      background: #C3FEF8;
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
