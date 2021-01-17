<template>
  <div>
    <label>{{ label }}</label>
    <div>
      <slot></slot>
      <p v-if="errMessage">{{ errMessage }}</p>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
export default {
  name: 'LgFormItem',
  inject: ['form'],
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  mounted () {
    
    this.$on('validate', () => {
      this.validate()
    })
  },
  data () {
    return {
      errMessage: ''
    }
  },
  methods: {
    validate () {
      if (!this.prop) return
      const value = this.form.model[this.prop]
      const rules = this.form.rules[this.prop]
      console.log(1);
      const descriptor = { [this.prop]: rules }
      const validator = new AsyncValidator(descriptor)
      console.log(2);
      return validator.validate({ [this.prop]: value }, err => {
        if (err) {
          this.errMessage = err[0].message
        } else {
          this.errMessage = ''
        }
      })
    }
  }
}
</script>

<style>

</style>