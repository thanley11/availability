import { formatTime,sortTimesDateAsc, fetchToday, convertTimeData, flattenTimes } from './timeHelper';

describe('timeHelper', () => {
   beforeAll(() => {
        Date.now = jest.fn(() => 1590173622627) //2020-05-22
   });
  const date = "2019-08-21T15:00:00-04:00";
  const timesArray = [
    "2019-08-25T10:30:00-04:00",
    "2019-08-24T10:30:00-04:00",
    "2019-08-25T11:00:00-04:00",
    "2019-08-24T11:00:00-04:00",
    "2019-08-24T20:00:00-04:00",
    "2019-08-25T20:00:00-04:00"
  ];
  const timesDict = {"2019-08-27": {"2019-08-27T14:00:00-04:00": 372955, "2019-08-27T13:00:00-04:00": 372955 }};
  const bookedTimes = {372955:["2019-08-27T14:00:00-04:00", "2019-08-27T13:00:00-04:00" ]};

  it('formatTime should format to "MM/dd/yyyy hh:mm a" format', () => {
    expect(formatTime(date)).toEqual("08/21/2019 03:00 PM")
  })
  it('sortTimesDateAsc should sort by date in desc', () => {
    expect(sortTimesDateAsc(timesArray)).toEqual( [
        "2019-08-24T10:30:00-04:00",
        "2019-08-24T11:00:00-04:00",
        "2019-08-24T20:00:00-04:00",
        "2019-08-25T10:30:00-04:00",
        "2019-08-25T11:00:00-04:00",
        "2019-08-25T20:00:00-04:00"
      ])
  })
  it('fetchToday should return todays date and formatted in yyyy-MM-dd format', () => {
    expect(fetchToday()).toEqual("2020-05-22")
  })
  it('convertTimeData should return an array from the object', () => {
    expect(convertTimeData(timesDict)).toEqual(bookedTimes)
  })
  it('flattenTimes should return todays date and formatted in yyyy-MM-dd format', () => {
    expect(flattenTimes(bookedTimes)).toEqual(["2019-08-27T14:00:00-04:00", "2019-08-27T13:00:00-04:00"])
  })
})