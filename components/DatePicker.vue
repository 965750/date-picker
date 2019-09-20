<template>
  <div>
    <div class="datePicker__header">
      March 2018
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
          :key="`calendar-${day}`"
          class="datePicker__day"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data () {
    return {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      year: 2019,
      month: 0
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
      return new Date(this.year, this.month + 1, 0).getDate()
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
