<template>
  <div class="dateForm__wrapper">
    {{ openCalendar }}
    <p class="dateForm__label">
      Dates
    </p>
    <div class="dateForm">
      <p class="dateForm__actions">
        <span :class="['dateForm__btn', openCalendar === 1 ? 'dateForm__btn--active' : '']" @click="openCalendar = 1">Check In</span>
        <v-icon class="dateForm__arrowIcon" name="arrow-right" />
        <span :class="['dateForm__btn', openCalendar === 2 ? 'dateForm__btn--active' : '']" @click="openCalendar = 2">Check Out</span>
      </p>
    </div>
    <DatePicker v-if="openCalendar !== 0" />
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
      openCalendar: 0
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
