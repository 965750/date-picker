import {
  mount,
  createLocalVue
} from '@vue/test-utils'
import { shortLabel, namesOfMonths } from '../plugins/myFilters'
import DatePicker from './DatePicker'

const localVue = createLocalVue()

localVue.filter('shortLabel', shortLabel)
localVue.filter('namesOfMonths', namesOfMonths)

const initialProps = {
  calendarType: 'start',
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

describe('DatePicker.vue', () => {
  const createWrapper = (props = initialProps) => mount(DatePicker, {
    localVue,
    propsData: {
      ...props
    },
    stubs: {
      VIcon: true
    }
  })

  it('should match snapshot', () => {
    const wrapper = createWrapper()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should move calendar to previous month', () => {
    const wrapper = createWrapper()

    wrapper.setData({
      year: 2017,
      month: 3
    })

    expect(wrapper.find('#calendarHeader').text()).toBe('April 2017')

    wrapper.find('#arrowLeft').trigger('click')

    expect(wrapper.find('#calendarHeader').text()).toBe('March 2017')
  })

  it('should move calendar to previous month and year', () => {
    const wrapper = createWrapper()

    wrapper.setData({
      year: 2017,
      month: 0
    })

    expect(wrapper.find('#calendarHeader').text()).toBe('January 2017')

    wrapper.find('#arrowLeft').trigger('click')

    expect(wrapper.find('#calendarHeader').text()).toBe('December 2016')
  })

  it('should move calendar to next month and year', () => {
    const wrapper = createWrapper()

    wrapper.setData({
      year: 2017,
      month: 11
    })

    expect(wrapper.find('#calendarHeader').text()).toBe('December 2017')

    wrapper.find('#arrowRight').trigger('click')

    expect(wrapper.find('#calendarHeader').text()).toBe('January 2018')
  })

  it('should emit changeDate with day that was clicked', () => {
    const wrapper = createWrapper()

    const day = {
      label: 9,
      timestamp: 1567980000000
    }

    wrapper.vm.pickDate(day)

    expect(wrapper.emitted().changeDate[0][0]).toBe(day)
  })

  it('should return true when day from calendar match day picked', () => {
    const wrapper = createWrapper()

    const day = {
      label: 9,
      timestamp: 1567980000000
    }

    wrapper.setData({
      pickedDates: {
        start: day,
        end: null
      }
    })

    expect(wrapper.vm.isPicked(day)).toBe(true)
  })

  it('should return false when day from calendar does NOT match day picked', () => {
    const wrapper = createWrapper()

    const day = {
      label: 9,
      timestamp: 1567980000000
    }

    wrapper.setData({
      pickedDates: {
        end: {
          label: 1,
          timestamp: 1567288800000
        },
        start: null
      }
    })

    expect(wrapper.vm.isPicked(day)).toBe(false)
  })
})
