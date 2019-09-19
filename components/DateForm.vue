<template>
  <div class="datePicker__wrapper">
    <p class="datePicker__label">
      Dates
    </p>
    <div class="datePicker">
      <p>
        <span>Check In</span>
        <span>Check Out</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DateForm',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.datePicker {
  border: 1px solid #D6D6D6;

  &__wrapper {
    width: 300px;
  }

  &__label {
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
