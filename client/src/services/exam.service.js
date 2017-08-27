function createActObj(pond,type, time){
    console.log('creating a new act object');
    return {id:generateId(), date:new Date(), pond:pond, type:type, time:time, val:null}
}
function isActSameDateAndTime(act,dateTime){
  // day:act.date.getDate(), 
  // month:act.date.getMonth(), 
  // year:act.date.getFullYear(), 
  // time:act.time 
  if ( act.date.getDate() === dateTime.day 
     &&act.date.getMonth() === dateTime.month
     &&act.date.getFullYear() === dateTime.year
     &&act.time === dateTime.time){
       console.log('returning false')
    return true;
  }
  else
    return false;
}
function changeActsTimeTo(dateTime, newTime, facility){
  console.log("facilityi.ponds",facility)
  facility.ponds.forEach( pond =>{
    pond.acts.forEach( act =>{
      if(isActSameDateAndTime(act,dateTime)) act.time = newTime
    })
  });
}
const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
export default {
    createActObj,
    isActSameDateAndTime,
    changeActsTimeTo
  }