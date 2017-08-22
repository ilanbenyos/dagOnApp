<template>
  <section>
    <button>hi</button>
    <table>
      <tr>
        <th>Ponds</th>
        <th>{{getTheTime()}}</th>
      </tr>
      <tr v-for="pond in currFacility.ponds" :key="pond.id">
        <td>{{pond.id}}</td>
        <td 
        v-if="act.type === TYPE_OXYGEN"
        v-for="act in pond.acts" :key="act.id">{{act.val}}</td>
      </tr>
      <tr>
        <td>Jane</td>
        <td>Doe</td>
      </tr>
    </table>
  </section>
</template>
<script>
import { TYPE_OXYGEN } from '../../constants/actTypes'
import moment from 'moment'
export default {
  name: 'exam-oxygen',
  data() {
    return {
      tempFacilities:[ { id:1, name:'harta', ponds:[ { id:1, facility:1, vol:20, acts:[{id:1, date:new Date(), pond:1, type:TYPE_OXYGEN, time:6, val:10},{id:2, date:new Date(), pond:1, type:TYPE_OXYGEN, time:12, val:11}] } ] } ],
      currFacility:1,
      TYPE_OXYGEN:TYPE_OXYGEN
    }
  },
  created () {
    this.currFacility = this.tempFacilities[0];
  },
  methods: {
  getTheTime(){
    return moment().format('HH:mm');
    },
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
