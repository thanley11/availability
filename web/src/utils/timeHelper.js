
import { format} from 'date-fns';

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
    const date = new Date(Date.now())
    return format(date, 'yyyy-MM-dd');
 }

 
 const convertTimeData = (data, bookedTimes ={}) => {
    let res = Object.keys(data).reduce(function (acc, curr) {
      return acc.concat(data[curr]);
    }, []);

    let merged = res.reduce(function(acc, curr) {
      return Object.assign(acc, curr);
    }, {});
    let filtered = omitTimes(merged, bookedTimes);
    let result = {}
    Object.keys(filtered).forEach(x => {
      let key = filtered[x]
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

const omitTimes = (availTimes, bookedTimes) =>{
    const filtered = {};
    Object.keys(availTimes).forEach(key => {
        let val = availTimes[key];
        if(bookedTimes[val] && bookedTimes[val].findIndex(x => x.time === key) !== -1){
            return;
        } else {
            Object.assign(filtered, {[key]:val})
        }
        });
    return filtered;
}

export {formatTime, sortTimesDateAsc, fetchToday, convertTimeData, flattenTimes, omitTimes}