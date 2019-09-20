<template>
  <div class="datePicker__wrapper">
    {{ openCalendar }}
    <p class="datePicker__label">
      Dates
    </p>
    <div class="datePicker">
      <p class="datePicker__actions">
        <span :class="['datePicker__btn', openCalendar === 1 ? 'datePicker__btn--active' : '']" @click="openCalendar = 1">Check In</span>
        <span :class="['datePicker__btn', openCalendar === 2 ? 'datePicker__btn--active' : '']" @click="openCalendar = 2">Check Out</span>
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
.datePicker {
  border: 1px solid #D6D6D6;
  height: 36px;
  border-radius: 2px;
  padding: 5px;
  box-sizing: border-box;

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
