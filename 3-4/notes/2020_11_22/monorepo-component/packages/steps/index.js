import Steps from './packages/steps/src/steps.vue'

Steps.install = Vue => {
  Vue.component(Steps.name, Steps)
}

export default Steps