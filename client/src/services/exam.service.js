function createActObj(pond,type, time){
    console.log('creating a new act object');
    return {id:generateId(), date:new Date(), pond:pond, type:type, time:time, val:null}
}
const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
export default {
    createActObj
  }