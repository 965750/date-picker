<template>
  <div class="app">
    <DateForm />
  </div>
</template>

<script>
import DateForm from '~/components/DateForm'

export default {
  components: {
    DateForm
  }
}
</script>

<style lang="scss">
.app {
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translate(-50%);
}
</style>
