import { formatTime,sortTimesDateAsc } from './timeHelper';

describe('timeHelper', () => {
  const date = "2019-08-21T15:00:00-04:00";
  const times = [
    "2019-08-25T10:30:00-04:00",
    "2019-08-24T10:30:00-04:00",
    "2019-08-25T11:00:00-04:00",
    "2019-08-24T11:00:00-04:00",
    "2019-08-24T20:00:00-04:00",
    "2019-08-25T20:00:00-04:00"
  ]

  it('formatTime should format to "MM/dd/yyyy hh:mm a" format', () => {
    expect(formatTime(date)).toEqual("08/21/2019 03:00 PM")
  })
  it('sortTimesDateAsc should sort by date in desc', () => {
    expect(sortTimesDateAsc(times)).toEqual( [
        "2019-08-24T10:30:00-04:00",
        "2019-08-24T11:00:00-04:00",
        "2019-08-24T20:00:00-04:00",
        "2019-08-25T10:30:00-04:00",
        "2019-08-25T11:00:00-04:00",
        "2019-08-25T20:00:00-04:00"
      ])
  })
})