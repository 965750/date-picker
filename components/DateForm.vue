<template>
  <div class="datePicker__wrapper">
    <p class="datePicker__label">
      Dates
    </p>
    {{ openCalendar }}
    <div class="datePicker">
      <p class="datePicker__actions">
        <span :class="['datePicker__btn', openCalendar === 1 ? 'datePicker__btn--active' : '']" @click="openCalendar = 1">Check In</span>
        <span :class="['datePicker__btn', openCalendar === 2 ? 'datePicker__btn--active' : '']" @click="openCalendar = 2">Check Out</span>
      </p>
    </div>

  </div>
</template>
<script>
export default {
  name: 'DateForm',
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
    width: 260px;
  }

  &__label {
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
