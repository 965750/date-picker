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
          class="datePicker__day"
        />
        <div
          v-for="day in daysInMonth"
          :key="`calendar-${day.label}`"
          class="datePicker__day"
        >
          {{ day.label }}
        </div>
      </div>
    </div>
    {{ month }} --- {{ year }}
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
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
      console.log(new Date(2019, 3, 22).getTime())
      const days = new Array(new Date(this.year, this.month + 1, 0).getDate())
      days.fill(1)

      const fullDays = days.map((day, index) => {
        return {
          label: index + 1,
          timestamp: new Date(2019, 4, index + 1).getTime()
        }
      })

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

  &__day {
    text-align: center;
    width: 40px;
    height: 40px;
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
</style>
