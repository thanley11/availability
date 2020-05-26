
const bookTime  = async (params) => fetch(`http://localhost:4433/api/booking/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
 });

const getAvailableTimes = async () => fetch(`${'https://cors-anywhere.herokuapp.com/'}https://thinkful.com/api/advisors/availability`,{
      method:'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
})

const bookingTimes = async () => fetch(`http://localhost:4433/api/booking/`);

export { bookTime, getAvailableTimes, bookingTimes}
