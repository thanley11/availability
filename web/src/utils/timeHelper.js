
const { format } = require('date-fns');

const formatTime = (date) => {
    if(date){
        var formattedDate = new Date(date);
        return format(formattedDate, 'MM/dd/yyyy hh:mm a')
    }
    return '';
}

const sortTimesDateDesc = (times) => {
    return times.sort((x,y) => {
        return new Date(x) - new Date(y);
    })
}

const fetchToday = () => {
    const date = new Date();
    return format(date, 'yyyy-MM-dd');
 }


export {formatTime, sortTimesDateDesc, fetchToday}