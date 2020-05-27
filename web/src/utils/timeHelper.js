
const { format } = require('date-fns');

const formatTime = (date) => {
    if(date){
        var formattedDate = new Date(date);
        return format(formattedDate, 'MM/dd/yyyy hh:mm a')
    }
    return '';
}

const sortTimesDateAsc = (times) => {
    return times.sort((x,y) => {
        return new Date(x) - new Date(y);
    })
}

const fetchToday = () => {
    const date = new Date();
    return format(date, 'yyyy-MM-dd');
 }

 const convertTimeData = (data) => {
    let res = Object.keys(data).reduce(function (acc, curr) {
      return acc.concat(data[curr]);
    }, []);

    let merged = res.reduce(function(acc, curr) {
      return Object.assign(acc, curr);
    }, {});
    let result = {}
    Object.keys(merged).forEach(x => {
      let key = merged[x]
      if (!result[key]) {
        result[key] = []
      }
      result[key].push(x);
    });
    return result;
  }
  
const flattenTimes = (bookedTimes) => {
    return Object.values(bookedTimes).reduce(function(acc, curr) {
        return acc.concat(curr)
      }, []);

}

export {formatTime, sortTimesDateAsc, fetchToday, convertTimeData, flattenTimes}