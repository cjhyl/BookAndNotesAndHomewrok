import input from '../src/input.vue'
import { mount } from '@vue/test-utils'
import { testMatch } from '../../../jest.config'

describe('lg-input', () => {
  //测试
  test('input-text', () => {
    const wrapper = mount(input)
    expect(wrapper.html()).toContain('input type="text"')
  })

  //测试类型为password的组件
  test('input-password', () => {
    const wrapper = mount(input, {
      propsData: {
        type: 'password'
      }
    })
    expect(wrapper.html()).toContain('input type="password"')
  })

  //测试组件值的状态
  test('input-password', () => {
    const wrapper = mount(input, {
      propsData: {
        type: 'password',
        value: 'admin'
      }
    })
    expect(wrapper.props('value')).toBe('admin')
  })

  //测试的快照
  //先把组件的快照保存到一个文本文件中作为基准，后面有改变时会对比文本文件
  //yarn test -u会删除之前的快照，重新生成新的
  test('input-snapshot', () => {
    const wrapper = mount(input, {
      propsData: {
        type: 'password',
        value: 'admin'
      }
    })
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})