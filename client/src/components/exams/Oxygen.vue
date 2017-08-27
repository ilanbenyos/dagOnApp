<template>
  <section>
    <table>
      <tr>
        <th>Ponds</th>
        <th
        v-if="!isActTimeChanging(act)"
        v-for="act in currFacility.ponds[0].acts" :key="act.id"
        @dblclick="toggleChangeTime(act)">{{act.time}}</th>
        <th v-else><input type="text" v-model="tempTime" ></input></th>
        <th><pre>  {{actTime}}    </pre></th>
      </tr>
      <tr v-for="(pond,idx) in currFacility.ponds" :key="pond.id">
        <td @click="addPondAct(pond.acts)">{{pond.id}}</td>
        <td 
        v-if="act.type === TYPE_OXYGEN"
        v-for="act in pond.acts" :key="act.id">{{act.val}}</td>
        <td 
          v-if="isInputMode" 
          ><input 
            type="number"
            @change="resaultAdded(tempActs[idx].value)"
            v-model="tempActs[idx].val"
            ></input></td>
        <td v-else @click="addNewExam"> </td>
      </tr>
    </table>
    <button @click="finishCurrExams">Add Entry</button>
    <button 
    v-if="timeChangeAct"
    @click="changeTime">Change time</button>
    <!-- <div v-if="isInputMode">input mode!
      <table>
        <tr>
          <th>Ponds</th>
        </tr>
        <tr v-for="pond in currFacility.ponds" :key="pond.id">
          <td>{{pond.id}}</td>
        </tr>  
      </table>
    </div> -->
  </section>
</template>
<script>
import { TYPE_OXYGEN } from '../../constants/actTypes'
import examService from '../../services/exam.service.js';
import moment from 'moment'
export default {
  name: 'exam-oxygen',
  data() {
    return {
      tempFacilities:[ { id:1, name:'harta', 
        ponds:[ { id:1, vol:20, 
          acts:[{id:1, date:new Date(), pond:1, type:TYPE_OXYGEN, time:6, val:10},
          {id:2, date:new Date(), pond:1, type:TYPE_OXYGEN, time:12, val:11}
          ] },
          { id:2, vol:20, 
          acts:[{id:2, date:new Date(), pond:1, type:TYPE_OXYGEN, time:6, val:10},
          {id:2, date:new Date(), pond:1, type:TYPE_OXYGEN, time:12, val:11}
        ] },
        ] 
      } ],
      currFacility:null,
      TYPE_OXYGEN:TYPE_OXYGEN,
      isInputMode:false,
      actTime:null,
      tempActs:[],
      timeChangeAct:false,
      changeTimeFor:{},
      tempTime:null
    }
  },
  methods: {
    getTheTime(){
      return moment().format('HH:mm');
    },
    finishCurrExams(){
      console.log('finishing curr exams entries');
      this.tempActs.forEach( tmpAct =>{
        var pond = this.currFacility.ponds.find( pond => pond.id === tmpAct.pond);
        pond.acts.push(tmpAct);
        console.log('pond acts after push',pond.acts)
      });
    },
    addNewExam(){
      console.log('adding a new exam');
      this.actTime = this.getTheTime();
      this.isInputMode = true;
      this.currFacility.ponds.forEach( pond => 
        this.tempActs.push(examService.createActObj(pond.id,TYPE_OXYGEN,this.actTime))
      );
    },
    resaultAdded(value){
      console.log("saving the temporary resault:", value);
    },
    toggleChangeTime(act){
      this.changeTimeFor ={
        day:act.date.getDate(), 
        month:act.date.getMonth(), 
        year:act.date.getFullYear(), 
        time:act.time
      };
      this.tempTime = act.time;
      console.log('toggling change time input ',this.changeTimeFor);


      this.timeChangeAct = true;
    },
    changeTime(){
      examService.changeActsTimeTo(this.changeTimeFor,this.tempTime,this.currFacility);
      this.timeChangeAct = false;
    },
    isActTimeChanging(act){
      console.log('checking if the current act is changing its time by the user');

      return examService.isActSameDateAndTime(act,this.changeTimeFor, this.acts);
    }

  },
   created () {
    this.currFacility = this.tempFacilities[0];
  },
}
</script>
<style scoped>
  th{
    border: 1px solid black;
  }
  td{
    border: 1px solid black;
  }
</style>
