import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import DateForm from './DateForm'

const localVue = createLocalVue()

describe('DateForm.vue', () => {
  const createWrapper = () => shallowMount(DateForm, {
    localVue,
    stubs: {
      VIcon: true
    }
  })

  it('should initial snapshot', () => {
    const wrapper = createWrapper()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should open calendar as check in', () => {
    const wrapper = createWrapper()

    expect(wrapper.vm.calendarType).toBe(null)

    wrapper.find('#checkIn').trigger('click')

    expect(wrapper.vm.calendarType).toBe('start')
  })

  it('should open calendar as check out', () => {
    const wrapper = createWrapper()

    expect(wrapper.vm.calendarType).toBe(null)

    wrapper.find('#checkOut').trigger('click')

    expect(wrapper.vm.calendarType).toBe('end')
  })

  it('should change check in label to date that was provided', () => {
    const wrapper = createWrapper()

    wrapper.find('#checkIn').trigger('click')

    wrapper.vm.changeDate({
      label: 9,
      timestamp: 1567980000000
    })

    expect(wrapper.vm.start).toBe('9/8/2019')
  })
})
