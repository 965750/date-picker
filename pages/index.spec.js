import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import index from './index'

const localVue = createLocalVue()

describe('index.vue', () => {
  const createWrapper = () => shallowMount(index, {
    localVue
  })

  it('should initial snapshot', () => {
    const wrapper = createWrapper()

    expect(wrapper.element).toMatchSnapshot()
  })
})
