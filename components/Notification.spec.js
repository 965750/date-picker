import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import Notification from './Notification'

const localVue = createLocalVue()

const initialProps = {
  pickedDates: {
    start: {
      label: 4,
      timestamp: 1567548000000
    },
    end: {
      label: 9,
      timestamp: 1567980000000
    }
  },
  availableDates: [
    {
      start: new Date(2019, 8, 3),
      end: new Date(2019, 8, 10)
    },
    {
      start: new Date(2019, 8, 22),
      end: new Date(2019, 8, 27)
    },
    {
      start: new Date(2019, 9, 8),
      end: new Date(2019, 9, 24)
    }
  ]
}

describe('Notification.vue', () => {
  const createWrapper = (props = initialProps) => shallowMount(Notification, {
    localVue,
    propsData: {
      ...props
    }
  })

  it('should match empty snapshot when dates were picked correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should activate error notification when dates were picked out of the available range', () => {
    const wrapper = createWrapper()

    wrapper.setProps({
      pickedDates: {
        start: {
          label: 1,
          timestamp: 1567288800000
        },
        end: {
          label: 9,
          timestamp: 1567980000000
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should activate error notification when check out date is earlier than check in date', () => {
    const wrapper = createWrapper()

    wrapper.setProps({
      pickedDates: {
        start: {
          label: 9,
          timestamp: 1567980000000
        },
        end: {
          label: 4,
          timestamp: 1567548000000
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should NOT activate error notification when only one date was picked', () => {
    const wrapper = createWrapper()

    wrapper.setProps({
      pickedDates: {
        start: {
          label: 9,
          timestamp: 1567980000000
        },
        end: null
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
