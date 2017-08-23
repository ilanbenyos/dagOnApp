<template>
  <section>
        <button class="button" @click="getList('fishes',{},$event)">updateFishes</button>
    fishes.length: {{fishes.length}}
    <div class = "table flex col">
        <div  v-for="(fish,idx) in fishes">
            <div class="field flex row">
                <!--<div class="field flex row id"><div class="field">id:</div><div class="field">{{fish._id}}</div></div>-->
                <div class="field flex row name"><div class="field">name:</div><input class="input" v-model="fish.name"></input></div>
                <div class="field flex row nameHeb"><div class="field">heb:</div><input class="input" v-model="fish.nameHeb"></input></div>
                <div class="field flex row nameShort"><div class="field">short:</div><input class="input" v-model="fish.nameShort"></input></div>
                <div v-if="fish.status !='newRecord'" class="buttons-pnl">
                    <button  class="button" @click="editFish(fish._id)">update</button>
                    <button class="button" @click="deleteFromList('fishes',fish._id)">delete</button>
                </div>
                <div v-else class="buttons-pnl new-record">
                    <button class="button" @click="newRecord('fishes',fishes[idx])">save</button>
                    <button class="button" @click="deleteFromList('fishes',fish._id)">delete1</button>
                </div>
            </div>
        </div>
    </div>

    <div >{{currFish}}</div>
    <div v-if="currFish">
        <button class="button" @click="addNewLocalRecord('fishes')">add new</button>
        <button class="button" @click="submit">submit</button>
    </div>
  </section>
</template>
<script>
import { TYPE_OXYGEN } from '../../constants/actTypes'
import { SENDMSG } from '../../store/store'
import moment from 'moment'
export default {
  name: 'Grading',
  data() {
    return {
      state:this.$store.getters.fetchGetState,
      ponds:this.$store.getters.fetchGetPonds,
      facilities:this.$store.getters.fetchGetFacilities,//fetchGetCurrFish
      fishes:[],
      currFish:{},
      PageStatus:'init'
    }
  },
  created () {
        this.getList('fishes',{})
  },
    watch:{
      fishes1: function(newFishes){
        this.fishes = this.$store.getters.fetchGetFishes;
      },
    },
    computed: {
        fishes1() {return this.$store.getters.fetchGetFishes;},
    },
  methods: {//
      newRecord(list,obj,e){
            delete obj.status;
            const act = { actType: 'addToList', data: obj, collection: list };
            const params = { event:e,askFrom:'server',getListBack:true};
            this.sendMsg({ act,params});
      },
      addNewLocalRecord(arr){
        var obj = {status:'newRecord'}
        this.fishes.push(obj);
      },
      getList(listName,criteria){
          const act = { actType: 'getList', list:listName,criteria};
          const params = { askFrom:'server'}
          this.sendMsg({ act,params})
      },//
      setCurrFish(){
            this.currFish = {_id:null,name:'',nameHeb:'',nameShort:''}
      },
        getObjById(objId,arr) {
            var obj = arr.find(function (obj1) {
                return (objId === obj1._id)
            })
            return obj
        },
      deleteFromList(list,id,e){
          const act = { actType: 'deleteFromList', objId:id,list};
          const params = { event:e,askFrom:'server',getListBack:true}
          this.sendMsg({ act,params})
      },
    editFish(id,e){
        var fishObj = this.getObjById(id,this.fishes);
        const act = { actType: 'updateInList', data: fishObj, list: 'fishes' };
        const params = { event:e,askFrom:'server',getListBack:true};
          this.sendMsg({ act,params});
        
      },
    submit(e){
        var actType = (typeof(this.currFish._id== 'undefined'))?'addToList': 'updateInList' ;
        const act = { actType: actType, data: this.currFish, collection: 'fishes' };
        const params = { event:e,askFrom:'server',getListBack:true};
          this.sendMsg({ act,params});
        //  this.currFish = this.setCurrFish;
      },
    sendMsg(msg){
          this.$store.dispatch({ type: SENDMSG, msg })
    },
  },
}
</script>
<style scoped>
.table{
    width:90%;
    margin:auto;
}
.flex{
  display: flex;
}
.row{
  flex-direction: row;
}
.col{
  flex-direction: column;
}
.field{
    margin:.3em;
    border:1px solid green;
}
.button{
    height:80%;
    vertical-align: middle;
}
.new-record{
    background-color: gray;
}
.buttons-pnl{
    /*min-height:50%;
    max-height:50%;*/
    border:1px solid green;
}
input{
    width:100%;
}
.name,.nameHeb{
    width: 10em;
}
.id{
    width: 10em;
}
.nameShort{
    width: 8em;
}
</style>
