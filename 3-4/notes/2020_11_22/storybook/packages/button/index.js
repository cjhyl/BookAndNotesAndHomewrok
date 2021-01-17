import Button from './src/button.vue'

Button.install = Vue => {
  Vue.component(Button.name, BUtton)
}

export default Button