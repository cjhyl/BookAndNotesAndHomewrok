<template>
  <div class="lg-steps">
    <div class="lg-steps-line"></div>
    <div 
      class="lg-step" 
      v-for="i in count" 
      :key="i"
      :style="{'color':active >= i ? activeColor : defaultColor}"
    >
      {{ i }}
    </div>
  </div>
</template>

<script>
import './packages/steps/src/steps.css'
export default {
  name: 'LgSteps',
  props: {
    count: {
      type: Number,
      default: 3
    },
    active: {
      type: Number,
      default: 0
    },
    activeColor: {
      type: String,
      default: 'red'
    },
    defaultColor: {
      type: String,
      default: 'green'
    },
  }
}
</script>

<style>

</style>