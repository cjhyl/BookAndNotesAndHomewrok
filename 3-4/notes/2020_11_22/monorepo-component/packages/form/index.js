import Form from './packages/form/src/form.vue'

Form.install = Vue => {
  Vue.component(Form.name, Form)
}

export default Form