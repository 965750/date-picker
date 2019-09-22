import { shortLabel, namesOfMonths } from './myFilters'

describe('myFilters.js', () => {
  it('should return month by index', () => {
    expect(namesOfMonths(7)).toBe('August')
  })

  it('should return short version of text', () => {
    expect(shortLabel('Monday')).toBe('Mon')
  })
})
