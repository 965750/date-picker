<template>
  <div v-if="error" class="notification">
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    pickedDates: {
      required: true,
      type: Object
    },
    availableDates: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      error: null
    }
  },
  watch: {
    pickedDates: {
      handler (val) {
        if (val.start && val.end) {
          this.validate()
        }
      },
      deep: true
    }
  },
  methods: {
    validate () {
      const startTimestamp = this.pickedDates.start.timestamp
      const endTimestamp = this.pickedDates.end.timestamp

      let error = null
      let counter = this.availableDates.length
      console.log(counter)
      this.availableDates.forEach((date) => {
        if (
          startTimestamp <= date.end.getTime() &&
          startTimestamp >= date.start.getTime() &&
          endTimestamp <= date.end.getTime() &&
          endTimestamp >= date.start.getTime()
        ) {
          error = null
          counter--
        }
      })

      if (startTimestamp > endTimestamp) {
        error = 'Check In date should be earlier than Check Out date'
      }

      this.error = error
    }
  }
}
</script>

<style lang="scss">
.notification {
  background: #ff5f4a;
  border-radius: 4px;
  padding: 10px;
  color: #FFF;
  margin-top: 10px;
  text-align: center;
}
</style>
