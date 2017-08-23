<template>
  <section>
    <table>
      <tr>
        <th>Ponds</th>
        <th v-for="act in currFacility.ponds[0].acts" :key="act.id">{{act.time}}</th>
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
          {id:2, date:new Date(), pond:1, type:TYPE_OXYGEN, time:6, val:11}
          ] },
          { id:2, vol:20, 
          acts:[{id:1, date:new Date(), pond:1, type:TYPE_OXYGEN, time:6, val:10},
          {id:2, date:new Date(), pond:1, type:TYPE_OXYGEN, time:6, val:11}
        ] },
        ] 
      } ],
      currFacility:null,
      TYPE_OXYGEN:TYPE_OXYGEN,
      isInputMode:false,
      actTime:null,
      tempActs:[]
    }
  },
  methods: {
    getTheTime(){
      return moment().format('HH:mm');
    },
    // addExam(){
    //   console.log('adding exam!');
    //   this.isInputMode = !this.isInputMode;
    // }
    // addPondAct(acts){
    //   console.log('adding act to pond number:' + pondId);
    //   if(this.actTime){
    //     console.log('got the time!');
    //   }
    //   else{
    //     currFacility.ponds[0].acts.push(examService.createActObj());
    //     currFacility.ponds.forEach( pond =>{ 
    //       pond.acts.push()
    //     });
    //   }
    //   //examService.createActObj();
    // },
    finishCurrExams(){
      console.log('finishing curr exams entries');
      this.tempActs.forEach( tmpAct =>{
        var pond = this.currFacility.ponds.find( pond => pond.id === tmpAct.pond);
        pond.acts.push(tmpAct);
        console.log('pond acts after push',pond.acts)
      });
      //this.currFacili
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
